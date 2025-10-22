# European Language Institute Website

A comprehensive, modern web application for the European Language Institute in Sharjah, UAE. Built with React, TypeScript, Express.js, and MongoDB.

## 🚀 Features

### Frontend Features
- **Modern React Application** with TypeScript
- **Responsive Design** using Tailwind CSS
- **Interactive Course Registration** with file uploads
- **Admin Dashboard** for managing registrations
- **Certificate Verification** system
- **Contact Forms** with validation
- **Multi-language Support** (French, German, Spanish, Italian, English)

### Backend Features
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **File Upload Handling** for ID documents
- **Session Management** and authentication
- **Admin User Management** with role-based access
- **Email Notifications** (configurable)
- **Rate Limiting** and security headers

### Admin Features
- **User Authentication** with multiple admin accounts
- **Registration Management** (approve/reject/view)
- **Document Verification** with image preview
- **Statistics Dashboard** with real-time metrics
- **User Management** interface
- **Course Progress Tracking**

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **React Hook Form** with Zod validation
- **Wouter** for routing
- **TanStack Query** for data fetching

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database
- **Redis** for caching (optional)
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for emails

### DevOps
- **Docker** & Docker Compose
- **Nginx** reverse proxy
- **MongoDB** database with Mongoose ODM
- **Redis** caching
- **Environment-based configuration**

## 📋 Prerequisites

- Node.js 18+
- MongoDB 7+
- Redis (optional, for production)
- Docker & Docker Compose (for containerized deployment)

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd european-languages-institute
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env.local
   cp .env.backend.example .env.backend

   # Edit with your configuration
   nano .env.local
   nano .env.backend
   ```

4. **Database Setup**
   ```bash
   # Using Docker (recommended)
   docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=european_languages_db -p 5432:5432 -d postgres:15-alpine

   # Or install PostgreSQL locally and create database
   createdb european_languages_db
   ```

5. **Run Database Migrations**
   ```bash
   # If using Drizzle (check package.json)
   npm run db:push

   # Or run SQL directly
   psql -d european_languages_db -f init.sql
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5001`

### Production Setup with Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: `http://localhost`
   - Admin Panel: `http://localhost/admin`

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="European Language Institute"
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_INSTITUTE_EMAIL=info@europelanguages.ae
```

#### Backend (.env.backend)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/european_languages_db
SESSION_SECRET=your_secret_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Database Configuration

The application uses PostgreSQL with the following main tables:
- `admin_users` - Admin user accounts
- `course_registrations` - Student registrations
- `contact_submissions` - Contact form submissions
- `student_certificates` - Certificate data
- `sessions` - Session management

## 👤 Admin Access

### Default Admin Accounts

| Username | Password  | Role         | Description          |
|----------|-----------|--------------|----------------------|
| admin    | admin123  | super_admin | Full system access   |
| manager  | manager123| admin       | Course management    |
| staff    | staff123  | admin       | Registration staff   |

### Admin Panel Features
- **Dashboard**: Statistics and overview
- **Registration Management**: Approve/reject applications
- **Document Verification**: Review uploaded ID documents
- **User Management**: Manage admin accounts
- **Contact Management**: Handle inquiries

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                 # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   └── vite.ts           # Development server setup
├── shared/                 # Shared types and schemas
├── dist/                  # Built application (generated)
├── uploads/               # File uploads directory
├── logs/                  # Application logs
├── init.sql              # Database initialization
├── docker-compose.yml    # Docker services
├── Dockerfile.*          # Docker build files
└── nginx.conf           # Nginx configuration
```

## 🔒 Security Features

- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Content Security Policy headers
- **Rate Limiting**: API request throttling
- **Session Security**: Secure session management
- **File Upload Security**: Type and size restrictions
- **Password Hashing**: bcrypt for admin passwords

## 📊 API Endpoints

### Public Endpoints
- `GET /api/verify/:idCardNumber` - Certificate verification
- `POST /api/contact` - Contact form submission

### Protected Endpoints (Admin)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/users` - List admin users
- `POST /api/registrations` - Course registration
- `GET /api/registrations` - List registrations
- `PUT /api/registrations/:id` - Update registration

## 🚀 Deployment

### Using Docker Compose (Recommended)
```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Development with hot reload
docker-compose -f docker-compose.dev.yml up
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
NODE_ENV=production node dist/index.js
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run TypeScript check
npm run check

# Database migration (if using Drizzle)
npm run db:push

# Docker commands
docker-compose up -d          # Start all services
docker-compose down          # Stop all services
docker-compose logs          # View logs
docker-compose restart       # Restart services
```

## 📞 Support

For support or questions:
- Email: admin@europelanguages.ae
- Phone: +971-6-5231135
- Address: OFFICE G1A, FAHAD HUSSAIN DARWISH BUILDING, AL GHUWAIR AREA, AL ZAHRA STREET, SHARJAH, UAE

## 📄 License

This project is proprietary software for the European Language Institute.

## 🤝 Contributing

Please contact the development team for contribution guidelines.

---

**European Language Institute** © 2024. All rights reserved.