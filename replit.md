# European Language Institute Website

## Project Overview
A professional, elegant website for a language training institute in Sharjah, UAE. The site showcases European language courses (French, German, Spanish, Italian) and English courses, with a public certificate verification system.

## Institute Details
**European Language Institute**
- Address: OFFICE G1A, FAHAD HUSSAIN DARWISH BUILDING, AL GHUWAIR AREA, AL ZAHRA STREET
- Postal Code: 66551, Sharjah - UAE
- Post Box: 1950
- Tel: 06-5231135

## Key Features

### 1. Homepage
- Eye-catching hero section with gradient background
- Call-to-action buttons (Browse Courses, Verify Certificate)
- Featured language courses with flag icons
- Why Choose Us section highlighting institute strengths
- CEFR levels explanation (A1-C2)
- Professional footer with complete contact information

### 2. Courses Page
- Comprehensive course listings for 5 languages:
  - French (A1-C2)
  - German (A1-C2)
  - Spanish (A1-C2)
  - Italian (A1-C2)
  - English (A1-C2)
- Course cards with duration, levels, and descriptions
- WhatsApp enrollment buttons for each course
- What's Included section

### 3. About Us Page
- Institute mission and vision
- Teaching methodology
- Statistics showcase (5000+ students, 15+ years experience)
- Why Learn European Languages section
- Location information

### 4. Contact Page
- Contact form with validation
- Quick contact cards (Phone, Email, WhatsApp)
- Office hours display
- Google Maps integration showing institute location
- Real-time form submission to backend

### 5. Certificate Verification System
- Public verification page
- Search by student ID card number
- Displays:
  - Student full name
  - ID card number
  - List of completed courses with levels
  - Certificate issue dates
  - Certificate validity periods
- Error handling for invalid/not found IDs
- Print functionality for verification results

## Technical Stack

### Frontend
- React with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- React Hook Form with Zod validation

### Backend
- Express.js server
- In-memory storage (MemStorage)
- RESTful API endpoints
- JSON-based student data

### Design System
- European theme colors:
  - Royal Blue (Primary): #2563EB
  - Gold (Accent): #EAB308
  - Clean white backgrounds
- Professional typography (Inter, Playfair Display)
- Consistent spacing and layout
- Fully responsive design
- Smooth animations and transitions

## API Endpoints

### GET /api/verify/:idCardNumber
Verifies student certificate by ID card number.

**Response:**
```json
{
  "id": "1",
  "studentName": "Ahmed Al Mahmoud",
  "idCardNumber": "STU2024001",
  "courses": [
    {
      "language": "French",
      "level": "A1",
      "certificateIssueDate": "2024-01-15",
      "certificateValidUntil": "2027-01-15"
    }
  ]
}
```

### POST /api/contact
Submits contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971-xxx-xxxx",
  "message": "I'm interested in French courses"
}
```

## Sample Student Data

The system includes 5 sample students for testing:

1. **STU2024001** - Ahmed Al Mahmoud (French A1, A2)
2. **STU2024002** - Fatima Hassan (German A1, A2, B1)
3. **STU2024003** - Maria Rodriguez (Spanish A1, A2)
4. **STU2024004** - John Smith (Italian A1)
5. **STU2024005** - Sara Abdullah (English B1, B2)

## Running the Project

### Development
```bash
npm install
npm run dev
```

The application will start on http://localhost:5000

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/        # Shadcn components
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Verify.tsx
│   │   ├── App.tsx        # Main app with routing
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template with SEO
├── server/
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Data storage layer
├── shared/
│   └── schema.ts          # Shared types and schemas
└── design_guidelines.md   # Design system documentation
```

## Design Guidelines
The project follows strict design guidelines documented in `design_guidelines.md`:
- European theme with royal blue and gold
- Consistent component usage
- Professional typography hierarchy
- Responsive design for all screen sizes
- Accessible color contrast
- Smooth user interactions

## Future Enhancements
- Admin panel for managing student records
- Online course enrollment with payment
- Student login portal
- Multilingual support (Arabic)
- Mobile application
- Automated certificate generation

## Deployment
This application can be deployed to:
- Replit (click Publish button)
- Hostinger
- GoDaddy
- Any Node.js hosting provider

## Contact Information Management
To update institute contact information or add new students:
1. Edit `shared/schema.ts` for institute details
2. Edit `server/storage.ts` to add/modify student records

## Notes
- All data is stored in-memory (resets on server restart)
- For production use, implement persistent database storage
- Sample student data is included for testing the verification system
- WhatsApp links are configured to open with pre-filled messages
