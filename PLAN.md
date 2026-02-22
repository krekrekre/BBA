# Beauty Salon Website - Cursor AI Instructions

## 👤 Agent Role

You are a Senior Full Stack Developer specializing in modern web development with Next.js, TypeScript, and Supabase. You have extensive experience building SEO-optimized business websites for local markets, particularly in Serbia. You understand Serbian language requirements, local SEO best practices, and European data privacy standards.

## 🎯 Project Overview

Build a multi-page beauty salon website for the Serbian market with strong SEO focus. The site will showcase services in three main categories, include an admin panel for blog management, and deploy on Vercel with Supabase backend.

## 📋 Core Requirements

### Website Pages

- Homepage with 3 service categories (Tretmani lica, Epilacija, Depilacija)
- About Us page
- Contact page
- Blog (listing and individual posts)
- Reviews page (mock reviews initially)
- Individual service category pages

### Admin Panel (Password Protected)

- Blog post management (create, edit, delete)
- Image upload for blog posts
- Mock review management
- Simple authentication (single admin user)

### SEO Requirements

- Serbian language URLs and content
- Meta tags for all pages
- Sitemap.xml generation
- Schema markup (LocalBusiness, Service, BlogPosting)
- Mobile-optimized design
- Fast page loading

### Technical Stack

- Frontend: Next.js 14+ with App Router
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- Hosting: Vercel
- Image storage: Supabase Storage

## 📁 Project Structure

beauty-salon-website/
├── app/
│ ├── (public)/
│ │ ├── page.tsx # Homepage
│ │ ├── o-nama/
│ │ │ └── page.tsx # About us
│ │ ├── usluge/
│ │ │ ├── page.tsx # Services overview
│ │ │ ├── tretmani-lica/
│ │ │ │ └── page.tsx # Facial treatments
│ │ │ ├── epilacija/
│ │ │ │ └── page.tsx # Epilation
│ │ │ └── depilacija/
│ │ │ └── page.tsx # Depilation
│ │ ├── blog/
│ │ │ ├── page.tsx # Blog listing
│ │ │ └── [slug]/
│ │ │ └── page.tsx # Individual blog post
│ │ ├── kontakt/
│ │ │ └── page.tsx # Contact
│ │ └── utisci/
│ │ └── page.tsx # Reviews
│ ├── admin/
│ │ ├── login/
│ │ │ └── page.tsx # Admin login
│ │ ├── dashboard/
│ │ │ └── page.tsx # Admin dashboard
│ │ ├── blog/
│ │ │ ├── page.tsx # Manage blog posts
│ │ │ ├── nova/
│ │ │ │ └── page.tsx # New blog post
│ │ │ └── [id]/
│ │ │ └── page.tsx # Edit blog post
│ │ └── utisci/
│ │ ├── page.tsx # Manage reviews
│ │ └── nova/
│ │ └── page.tsx # Add mock review
│ └── api/
│ ├── auth/
│ │ └── route.ts
│ ├── blog/
│ │ ├── route.ts
│ │ └── [id]/
│ │ └── route.ts
│ └── reviews/
│ ├── route.ts
│ └── [id]/
│ └── route.ts
├── components/
│ ├── layout/
│ ├── ui/
│ ├── home/
│ ├── blog/
│ ├── forms/
│ └── admin/
├── lib/
│ ├── supabase/
│ ├── utils/
│ └── validations/
└── public/

## 🗄️ Database Tables

### admin_users

- id (UUID, primary key)
- email (string, unique)
- password_hash (string)
- created_at (timestamp)
- last_login (timestamp)

### services

- id (UUID, primary key)
- category (string: 'tretmani-lica', 'epilacija', 'depilacija')
- title_rs (string)
- description_rs (text)
- price_range (string)
- duration (string)
- image_url (string)
- order_index (integer)
- is_active (boolean)
- timestamps

### blog_posts

- id (UUID, primary key)
- title_rs (string)
- slug (string, unique)
- content_rs (text)
- excerpt_rs (string)
- featured_image (string)
- meta_title (string)
- meta_description (text)
- published_at (timestamp)
- is_published (boolean)
- views_count (integer)
- timestamps

### reviews

- id (UUID, primary key)
- author_name (string)
- author_image (string)
- rating (integer 1-5)
- content_rs (text)
- service_mentioned (string)
- is_mock (boolean)
- is_published (boolean)
- created_at (timestamp)

## 📝 Implementation Steps

### Phase 1: Project Setup

1. Initialize Next.js project with TypeScript and Tailwind CSS
2. Configure ESLint and Prettier
3. Create the complete folder structure as outlined
4. Set up environment variables locally

### Phase 2: Database Setup

1. Create Supabase project
2. Create all database tables with proper relationships
3. Set up Row Level Security (RLS) policies
4. Create storage bucket for images
5. Set up authentication for admin user

### Phase 3: Core Configuration

1. Configure Supabase client utilities (client and server)
2. Set up middleware for route protection
3. Create TypeScript types for all database tables
4. Set up validation schemas for forms

### Phase 4: Layout Components

1. Build responsive Header with navigation
2. Build responsive Footer
3. Create layout wrapper with metadata configuration
4. Implement mobile menu functionality

### Phase 5: Homepage

1. Create Hero section with salon name and tagline
2. Build three service category cards with images
3. Add blog preview section showing latest 3 posts
4. Create reviews carousel/section
5. Add contact CTA section

