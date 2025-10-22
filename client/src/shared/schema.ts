import { z } from "zod";

// Student Certificate Schema
export const studentCertificateSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  studentName: z.string(),
  idCardNumber: z.string(),
  courses: z.array(z.object({
    language: z.string(),
    level: z.string(),
    certificateIssueDate: z.string(),
    certificateValidUntil: z.string(),
    scores: z.object({
      listening: z.number(),
      reading: z.number(),
      writing: z.number(),
      speaking: z.number(),
      overall: z.number(),
    }).optional(),
  })),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type StudentCertificate = z.infer<typeof studentCertificateSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  submittedAt: z.date().optional(),
  isRead: z.boolean().default(false),
  adminResponse: z.string().optional(),
  respondedAt: z.date().optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Course Registration Schema
export const courseRegistrationSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  idType: z.enum(["id_card", "passport"], {
    required_error: "Please select an ID type",
  }),
  idNumber: z.string().min(5, "ID number must be at least 5 characters"),
  idDocument: z.string().optional(), // Base64 encoded file
  selectedCourses: z.array(z.string()).min(1, "Please select at least one course"),
  status: z.enum(["pending", "verified", "rejected"]).default("pending"),
  submittedAt: z.date().optional(),
  verifiedAt: z.date().optional(),
  adminNotes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CourseRegistration = z.infer<typeof courseRegistrationSchema>;

// Admin User Schema (for authentication)
export const adminUserSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  username: z.string(),
  password: z.string(), // In production, this should be hashed
  role: z.enum(["admin", "super_admin"]),
  name: z.string(),
  email: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  lastLogin: z.date().optional(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

// Course Information (static data structure)
export interface Course {
  id: string;
  language: string;
  flag: string;
  levels: string[];
  duration: string;
  description: string;
  whatsappMessage: string;
}

// Institute Information
export const INSTITUTE_INFO = {
  name: "European Language Institute",
  address: {
    line1: "OFFICE G1A, FAHAD HUSSAIN DARWISH BUILDING",
    line2: "AL GHUWAIR AREA, AL ZAHRA STREET",
    postalCode: "66551",
    city: "SHARJAH",
    country: "UAE",
    postBox: "1950",
  },
  contact: {
    phone: "06-5231135",
    email: "info@europelanguages.ae",
    whatsapp: "+971501234567",
  },
  location: {
    lat: 25.3463,
    lng: 55.4209,
  },
};
