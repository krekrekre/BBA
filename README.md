# Beauty Salon Website

Multi-page beauty salon website for the Serbian market with SEO focus. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Public pages**: Homepage, Services (Tretmani lica, Epilacija, Depilacija), Blog, About, Contact, Reviews
- **Admin panel**: Password-protected blog and review management
- **SEO**: Serbian URLs, meta tags, sitemap.xml, robots.txt, JSON-LD schema (LocalBusiness, BlogPosting)
- **Responsive design**: Mobile-first with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL, Storage, Auth)
- bcryptjs (admin authentication)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in SQL Editor: `supabase/migrations/001_initial_schema.sql`
3. Create storage bucket `blog-images` (public)
4. Create admin user:

```bash
npx tsx scripts/seed-admin.ts
```

Or manually in SQL Editor (replace hash with bcrypt hash of your password):

```sql
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@salon.com', '$2a$10$...');
```

### 3. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Admin login

- URL: `/admin/login`
- Default (after seed): admin@salon.com / admin123

## Project Structure

```
app/
  (public)/         # Public pages (Header, Footer)
  admin/            # Admin panel (login, dashboard, blog, utisci)
  api/              # API routes (auth, blog, reviews, upload)
components/         # React components
lib/                # Supabase clients, types, validations
supabase/           # Migrations, README
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

Private