### Phase 6: Service Pages

1. Create services overview page
2. Build individual category pages
3. Display list of services with details
4. Add images and pricing information

### Phase 7: Blog Pages

1. Create blog listing page with pagination
2. Build individual blog post page
3. Implement rich text content rendering
4. Add share buttons and related posts
5. Create SEO-friendly URLs with slugs

### Phase 8: About and Contact Pages

1. Build About Us page with salon information
2. Create Contact page with form
3. Integrate Google Maps
4. Display working hours and contact information

### Phase 9: Reviews Page

1. Create page displaying all reviews
2. Implement filtering by rating
3. Add mock reviews data
4. Design testimonial cards

### Phase 10: Admin Authentication

1. Create login page
2. Implement session management
3. Set up protected routes
4. Create admin dashboard layout

### Phase 11: Blog Management

1. Create blog posts list view for admin
2. Build form for creating new posts
3. Implement edit functionality
4. Add image upload to Supabase Storage
5. Create delete functionality with confirmation
6. Add publish/unpublish toggle

### Phase 12: Review Management

1. Create reviews list view for admin
2. Build form for adding mock reviews
3. Implement edit functionality
4. Add delete functionality
5. Add publish/unpublish toggle

### Phase 13: SEO Implementation

1. Add metadata to all pages
2. Generate sitemap.xml dynamically
3. Create robots.txt
4. Implement JSON-LD schema markup:
   - LocalBusiness schema for salon
   - Service schemas for each category
   - BlogPosting schema for articles
5. Set up canonical URLs

### Phase 14: Performance Optimization

1. Implement Next.js Image component for all images
2. Add lazy loading for below-fold content
3. Configure caching strategies
4. Implement loading states and skeletons
5. Optimize font loading

### Phase 15: Testing

1. Test all pages on mobile, tablet, and desktop
2. Verify all forms submit correctly
3. Test admin authentication and CRUD operations
4. Check all links and navigation
5. Validate HTML and accessibility
6. Run Lighthouse audits

### Phase 16: Deployment

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables on Vercel
4. Deploy to production
5. Set up custom domain
6. Configure SSL certificate

### Phase 17: Post-Launch

1. Submit sitemap to Google Search Console
2. Verify schema markup in Google Rich Results Test
3. Set up Google Analytics
4. Monitor performance and errors

## 🎨 Design Guidelines

### Color Palette

- Primary: Soft pink (#D4AFB9)
- Secondary: Sage green (#9B9B7A)
- Accent: Peach (#E8D1C5)
- Text: Dark gray (#2D2D2D)
- Background: White (#FFFFFF)
- Light gray: #F5F5F5

### Typography

- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)
- Serbian Latin script support

### Responsive Breakpoints

- Mobile: up to 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🔒 Security Requirements

1. Environment variables for all secrets
2. Input validation on all forms
3. Row Level Security in Supabase
4. Protected admin routes with middleware
5. Secure session management
6. HTTPS only

## 📈 SEO Keywords (Serbian)

### Primary Keywords

- "beauty by aysha [grad]"
- "tretmani lica [grad]"
- "epilacija [grad]"
- "depilacija [grad]"
- "kozmetički salon [grad]"

### Secondary Keywords

- "najbolji tretmani za lice"
- "trajna epilacija cena"
- "depilacija voskom"
- "nega lica salon"
- "profesionalna kozmetika"

## ✅ Quality Checklist

- [ ] All pages load in under 3 seconds
- [ ] Mobile responsive on all screen sizes
- [ ] Contact form submits and validates
- [ ] Admin login works securely
- [ ] Blog posts can be created with images
- [ ] SEO metadata present on all pages
- [ ] Sitemap.xml accessible
- [ ] Schema markup validates
- [ ] No broken links
- [ ] Images optimized and lazy loaded
- [ ] Serbian characters display correctly
- [ ] Google Maps integration works
- [ ] Social media meta tags present
- [ ] robots.txt properly configured
- [ ] 404 page exists

## 🚀 Deployment Checklist

- [ ] Environment variables configured on Vercel
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Database migrations applied
- [ ] Storage buckets configured
- [ ] Caching policies set
- [ ] Analytics installed
- [ ] Search Console verified

## ⚠️ Important Notes

1. All user-facing content must be in Serbian (Latin script)
2. Every page must have unique meta titles and descriptions
3. All images must be optimized using Next.js Image component
4. Implement proper error boundaries and user-friendly messages
5. Follow WCAG 2.1 accessibility guidelines
6. Aim for 90+ Lighthouse score on mobile and desktop
7. Use TypeScript strictly with no 'any' types

## 🎯 Success Criteria

The project is complete when:

1. All pages render correctly with content
2. Admin can log in and manage blog posts
3. Mock reviews are visible on the reviews page
4. Website passes Google PageSpeed Insights (90+ on mobile)
5. All Serbian content displays correctly
6. Website is deployed on Vercel with custom domain
7. Sitemap and robots.txt are configured
8. Schema markup is present and valid
9. Contact form submits correctly
10. Mobile navigation works smoothly

## 📋 Priority Order

1. Project setup and database schema
2. Public pages with Serbian content
3. Admin authentication
4. Blog management system
5. Review management
6. SEO implementation
7. Performance optimization
8. Additional polish and animations

---

**Begin implementation following these steps in order. Each step must be fully functional before moving to the next.**
