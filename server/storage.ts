import mongoose from 'mongoose';
import { type StudentCertificate, type ContactForm, type CourseRegistration, type AdminUser } from "../shared/schema.js";
import {
  AdminUser as AdminUserModel,
  CourseRegistration as CourseRegistrationModel,
  ContactSubmission as ContactSubmissionModel,
  StudentCertificate as StudentCertificateModel
} from './models.js';

export interface IStorage {
  // Student certificates
  getStudentByIdCard(idCardNumber: string): Promise<StudentCertificate | undefined>;
  getStudentById(id: string): Promise<StudentCertificate | undefined>;

  // Contact forms
  submitContactForm(form: ContactForm): Promise<void>;

  // Course registrations
  createRegistration(registration: CourseRegistration): Promise<void>;
  getAllRegistrations(): Promise<CourseRegistration[]>;
  updateRegistration(id: string, updates: Partial<CourseRegistration>): Promise<void>;

  // Admin users
  getAdminUser(username: string): Promise<AdminUser | undefined>;
  getAllAdminUsers(): Promise<AdminUser[]>;

  // Database connection
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class MongoStorage implements IStorage {
  private isConnected = false;

  constructor() {
    // Don't auto-connect in constructor for Vercel serverless
    // Connection will be established on first database operation
  }

  async connect(): Promise<void> {
    if (this.isConnected && mongoose.connection.readyState === 1) {
      console.log('📊 MongoDB already connected');
      return;
    }

    try {
      // Force disconnect any existing connections
      console.log('🔄 Ensuring clean MongoDB connection...');
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        // Wait a bit for disconnection to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Try different MongoDB connection formats for DNS issues
      const mongoUrl = process.env.MONGODB_URL ||
                      process.env.DATABASE_URL ||
                      'mongodb://hamza:hamza123@cluster0-shard-00-00.x0s3vap.mongodb.net:27017,cluster0-shard-00-01.x0s3vap.mongodb.net:27017,cluster0-shard-00-02.x0s3vap.mongodb.net:27017/educationDB?ssl=true&replicaSet=atlas-abc123-shard-0&authSource=admin&retryWrites=true&w=majority';

      console.log(`🔗 Connecting to MongoDB: ${mongoUrl.split('@')[1]?.split('.')[0] || 'database'}`);

      // Create fresh connection
      await mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 120000, // 2 minutes for very slow connections
        socketTimeoutMS: 120000,
        maxPoolSize: 1, // Single connection
        maxIdleTimeMS: 60000,
        bufferCommands: true,
      });

      this.isConnected = true;
      console.log('✅ MongoDB Connected Successfully!');
      console.log(`📊 Connected to database: ${mongoUrl.split('/').pop()}`);

      // Initialize sample data
      await this.initializeSampleData();

    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      console.error('❌ Full error details:', error);
      console.log('⚠️ Continuing without database connection...');
      this.isConnected = false;
      throw error; // Re-throw to surface connection issues
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Disconnected from MongoDB');
    }
  }

  private async ensureConnection(): Promise<void> {
    if (this.isConnected && mongoose.connection.readyState === 1) {
      return;
    }
    await this.connect();
  }

  private async initializeSampleData() {
    try {
      // Check if sample data already exists
      const existingStudents = await StudentCertificateModel.countDocuments();
      if (existingStudents > 0) return;

      // Sample student data for testing
      const sampleStudents = [
        {
          studentName: "Ahmed Al Mahmoud",
          idCardNumber: "STU2024001",
          courses: [
            {
              language: "French",
              level: "A1",
              certificateIssueDate: "2024-01-15",
              certificateValidUntil: "2027-01-15",
            },
            {
              language: "French",
              level: "A2",
              certificateIssueDate: "2024-06-20",
              certificateValidUntil: "2027-06-20",
            },
          ],
        },
        {
          studentName: "Fatima Hassan",
          idCardNumber: "STU2024002",
          courses: [
            {
              language: "German",
              level: "A1",
              certificateIssueDate: "2024-02-10",
              certificateValidUntil: "2027-02-10",
            },
            {
              language: "German",
              level: "A2",
              certificateIssueDate: "2024-07-15",
              certificateValidUntil: "2027-07-15",
            },
            {
              language: "German",
              level: "B1",
              certificateIssueDate: "2024-12-20",
              certificateValidUntil: "2027-12-20",
            },
          ],
        },
        {
          studentName: "Maria Rodriguez",
          idCardNumber: "STU2024003",
          courses: [
            {
              language: "Spanish",
              level: "A1",
              certificateIssueDate: "2024-03-05",
              certificateValidUntil: "2027-03-05",
            },
            {
              language: "Spanish",
              level: "A2",
              certificateIssueDate: "2024-08-10",
              certificateValidUntil: "2027-08-10",
            },
          ],
        },
        {
          studentName: "John Smith",
          idCardNumber: "STU2024004",
          courses: [
            {
              language: "Italian",
              level: "A1",
              certificateIssueDate: "2024-04-12",
              certificateValidUntil: "2027-04-12",
            },
          ],
        },
        {
          studentName: "Sara Abdullah",
          idCardNumber: "STU2024005",
          courses: [
            {
              language: "English",
              level: "B1",
              certificateIssueDate: "2024-05-18",
              certificateValidUntil: "2027-05-18",
            },
            {
              language: "English",
              level: "B2",
              certificateIssueDate: "2024-10-22",
              certificateValidUntil: "2027-10-22",
            },
          ],
        },
        // Add the specific student data requested
        {
          studentName: "Anna Schmidt",
          idCardNumber: "37301-1289468-7",
          courses: [
            {
              language: "Deutsch",
              level: "A1",
              certificateIssueDate: "2025-09-15",
              certificateValidUntil: "2026-09-15",
            },
          ],
        },
        // Add another student with the requested format
        {
          studentName: "Michael Weber",
          idCardNumber: "STU20240022",
          courses: [
            {
              language: "German",
              level: "B2",
              certificateIssueDate: "2025-09-15",
              certificateValidUntil: "2026-09-15",
              scores: {
                listening: 7.5,
                reading: 8.0,
                writing: 7.0,
                speaking: 7.5,
                overall: 7.5
              }
            },
          ],
        },
      ];

      await StudentCertificateModel.insertMany(sampleStudents);
      console.log('Sample student data initialized');

      // Initialize admin users
      await this.initializeAdminUsers();

    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }

  // Student Certificate Methods
  async getStudentByIdCard(idCardNumber: string): Promise<StudentCertificate | undefined> {
    try {
      await this.ensureConnection();
      const student = await StudentCertificateModel.findOne({ idCardNumber: idCardNumber.toUpperCase() });
      if (!student) return undefined;

      const studentObj = student.toObject();
      return {
        ...studentObj,
        id: studentObj._id?.toString() || '',
        _id: studentObj._id?.toString()
      };
    } catch (error) {
      console.error('Error fetching student certificate:', error);
      return undefined;
    }
  }

  async getStudentById(id: string): Promise<StudentCertificate | undefined> {
    try {
      await this.ensureConnection();
      const student = await StudentCertificateModel.findById(id);
      if (!student) return undefined;

      const studentObj = student.toObject();
      return {
        ...studentObj,
        id: studentObj._id?.toString() || '',
        _id: studentObj._id?.toString()
      };
    } catch (error) {
      console.error('Error fetching student by ID:', error);
      return undefined;
    }
  }

  // Contact Form Methods
  async submitContactForm(form: ContactForm): Promise<void> {
    try {
      await ContactSubmissionModel.create(form);
      console.log("Contact form submitted:", form);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  // Course Registration Methods
  async createRegistration(registration: CourseRegistration): Promise<void> {
    try {
      await CourseRegistrationModel.create(registration);
      console.log("Registration created:", registration);
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error;
    }
  }

  async getAllRegistrations(): Promise<CourseRegistration[]> {
    try {
      const registrations = await CourseRegistrationModel.find().sort({ submittedAt: -1 });
      return registrations.map(reg => {
        const regObj = reg.toObject();
        return {
          ...regObj,
          id: regObj._id?.toString() || '',
          _id: regObj._id?.toString()
        };
      });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      return [];
    }
  }

  async updateRegistration(id: string, updates: Partial<CourseRegistration>): Promise<void> {
    try {
      await CourseRegistrationModel.findByIdAndUpdate(id, updates, { new: true });

      // If status is verified, create/update student certificate
      if (updates.status === 'verified') {
        const registration = await CourseRegistrationModel.findById(id);
        if (registration) {
          // Create certificate data based on selected courses
          const certificateData = {
            studentName: registration.fullName,
            idCardNumber: `STU${Date.now().toString().slice(-6)}`, // Generate unique ID
            courses: registration.selectedCourses.map(courseId => {
              // Map course IDs to certificate format
              const courseMapping: { [key: string]: { language: string; level: string } } = {
                'french-a1': { language: 'French', level: 'A1' },
                'french-a2': { language: 'French', level: 'A2' },
                'french-b1': { language: 'French', level: 'B1' },
                'french-b2': { language: 'French', level: 'B2' },
                'french-c1': { language: 'French', level: 'C1' },
                'french-c2': { language: 'French', level: 'C2' },
                'german-a1': { language: 'German', level: 'A1' },
                'german-a2': { language: 'German', level: 'A2' },
                'german-b1': { language: 'German', level: 'B1' },
                'german-b2': { language: 'German', level: 'B2' },
                'german-c1': { language: 'German', level: 'C1' },
                'german-c2': { language: 'German', level: 'C2' },
                'spanish-a1': { language: 'Spanish', level: 'A1' },
                'spanish-a2': { language: 'Spanish', level: 'A2' },
                'spanish-b1': { language: 'Spanish', level: 'B1' },
                'spanish-b2': { language: 'Spanish', level: 'B2' },
                'spanish-c1': { language: 'Spanish', level: 'C1' },
                'spanish-c2': { language: 'Spanish', level: 'C2' },
                'italian-a1': { language: 'Italian', level: 'A1' },
                'italian-a2': { language: 'Italian', level: 'A2' },
                'italian-b1': { language: 'Italian', level: 'B1' },
                'italian-b2': { language: 'Italian', level: 'B2' },
                'italian-c1': { language: 'Italian', level: 'C1' },
                'italian-c2': { language: 'Italian', level: 'C2' },
                'english-a1': { language: 'English', level: 'A1' },
                'english-a2': { language: 'English', level: 'A2' },
                'english-b1': { language: 'English', level: 'B1' },
                'english-b2': { language: 'English', level: 'B2' },
                'english-c1': { language: 'English', level: 'C1' },
                'english-c2': { language: 'English', level: 'C2' },
              };

              const courseInfo = courseMapping[courseId] || { language: courseId.toUpperCase(), level: 'A1' };
              const issueDate = new Date().toISOString().split('T')[0];
              const validUntil = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 3 years validity

              return {
                language: courseInfo.language,
                level: courseInfo.level,
                certificateIssueDate: issueDate,
                certificateValidUntil: validUntil,
              };
            }),
          };

          // Check if certificate already exists, update it; otherwise create new
          const existingCertificate = await StudentCertificateModel.findOne({ idCardNumber: certificateData.idCardNumber });
          if (existingCertificate) {
            await StudentCertificateModel.findByIdAndUpdate(existingCertificate._id, certificateData);
          } else {
            await StudentCertificateModel.create(certificateData);
          }

          console.log("Certificate issued for student:", registration.fullName, "ID:", certificateData.idCardNumber);
        }
      }

      console.log("Registration updated:", id, updates);
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  }

  // Admin User Methods
  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    try {
      await this.ensureConnection();
      const user = await AdminUserModel.findOne({ username, isActive: true });
      if (!user) return undefined;

      const userObj = user.toObject();
      return {
        ...userObj,
        id: userObj._id?.toString() || '',
        _id: userObj._id?.toString()
      };
    } catch (error) {
      console.error('Error fetching admin user:', error);
      return undefined;
    }
  }

  async createAdminUser(userData: Omit<AdminUser, 'id' | '_id' | 'createdAt' | 'updatedAt' | 'lastLogin'>): Promise<AdminUser> {
    try {
      await this.ensureConnection();
      console.log('🔄 Attempting to create admin user in database...');
      console.log('📊 Connection readyState:', mongoose.connection.readyState);

      console.log('✅ Database connection ready, creating user...');
      const newUser = await AdminUserModel.create(userData);
      const userObj = newUser.toObject();

      console.log('✅ Admin user created successfully in database');
      return {
        ...userObj,
        id: userObj._id?.toString() || '',
        _id: userObj._id?.toString()
      };
    } catch (error) {
      console.error('❌ Error creating admin user:', error);
      throw error;
    }
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      await this.ensureConnection();
      const users = await AdminUserModel.find().sort({ createdAt: -1 });
      return users.map(user => {
        const userObj = user.toObject();
        return {
          ...userObj,
          id: userObj._id?.toString() || '',
          _id: userObj._id?.toString()
        };
      });
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return [];
    }
  }

  private async initializeAdminUsers() {
    try {
      // Check if admin users already exist
      const existingUsers = await AdminUserModel.countDocuments();
      if (existingUsers > 0) return;

      // No default admin users - all users must be created via API
      console.log("No default admin users initialized. Please create admin users via the /api/auth/register endpoint.");

    } catch (error) {
      console.error('Error initializing admin users:', error);
    }
  }
}

export class MemStorage implements IStorage {
  private students: StudentCertificate[] = [];
  private contactForms: ContactForm[] = [];
  private registrations: CourseRegistration[] = [];
  private adminUsers: AdminUser[] = [];

  async getStudentByIdCard(idCardNumber: string): Promise<StudentCertificate | undefined> {
    return this.students.find(student => student.idCardNumber === idCardNumber.toUpperCase());
  }

  async getStudentById(id: string): Promise<StudentCertificate | undefined> {
    return this.students.find(student => student.id === id);
  }

  async submitContactForm(form: ContactForm): Promise<void> {
    this.contactForms.push(form);
  }

  async createRegistration(registration: CourseRegistration): Promise<void> {
    this.registrations.push(registration);
  }

  async getAllRegistrations(): Promise<CourseRegistration[]> {
    return this.registrations;
  }

  async updateRegistration(id: string, updates: Partial<CourseRegistration>): Promise<void> {
    const index = this.registrations.findIndex(reg => reg.id === id);
    if (index !== -1) {
      this.registrations[index] = { ...this.registrations[index], ...updates };
    }
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    return this.adminUsers.find(user => user.username === username && user.isActive);
  }

  async createAdminUser(userData: Omit<AdminUser, 'id' | '_id' | 'createdAt' | 'updatedAt' | 'lastLogin'>): Promise<AdminUser> {
    const newUser: AdminUser = {
      ...userData,
      id: `admin_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.adminUsers.push(newUser);
    return newUser;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return this.adminUsers.filter(user => user.isActive);
  }

  async connect(): Promise<void> {
    // Memory storage doesn't need connection
  }

  async disconnect(): Promise<void> {
    // Memory storage doesn't need disconnection
  }
}

export const storage = new MongoStorage();

