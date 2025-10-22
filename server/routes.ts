import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { contactFormSchema, courseRegistrationSchema } from "../shared/schema.js";

export function registerRoutes(app: Express): Server {
  // Verify student certificate endpoint
  app.get("/api/verify/:idCardNumber", async (req, res) => {
    try {
      const { idCardNumber } = req.params;

      if (!idCardNumber) {
        return res.status(400).json({ error: "ID card number is required" });
      }

      const student = await storage.getStudentByIdCard(idCardNumber);

      if (!student) {
        return res.status(404).json({ error: "Student record not found" });
      }

      res.json(student);
    } catch (error) {
      console.error("Error verifying student:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", (req, res) => {
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors
      });
    }

    res.json({
      success: true,
      message: "Contact form submitted successfully"
    });
  });

  // Course registration endpoints
  app.post("/api/registrations", (req, res) => {
    const validationResult = courseRegistrationSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors
      });
    }

    const registration = {
      ...validationResult.data,
      id: `reg_${Date.now()}`,
      submittedAt: new Date(),
      status: "pending" as const,
    };

    res.json({
      success: true,
      message: "Registration submitted successfully",
      registrationId: registration.id
    });
  });

  app.get("/api/registrations", (req, res) => {
    // Mock registrations
    res.json([
      {
        id: "reg_1",
        fullName: "Mock User",
        email: "mock@example.com",
        phone: "1234567890",
        countryCode: "AE",
        address: "Mock Address",
        dateOfBirth: "1990-01-01",
        idType: "id_card",
        idNumber: "123456789",
        selectedCourses: ["english-a1"],
        status: "pending",
        submittedAt: new Date()
      }
    ]);
  });

  app.put("/api/registrations/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    res.json({
      success: true,
      message: "Registration updated successfully"
    });
  });

  // Admin authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      console.log("Login attempt:", req.body);
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      // First try to authenticate with database
      try {
        const adminUser = await storage.getAdminUser(username);
        console.log("Database user found:", adminUser);

        if (adminUser && adminUser.password === password && adminUser.isActive) {
          // Generate a simple token (in production, use JWT)
          const token = `admin_token_${adminUser.id}_${Date.now()}`;

          return res.json({
            success: true,
            token,
            user: {
              id: adminUser.id,
              username: adminUser.username,
              role: adminUser.role,
              name: adminUser.name,
              email: adminUser.email
            }
          });
        }
      } catch (dbError) {
        console.log("Database error, trying fallback:", dbError);
      }

      // NO fallback to default admin users - only database users allowed
      console.log("❌ No database user found and no fallback allowed");

      return res.status(401).json({ error: "Invalid username or password" });
    } catch (error) {
      console.error("Error during admin login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin registration (for creating new admin users)
  app.post("/api/auth/register", async (req, res) => {
    try {
      console.log("🔐 Admin registration attempt:", req.body);

      const { username, Username, email, password, name, role } = req.body;
      const finalUsername = username || Username;

      console.log("📝 Extracted fields:", { username: finalUsername, email, password, name, role });

      if (!finalUsername || !email || !password) {
        console.log("❌ Missing required fields");
        return res.status(400).json({ error: "Username, email, and password are required" });
      }

      // Check if username already exists
      const existingUser = await storage.getAdminUser(finalUsername);
      if (existingUser) {
        console.log("❌ Username already exists:", finalUsername);
        return res.status(409).json({
          error: "Username already exists",
          message: `An admin user with username '${finalUsername}' is already registered`
        });
      }

      // Check if email already exists
      try {
        const allUsers = await storage.getAllAdminUsers();
        const emailExists = allUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          console.log("❌ Email already exists:", email);
          return res.status(409).json({
            error: "Email already exists",
            message: `An admin user with email '${email}' is already registered`
          });
        }
      } catch (emailCheckError) {
        console.log("⚠️ Could not check email uniqueness, proceeding...");
      }

      // Create admin user in database
      const newUser = {
        username: finalUsername,
        password, // In production, hash this password
        name: name || finalUsername,
        email,
        role: role || 'admin',
        isActive: true
      };

      console.log("🔄 Attempting to create admin user in database...");
      const createdUser = await storage.createAdminUser(newUser);

      console.log("✅ Admin user created successfully:", {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email
      });

      res.json({
        success: true,
        message: "Admin user created successfully",
        user: {
          id: createdUser.id,
          username: createdUser.username,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          isActive: createdUser.isActive
        }
      });
    } catch (error) {
      console.error("❌ Error creating admin user:", error);
      res.status(500).json({
        error: "Database error",
        message: "Failed to create admin user in database. Please check MongoDB connection."
      });
    }
  });

  // Verify admin token
  app.get("/api/auth/verify", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token || !token.startsWith('admin_token_')) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Extract user ID from token (simple validation)
      const tokenParts = token.split('_');
      if (tokenParts.length < 3) {
        return res.status(401).json({ error: "Invalid token format" });
      }

      const userId = tokenParts[2];
      // In production, you'd validate the token properly

      res.json({
        success: true,
        valid: true
      });
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User login (for students to access their certificates)
  app.post("/api/user/login", async (req, res) => {
    try {
      console.log("User login attempt:", req.body);
      const { idCardNumber } = req.body;

      if (!idCardNumber) {
        return res.status(400).json({ error: "ID card number is required" });
      }

      // Get student by ID card number
      const student = await storage.getStudentByIdCard(idCardNumber);

      if (!student) {
        return res.status(404).json({ error: "Student record not found" });
      }

      // Generate a simple token for user session
      const token = `user_token_${student.id}_${Date.now()}`;

      res.json({
        success: true,
        token,
        user: {
          id: student.id,
          studentName: student.studentName,
          idCardNumber: student.idCardNumber,
          courses: student.courses
        }
      });
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Verify user token
  app.get("/api/user/verify", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token || !token.startsWith('user_token_')) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Extract student ID from token (simple validation)
      const tokenParts = token.split('_');
      if (tokenParts.length < 3) {
        return res.status(401).json({ error: "Invalid token format" });
      }

      const studentId = tokenParts[2];

      // Get student data
      const student = await storage.getStudentByIdCard(''); // We'll need to modify storage to get by ID
      // For now, return basic validation
      res.json({
        success: true,
        valid: true,
        studentId
      });
    } catch (error) {
      console.error("Error verifying user token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user profile (student certificate data)
  app.get("/api/user/profile", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token || !token.startsWith('user_token_')) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Extract student ID from token
      const tokenParts = token.split('_');
      if (tokenParts.length < 3) {
        return res.status(401).json({ error: "Invalid token format" });
      }

      const studentId = tokenParts[2];

      // Fetch student data by ID
      const student = await storage.getStudentById(studentId);

      if (!student) {
        return res.status(404).json({ error: "Student record not found" });
      }

      res.json({
        success: true,
        student: {
          id: student.id,
          studentName: student.studentName,
          idCardNumber: student.idCardNumber,
          courses: student.courses
        }
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get admin users (ONLY database users, no mock data)
  app.get("/api/auth/users", async (req, res) => {
    try {
      // Get ONLY real admin users from database
      const adminUsers = await storage.getAllAdminUsers();

      console.log(`🔍 Database query returned ${adminUsers?.length || 0} admin users`);

      if (adminUsers && adminUsers.length > 0) {
        // Return real database users
        const formattedUsers = adminUsers.map(user => ({
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
          createdAt: user.createdAt?.toISOString() || new Date().toISOString()
        }));
        console.log(`📊 Returning ${formattedUsers.length} admin users:`, formattedUsers.map(u => `${u.username}(${u.email})`));
        return res.json(formattedUsers);
      }

      // Return empty array if no users in database
      console.log("📊 No admin users found in database - returning empty array");
      res.json([]);
    } catch (error) {
      console.error("❌ Error fetching admin users from database:", error);
      // Return empty array on error (no fallback mock data)
      res.json([]);
    }
  });

  // Test MongoDB connection
  app.get("/api/test/db", async (req, res) => {
    try {
      console.log("🧪 Testing MongoDB connection...");

      // Try to get admin users (this will test the connection)
      const adminUsers = await storage.getAllAdminUsers();

      console.log("✅ MongoDB connection successful!");
      console.log(`📊 Found ${adminUsers?.length || 0} admin users in database`);

      res.json({
        success: true,
        message: "MongoDB connection successful",
        adminUsersCount: adminUsers?.length || 0,
        connection: "mongodb+srv://hamza:hamza123@cluster0.x0s3vap.mongodb.net/educationDB"
      });
    } catch (error) {
      console.error("❌ MongoDB connection test failed:", error);
      res.status(500).json({
        success: false,
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : String(error),
        connection: "mongodb+srv://hamza:hamza123@cluster0.x0s3vap.mongodb.net/educationDB"
      });
    }
  });

  // Create initial admin user (one-time setup route)
  app.post("/api/setup/admin", async (req, res) => {
    try {
      console.log("🔧 Setting up initial admin user:", req.body);

      const { username, email, password, name, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          error: "Missing required fields",
          message: "Username, email, and password are required"
        });
      }

      // Check if any admin users already exist
      console.log("🔍 Checking for existing admin users...");
      const existingUsers = await storage.getAllAdminUsers();
      console.log(`📊 Found ${existingUsers?.length || 0} existing admin users`);

      if (existingUsers && existingUsers.length > 0) {
        return res.status(409).json({
          error: "Setup already completed",
          message: "Admin users already exist. Use /api/auth/register for additional admins.",
          existingUsers: existingUsers.length
        });
      }

      // Create the initial admin user
      const adminData = {
        username,
        password, // In production, hash this
        name: name || username,
        email,
        role: role || 'super_admin',
        isActive: true
      };

      console.log("🔄 Creating initial admin user...");
      console.log("📊 Admin data to save:", adminData);

      try {
        const createdUser = await storage.createAdminUser(adminData);

        console.log("✅ Initial admin user created successfully:", {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role
        });

        res.json({
          success: true,
          message: "Initial admin user created successfully",
          user: {
            id: createdUser.id,
            username: createdUser.username,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            isActive: createdUser.isActive
          },
          note: "Use /api/auth/login to authenticate and /api/auth/register for additional admins"
        });
      } catch (createError) {
        console.error("❌ Error creating admin user:", createError);
        throw createError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      console.error("❌ Error setting up initial admin:", error);
      res.status(500).json({
        error: "Setup failed",
        message: "Failed to create initial admin user",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Create admin user (protected route - requires authentication)
  app.post("/api/auth/users", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Verify token (simple validation)
      if (!token.startsWith('admin_token_')) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const { username, password, name, email, role } = req.body;

      if (!username || !password || !name || !email) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newUser = {
        username,
        password,
        name,
        email,
        role: role || 'admin',
        isActive: true
      };

      const createdUser = await storage.createAdminUser(newUser);

      res.json({
        success: true,
        message: "Admin user created successfully",
        user: {
          id: createdUser.id,
          username: createdUser.username,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          isActive: createdUser.isActive
        }
      });
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin: Add student details and issue certificate
  app.post("/api/admin/students", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Verify token (simple validation)
      if (!token.startsWith('admin_token_')) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const {
        studentName,
        email,
        phone,
        dateOfBirth,
        idCardNumber,
        courses // Array of { language, level }
      } = req.body;

      if (!studentName || !email || !idCardNumber || !courses || !Array.isArray(courses)) {
        return res.status(400).json({ error: "Student name, email, ID card number, and courses are required" });
      }

      // Generate certificate data
      const certificateData = {
        studentName,
        idCardNumber: idCardNumber.toUpperCase(),
        courses: courses.map(course => ({
          language: course.language,
          level: course.level,
          certificateIssueDate: new Date().toISOString().split('T')[0],
          certificateValidUntil: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }))
      };

      // Check if student already exists
      const existingStudent = await storage.getStudentByIdCard(idCardNumber);
      let savedStudent;

      if (existingStudent) {
        // Update existing student (add new courses)
        const updatedCourses = [...existingStudent.courses, ...certificateData.courses];
        // Note: This would need a proper update method in storage
        savedStudent = existingStudent;
      } else {
        // Create new student certificate
        // This would need a createStudent method in storage
        savedStudent = certificateData;
      }

      res.json({
        success: true,
        message: "Student certificate issued successfully",
        student: savedStudent
      });
    } catch (error) {
      console.error("Error issuing certificate:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin: Get all students
  app.get("/api/admin/students", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // For now, return mock data since we don't have a getAllStudents method
      res.json({
        success: true,
        students: [
          {
            id: "mock_student_1",
            studentName: "John Doe",
            idCardNumber: "STU2024001",
            email: "john@example.com",
            phone: "+971-123456789",
            dateOfBirth: "1990-01-01",
            courses: [
              {
                language: "English",
                level: "B1",
                certificateIssueDate: "2024-01-15",
                certificateValidUntil: "2027-01-15"
              }
            ]
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

export async function registerRoutesAsync(app: Express): Promise<Server> {
  // For Vercel, we need to return the server synchronously
  // But we can still do async operations if needed
  return registerRoutes(app);
}
