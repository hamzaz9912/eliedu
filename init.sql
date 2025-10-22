-- Database initialization script for European Language Institute
-- Run this script when setting up the database for the first time

-- Create database (if not using docker-compose, run this manually)
-- CREATE DATABASE european_languages_db;

-- Use the database
-- \c european_languages_db;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create course_registrations table
CREATE TABLE IF NOT EXISTS course_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    country_code VARCHAR(5) NOT NULL,
    address TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    id_type VARCHAR(20) NOT NULL CHECK (id_type IN ('id_card', 'passport')),
    id_number VARCHAR(50) NOT NULL,
    id_document TEXT, -- Base64 encoded file
    selected_courses JSONB NOT NULL DEFAULT '[]',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false,
    admin_response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE
);

-- Create student_certificates table
CREATE TABLE IF NOT EXISTS student_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(255) NOT NULL,
    id_card_number VARCHAR(50) UNIQUE NOT NULL,
    courses JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for session management
CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_registrations_status ON course_registrations(status);
CREATE INDEX IF NOT EXISTS idx_course_registrations_email ON course_registrations(email);
CREATE INDEX IF NOT EXISTS idx_course_registrations_submitted_at ON course_registrations(submitted_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_student_certificates_id_card ON student_certificates(id_card_number);
CREATE INDEX IF NOT EXISTS idx_sessions_expire ON sessions(expire);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_registrations_updated_at BEFORE UPDATE ON course_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_certificates_updated_at BEFORE UPDATE ON student_certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin users (passwords should be hashed in production)
-- Default passwords: admin123, manager123, staff123
INSERT INTO admin_users (username, password_hash, role, name, email) VALUES
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeCtQxTKQwLkhrbK6', 'super_admin', 'System Administrator', 'admin@europelanguages.ae'),
('manager', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeCtQxTKQwLkhrbK6', 'admin', 'Course Manager', 'manager@europelanguages.ae'),
('staff', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeCtQxTKQwLkhrbK6', 'admin', 'Registration Staff', 'staff@europelanguages.ae')
ON CONFLICT (username) DO NOTHING;

-- Insert sample student certificates
INSERT INTO student_certificates (student_name, id_card_number, courses) VALUES
('Ahmed Al Mahmoud', 'STU2024001', '[{"language": "French", "level": "A1", "certificateIssueDate": "2024-01-15", "certificateValidUntil": "2027-01-15"}, {"language": "French", "level": "A2", "certificateIssueDate": "2024-06-20", "certificateValidUntil": "2027-06-20"}]'),
('Fatima Hassan', 'STU2024002', '[{"language": "German", "level": "A1", "certificateIssueDate": "2024-02-10", "certificateValidUntil": "2027-02-10"}, {"language": "German", "level": "A2", "certificateIssueDate": "2024-07-15", "certificateValidUntil": "2027-07-15"}, {"language": "German", "level": "B1", "certificateIssueDate": "2024-12-20", "certificateValidUntil": "2027-12-20"}]'),
('Maria Rodriguez', 'STU2024003', '[{"language": "Spanish", "level": "A1", "certificateIssueDate": "2024-03-05", "certificateValidUntil": "2027-03-05"}, {"language": "Spanish", "level": "A2", "certificateIssueDate": "2024-08-10", "certificateValidUntil": "2027-08-10"}]'),
('John Smith', 'STU2024004', '[{"language": "Italian", "level": "A1", "certificateIssueDate": "2024-04-12", "certificateValidUntil": "2027-04-12"}]'),
('Sara Abdullah', 'STU2024005', '[{"language": "English", "level": "B1", "certificateIssueDate": "2024-05-18", "certificateValidUntil": "2027-05-18"}, {"language": "English", "level": "B2", "certificateIssueDate": "2024-10-22", "certificateValidUntil": "2027-10-22"}]')
ON CONFLICT (id_card_number) DO NOTHING;

-- Create view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM course_registrations WHERE status = 'pending') as pending_registrations,
    (SELECT COUNT(*) FROM course_registrations WHERE status = 'verified') as verified_registrations,
    (SELECT COUNT(*) FROM course_registrations WHERE status = 'rejected') as rejected_registrations,
    (SELECT COUNT(*) FROM course_registrations) as total_registrations,
    (SELECT COUNT(*) FROM contact_submissions WHERE is_read = false) as unread_contacts,
    (SELECT COUNT(*) FROM admin_users WHERE is_active = true) as active_admins;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO european_languages_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO european_languages_user;