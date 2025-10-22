// MongoDB initialization script for European Language Institute
// This script runs when the MongoDB container starts for the first time

// Switch to the database
db = db.getSiblingDB('european_languages_db');

// Create collections (MongoDB creates them automatically when first used, but we can pre-create them)
db.createCollection('adminusers');
db.createCollection('courseregistrations');
db.createCollection('contactsubmissions');
db.createCollection('studentcertificates');

// Create indexes for better performance
db.adminusers.createIndex({ "username": 1 }, { unique: true });
db.adminusers.createIndex({ "email": 1 }, { unique: true });
db.adminusers.createIndex({ "createdAt": 1 });

db.courseregistrations.createIndex({ "status": 1 });
db.courseregistrations.createIndex({ "email": 1 });
db.courseregistrations.createIndex({ "submittedAt": 1 });
db.courseregistrations.createIndex({ "idCardNumber": 1 });

db.contactsubmissions.createIndex({ "submittedAt": 1 });
db.contactsubmissions.createIndex({ "isRead": 1 });

db.studentcertificates.createIndex({ "idCardNumber": 1 }, { unique: true });

// Insert default admin users
db.adminusers.insertMany([
  {
    username: "admin",
    password: "admin123", // In production, this should be hashed with bcrypt
    role: "super_admin",
    name: "System Administrator",
    email: "admin@europelanguages.ae",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "manager",
    password: "manager123",
    role: "admin",
    name: "Course Manager",
    email: "manager@europelanguages.ae",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "staff",
    password: "staff123",
    role: "admin",
    name: "Registration Staff",
    email: "staff@europelanguages.ae",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample student certificates
db.studentcertificates.insertMany([
  {
    studentName: "Ahmed Al Mahmoud",
    idCardNumber: "STU2024001",
    courses: [
      {
        language: "French",
        level: "A1",
        certificateIssueDate: "2024-01-15",
        certificateValidUntil: "2027-01-15"
      },
      {
        language: "French",
        level: "A2",
        certificateIssueDate: "2024-06-20",
        certificateValidUntil: "2027-06-20"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentName: "Fatima Hassan",
    idCardNumber: "STU2024002",
    courses: [
      {
        language: "German",
        level: "A1",
        certificateIssueDate: "2024-02-10",
        certificateValidUntil: "2027-02-10"
      },
      {
        language: "German",
        level: "A2",
        certificateIssueDate: "2024-07-15",
        certificateValidUntil: "2027-07-15"
      },
      {
        language: "German",
        level: "B1",
        certificateIssueDate: "2024-12-20",
        certificateValidUntil: "2027-12-20"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentName: "Maria Rodriguez",
    idCardNumber: "STU2024003",
    courses: [
      {
        language: "Spanish",
        level: "A1",
        certificateIssueDate: "2024-03-05",
        certificateValidUntil: "2027-03-05"
      },
      {
        language: "Spanish",
        level: "A2",
        certificateIssueDate: "2024-08-10",
        certificateValidUntil: "2027-08-10"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentName: "John Smith",
    idCardNumber: "STU2024004",
    courses: [
      {
        language: "Italian",
        level: "A1",
        certificateIssueDate: "2024-04-12",
        certificateValidUntil: "2027-04-12"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    studentName: "Sara Abdullah",
    idCardNumber: "STU2024005",
    courses: [
      {
        language: "English",
        level: "B1",
        certificateIssueDate: "2024-05-18",
        certificateValidUntil: "2027-05-18"
      },
      {
        language: "English",
        level: "B2",
        certificateIssueDate: "2024-10-22",
        certificateValidUntil: "2027-10-22"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Database initialization completed successfully!");
print("Created collections: adminusers, courseregistrations, contactsubmissions, studentcertificates");
print("Inserted 3 admin users and 5 sample student certificates");