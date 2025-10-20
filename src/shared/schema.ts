// Shared types and schemas for the application

export interface InstituteInfo {
  name: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
    postalCode: string;
    postBox: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  description: string;
}

export const INSTITUTE_INFO: InstituteInfo = {
  name: "ELI Education",
  address: {
    line1: "123 Education Street",
    line2: "",
    city: "Learning City",
    country: "LC",
    postalCode: "12345",
    postBox: ""
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@elieducation.com",
    whatsapp: "+1 (555) 123-4567"
  },
  location: {
    lat: 40.7128,
    lng: -74.0060
  },
  description: "Leading institute for quality education and skill development"
};

export interface CourseRegistration {
  id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  countryCode?: string;
  dateOfBirth?: string;
  address?: string;
  course: string;
  selectedCourses?: string[];
  message?: string;
  idDocument?: File;
  idType?: string;
  idNumber?: string;
  status?: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  submittedAt?: string;
  createdAt?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface StudentCertificate {
  id: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

// Validation schemas using Zod
import { z } from 'zod';

export const courseRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  course: z.string().min(1, "Course selection is required"),
  message: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});