# Language Institute Website Design Guidelines

## Design Approach: Reference-Based (Education Platform)
Drawing inspiration from modern education platforms like Duolingo, Coursera, and European university websites, combined with clean corporate aesthetics. The design emphasizes trust, professionalism, and accessibility while maintaining visual appeal.

## Color Palette

**Primary Colors (European Theme):**
- Deep Royal Blue: 220 75% 35% - Primary brand color, headers, CTAs
- Pure White: 0 0% 100% - Background, cards, clean spaces
- Elegant Gold: 45 85% 55% - Accents, badges, achievement highlights

**Supporting Colors:**
- Light Blue: 220 60% 92% - Section backgrounds, subtle highlights
- Warm Gray: 220 10% 50% - Body text, secondary information
- Success Green: 145 65% 45% - Verification success states
- Alert Red: 0 70% 55% - Error messages, invalid ID states

**Dark Mode:**
- Background: 220 25% 12%
- Surface: 220 20% 18%
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 70%

## Typography

**Font Families:**
- Headlines: 'Inter' or 'Montserrat' - Bold (600-700), clean, modern
- Body Text: 'Inter' or 'Open Sans' - Regular (400), Medium (500)
- Accents: 'Playfair Display' or 'Merriweather' - For elegant touches in hero

**Scale:**
- Hero Headline: text-5xl (3rem) on mobile, text-7xl (4.5rem) on desktop
- Section Headlines: text-3xl (1.875rem) on mobile, text-5xl (3rem) on desktop
- Subheadings: text-xl (1.25rem) to text-2xl (1.5rem)
- Body: text-base (1rem) to text-lg (1.125rem)
- Small Text: text-sm (0.875rem) for metadata, captions

## Layout System

**Spacing Primitives:**
Primary units: 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section spacing: py-16 (mobile), py-24 to py-32 (desktop)
- Card gaps: gap-6 to gap-8
- Element margins: mb-4, mb-6, mb-8 for vertical rhythm

**Grid System:**
- Mobile: Single column, full-width
- Tablet: 2-column grids for courses, features
- Desktop: 3-4 column for course cards, 2-column for feature sections
- Max container width: max-w-7xl (1280px)

## Component Library

### Navigation
- Sticky transparent header that becomes solid white on scroll
- Logo left, navigation center/right
- "Enroll Now" CTA button in gold with white text
- Mobile: Hamburger menu with slide-in drawer
- Desktop: Horizontal nav with hover underline effects

### Hero Section
- Large hero image showing diverse students in classroom setting or European landmarks
- Height: 70vh minimum, with overlay gradient (blue to transparent)
- Centered content with institute name in large elegant typography
- Dual CTAs: "Browse Courses" (primary gold button) + "Verify Certificate" (outline white button with backdrop blur)
- Subtle animated elements: Floating language flags or gentle parallax

### Course Cards
- White cards with subtle shadow (shadow-md)
- Flag icon (large, 48px-64px) at top
- Course name in bold
- Level badges (A1-C2) in small pills with light blue background
- Duration and description text
- WhatsApp CTA button in gold
- Hover: Slight lift effect (translate-y-1) and increased shadow

### Verification System
- Clean, centered form with generous white space
- Large input field with placeholder "Enter Student ID (e.g., STU2024001)"
- Search button in royal blue
- Results card with:
  - Student photo placeholder (circular avatar)
  - Name in large text
  - ID number beneath
  - Table/grid of completed courses with checkmarks
  - Certificate validity dates with badge
  - Download/Print button
- Error state: Red border with gentle shake animation + helpful message

### Contact Form
- Two-column layout (desktop): Form left, Map/Info right
- Input fields with floating labels
- WhatsApp quick action button prominent
- Google Maps embed with custom pin color (gold)

### Footer
- Three-column layout (desktop): About, Quick Links, Contact
- Full institute address in first column
- Social icons and accreditation badges
- Dark blue background (220 75% 20%) with white/light blue text
- Bottom copyright bar

## Images

**Hero Image:**
- Large, high-quality photograph showing multicultural students in modern classroom or European cultural setting
- Dimensions: 1920x1080 minimum
- Position: Full-width background with overlay
- Alternative: Split hero with image right, content left

**Course Section:**
- Flag icons for each language (France, Germany, Spain, Italy flags)
- Size: 64x64px, high-resolution
- Style: Flat design, vibrant colors

**About Section:**
- Image of institute building exterior
- Classroom environment photos (2-3 images in grid)
- Teachers/staff group photo (optional)

**Verification Page:**
- Student ID card mockup image as example
- Certificate sample thumbnail

## Animations & Interactions

**Subtle Animations Only:**
- Fade-in on scroll for section reveals (duration-300)
- Button hover: Slight scale (scale-105) and brightness increase
- Card hover: Gentle lift with shadow transition
- Form focus: Blue border glow
- Success/Error states: Gentle fade and slide

**No Distracting Effects:**
- Avoid auto-playing videos
- Minimal parallax (only on hero if at all)
- No rotating carousels
- Smooth scroll behavior only

## Page-Specific Guidelines

### Homepage Sections (in order):
1. Hero with dual CTAs (80vh)
2. Course Highlights (3-4 featured courses in grid)
3. Why Choose Us (3-column feature grid with icons)
4. Course Levels Explained (visual representation of A1-C2)
5. Student Success Stories (2-column testimonials)
6. Contact CTA section
7. Footer

### Courses Page:
- Filter bar at top (by language, level)
- 3-column grid of course cards (responsive to 1 column mobile)
- Each card shows: Flag, name, levels available, duration, price, CTA
- Sidebar with quick contact and popular courses

### Verification Page:
- Centered single-column layout
- Maximum width: max-w-2xl
- Generous padding and white space
- Clear instructions above input
- Results display in expandable card format

## Accessibility & Standards
- WCAG AA contrast ratios minimum
- Focus indicators on all interactive elements (2px blue outline)
- Semantic HTML structure
- Alt text for all images
- Form labels always visible
- Keyboard navigation support
- Dark mode toggle in header (sun/moon icon)

## Visual Hierarchy Principles
- Use gold sparingly - only for primary CTAs and achievement indicators
- Blue as dominant brand color throughout
- White space is crucial - don't overcrowd sections
- Card-based design for information grouping
- Consistent border-radius: rounded-lg (8px) for cards, rounded-xl (12px) for images
- Shadow hierarchy: shadow-sm for subtle, shadow-md for cards, shadow-lg for modals

This design balances professional credibility with modern web aesthetics, ensuring the institute appears trustworthy while remaining visually engaging for prospective students.