import mongoose, { Schema, Document } from 'mongoose';

// Admin User Model
export interface IAdminUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'super_admin';
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'super_admin'], default: 'admin' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

// Course Registration Model
export interface ICourseRegistration extends Document {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  dateOfBirth: string;
  idType: 'id_card' | 'passport';
  idNumber: string;
  idDocument?: string;
  selectedCourses: string[];
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  verifiedAt?: Date;
  adminNotes?: string;
}

const CourseRegistrationSchema = new Schema<ICourseRegistration>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  idType: { type: String, enum: ['id_card', 'passport'], required: true },
  idNumber: { type: String, required: true },
  idDocument: { type: String },
  selectedCourses: [{ type: String }],
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  verifiedAt: { type: Date },
  adminNotes: { type: String }
}, {
  timestamps: true
});

// Contact Submission Model
export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
  isRead: boolean;
  adminResponse?: string;
  respondedAt?: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  adminResponse: { type: String },
  respondedAt: { type: Date }
}, {
  timestamps: true
});

// Student Certificate Model
export interface IStudentCertificate extends Document {
  studentName: string;
  idCardNumber: string;
  courses: Array<{
    language: string;
    level: string;
    certificateIssueDate: string;
    certificateValidUntil: string;
    scores?: {
      listening: number;
      reading: number;
      writing: number;
      speaking: number;
      overall: number;
    };
  }>;
}

const StudentCertificateSchema = new Schema<IStudentCertificate>({
  studentName: { type: String, required: true },
  idCardNumber: { type: String, required: true, unique: true },
  courses: [{
    language: { type: String, required: true },
    level: { type: String, required: true },
    certificateIssueDate: { type: String, required: true },
    certificateValidUntil: { type: String, required: true },
    scores: {
      listening: { type: Number },
      reading: { type: Number },
      writing: { type: Number },
      speaking: { type: Number },
      overall: { type: Number }
    }
  }]
}, {
  timestamps: true
});

// Create indexes for better performance
CourseRegistrationSchema.index({ status: 1 });
CourseRegistrationSchema.index({ email: 1 });
CourseRegistrationSchema.index({ submittedAt: 1 });
ContactSubmissionSchema.index({ submittedAt: 1 });

// Export models
export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
export const CourseRegistration = mongoose.model<ICourseRegistration>('CourseRegistration', CourseRegistrationSchema);
export const ContactSubmission = mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);
export const StudentCertificate = mongoose.model<IStudentCertificate>('StudentCertificate', StudentCertificateSchema);