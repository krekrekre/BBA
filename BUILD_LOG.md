# Build Log – Beauty Salon Website

Summary of implementation work for the Beauty Salon website (Serbian market, SEO-focused).

---

## Phase 1: Project Setup

- **Next.js 14** project initialized with TypeScript, Tailwind CSS, App Router, ESLint
- **Prettier** configured (`.prettierrc`)
- Project structure created per PLAN.md: `app/`, `components/`, `lib/`, `supabase/`, `public/`
- **`.env.local.example`** added with Supabase and site URL variables
- **`next.config.mjs`** configured for Supabase image domains
- **Tailwind** extended with design tokens (primary, secondary, accent) and typography plugin

---

## Phase 2: Database Setup

- **`supabase/migrations/001_initial_schema.sql`** created with:
  - `admin_users` – admin auth (email, password_hash)
  - `services` – services by category (tretmani-lica, epilacija, depilacija)
  - `blog_posts` – blog posts with slug, featured image, meta fields
  - `reviews` – reviews with rating, author, mock flag
- **RLS policies** – public read for published content; service role for admin writes
- **Storage** – bucket `blog-images` used for blog post images
- **Seed script** – `scripts/seed-admin.ts` with bcrypt (loads `.env.local` via dotenv)

---

## Phase 3: Core Configuration

- **Supabase clients**: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (server), `lib/supabase/admin.ts` (service role)
- **Types**: `lib/types/database.ts` for AdminUser, Service, BlogPost, Review
- **Validations**: Zod schemas in `lib/validations/` (blog, review, auth)
- **Utils**: `lib/utils/slug.ts` for Serbian slug generation
- **Auth**: `lib/auth/admin.ts` for session checks
- **Middleware**: Admin route protection (cookie `admin_session`), redirects for unauthenticated access

---

## Phase 4: Layout Components

- **Header** – navigation (Početna, Usluge, O nama, Kontakt), logo only, phone + CTA, mobile hamburger menu
- **Footer** – contact info, working hours, navigation, social links
- **Public layout** – `app/(public)/layout.tsx` with Header and Footer
- **Admin layout** – `app/admin/(dashboard)/layout.tsx` with sidebar and logout
- Responsive breakpoints: 640px (sm), 1024px (lg)

---

## Phase 5: Homepage

- **Hero** – badge, title, tagline, CTA buttons, Unsplash stock background
- **Service category cards** – 3 image-overlay cards (EKSKLUZIVNA NEGA), link to tretmani-lica, epilacija, depilacija
- **Reviews carousel** – published reviews (before blog)
- **Blog preview** – latest 3 published posts
- **Contact CTA** – contact link and phone

---

## Phase 6: Service Pages

- **`/usluge`** – overview of service categories with white cards, primary title bar, arrow CTA
- **`/usluge/[category]`** – dynamic category pages (tretmani-lica, epilacija, depilacija) fetching services from Supabase
- **`/usluge/[category]/[slug]`** – individual service detail pages with breadcrumbs, meta, Service schema, CTA
- Migration **002_add_service_slug_content.sql** – adds slug, content_rs, meta_title, meta_description to services
- **`npm run seed:services`** – seeds 42 services across 3 categories with slugs and placeholder content
- Services shown with images, descriptions, price ranges, durations; white card background

---

## Phase 7: Blog Pages

- **`/blog`** – paginated list (9 posts per page)
- **`/blog/[slug]`** – single post with HTML content, featured image, share buttons (Twitter, Facebook, copy link), related posts
- **Metadata** – dynamic meta title/description
- **Views** – view count updated on visit

---

## Phase 8: About and Contact

- **`/o-nama`** – About page with story, team, values, image gallery (aida.jpg, aida1.jpg)
- **`/kontakt`** – Contact form, address, hours, phone, email, Google Maps embed

---

## Phase 9: Reviews Page

- **`/utisci`** – reviews grid with star ratings
- **Filter** – by rating (5, 4, 3 stars)
- Fetches published reviews from Supabase

---

## Phase 10: Admin Authentication

- **`/admin/login`** – email/password form
- **API** – `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/verify`
- **Auth flow** – bcrypt against `admin_users`, session cookie `admin_session`
- **Dashboard** – `app/admin/(dashboard)/dashboard/page.tsx` with links to blog and reviews

---

## Phase 11: Blog Management (Admin)

- **`/admin/blog`** – list of posts with publish status
- **`/admin/blog/nova`** – new post form (title, slug, content HTML, excerpt, featured image, meta, publish toggle)
- **`/admin/blog/[id]`** – edit post
- **Image upload** – `POST /api/upload` to Supabase Storage `blog-images`
- **API** – GET/POST `/api/blog`, GET/PUT/DELETE `/api/blog/[id]`
- **Delete** – confirmation modal before delete

---

## Phase 12: Review Management (Admin)

- **`/admin/utisci`** – list of reviews
- **`/admin/utisci/nova`** – add review (author, rating, content, service, mock/publish)
- **`/admin/utisci/[id]`** – edit review
- **API** – GET/POST `/api/reviews`, GET/PUT/DELETE `/api/reviews/[id]`

---

## Phase 15: Service Management (Admin)

- **`/admin/usluge`** – list of services with category filter
- **`/admin/usluge/nova`** – add service (category, title, slug, description, content HTML, image, price, duration, meta)
- **`/admin/usluge/[id]`** – edit service
- **API** – GET/POST `/api/services`, GET/PUT/DELETE `/api/services/[id]`
- Image upload via existing `/api/upload` (blog-images bucket)

---

## Phase 13: SEO

- **Metadata** on all pages
- **Sitemap** – `app/sitemap.ts` (static + blog slugs)
- **Robots** – `app/robots.ts` (disallow `/admin/`, `/api/`)
- **JSON-LD** – LocalBusiness in root layout, BlogPosting on blog post pages
- **metadataBase** and Open Graph in layout

---

## Phase 14: Performance

- **Next.js Image** – used for all public images
- **Loading states** – `loading.tsx` for public, blog, blog post, admin
- **Fonts** – Playfair Display (headings), Inter (body) via `next/font`
- **404** – custom `app/not-found.tsx`

---

## Post-Implementation Updates

### Seed Script Fix
- **dotenv** added to load `.env.local` for `scripts/seed-admin.ts` (env vars not loaded for plain Node/tsx)

### Image Integration
- **Service cards**: `feature1.jpg`, `feature2.jpg`, `feature3.jpg` for tretmani-lica, epilacija, depilacija
- **Hero**: `bg-image.jpg` as background
- **Header/Footer**: `logo.png` in branding
- **Favicon**: `favicon.jpg` set in layout metadata
- **About page**: `aida.jpg` and `aida1.jpg` added as two-column image section

### Design & UI Overhaul (2025)

**Color palette**: #63333a, #986369, #ffe3e8 (primary, secondary, accent, cream, brand, text-dark, bg-light)

**Container**: Narrower max-widths – lg 960px, xl 1080px, 2xl 1152px

**Header**:
- Logo only (no text), 4 nav links: Početna, Usluge, O nama, Kontakt
- Phone + "Pozovite nas" CTA on right
- Desktop: nav links grouped with logo on left; phone/CTA on right via `ml-auto`
- Mobile: burger menu with smooth transition (max-height, opacity)
- Smaller header height (h-12 lg:h-14)

**Hero section**:
- 75vh min-height, Unsplash stock background
- Neutral black overlay (no red tint)
- Badge "DOBRODOŠLI U OAZU MIRA" (hidden on mobile)
- Heading "Vaša oaza lepote i mira", cream text
- CTAs: Zakažite termin, Naše usluge
- Mobile: content lower (justify-end), responsive text/button sizes, full-width buttons
- Scroll indicator (double chevron)

**Service cards** ("Naše Usluge"):
- Image-only cards with dark gradient overlay at bottom
- Title + "SAZNAJTE VIŠE →" on overlay
- "EKSKLUZIVNA NEGA" subheading, secondary underline
- Stock images from Unsplash

**Homepage section order**: Hero → Services → Reviews → Blog → Contact CTA

**Images**:
- Logo and favicon: `/images/logo.png`
- Hero, service cards, about page: Unsplash stock images
- Blog posts: picsum.photos (seed script)
- `next.config.mjs`: remotePatterns for picsum.photos, images.unsplash.com

**Seed scripts** (`package.json`):
- `npm run seed:blog` – 6 mock Serbian blog posts (picsum.photos images)
- `npm run seed:reviews` – 10 mock reviews (replaces existing mocks on re-run)

**Other**:
- "Svi postovi" button: `rgb(99 51 58 / 0.9)`
- Phase 4 Header: reduced to 4 nav links (removed Blog, Utisci from main nav)

### Services & UI Updates (Feb 2025)

**Usluge page**:
- Cards with primary-colored title bar, white background, arrow CTA bottom right
- Larger titles (text-3xl lg:text-4xl), flex layout for button positioning

**Usluge category pages** (tretmani-lica, epilacija, depilacija):
- White card background, shadow-sm, same styling as /usluge cards

**Individual service pages** (`/usluge/[category]/[slug]`):
- Breadcrumbs, Service JSON-LD schema, ContactCTA at bottom
- Fix: separate slug/id queries instead of `.or()` for PostgREST hyphen handling

**Homepage**:
- "Sve usluge" button below service category cards (links to /usluge)
- Hero paragraph: text-start alignment
- Main layout: `bg-bg-light` applied to all public pages

**Sitemap**: Service URLs added dynamically from DB

---

## Tech Stack

| Layer       | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 14 (App Router)       |
| Language   | TypeScript                    |
| Styling    | Tailwind CSS                  |
| Database   | Supabase (PostgreSQL)         |
| Auth       | Custom (bcrypt, admin_users)  |
| Storage    | Supabase Storage              |
| Validation | Zod                           |

---

## Project Structure (Key Paths)

```
d:\BBA\
├── app/
│   ├── (public)/          # Public pages with Header/Footer
│   │   ├── page.tsx       # Homepage
│   │   ├── o-nama/        # About
│   │   ├── usluge/        # Services overview + [category] + [category]/[slug]
│   │   ├── blog/          # Blog list + [slug]
│   │   ├── kontakt/       # Contact
│   │   └── utisci/        # Reviews
│   ├── admin/
│   │   ├── login/         # Admin login
│   │   └── (dashboard)/   # Protected admin area
│   │       ├── dashboard/
│   │       ├── usluge/    # Service management
│   │       ├── blog/      # Blog management
│   │       └── utisci/    # Review management
│   ├── api/               # Auth, blog, reviews, services, upload
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/            # Header, Footer, SchemaMarkup
│   ├── home/              # Hero, ServiceCategoryCards, BlogPreview, etc.
│   ├── blog/              # ShareButtons, ReviewsList, ReviewsFilter
│   ├── forms/             # ContactForm
│   ├── usluge/            # ServiceSchema
│   └── admin/             # AdminLoginForm, BlogPostForm, ReviewForm, ServiceForm, etc.
├── lib/                   # supabase, types, validations, utils, auth
├── public/images/         # Logo (features/bg/about use Unsplash)
├── supabase/migrations/   # 001_initial_schema.sql, 002_add_service_slug_content.sql
└── scripts/               # seed-admin.ts, seed-blog.ts, seed-reviews.ts, seed-services.ts
```

---

*Last updated: Feb 2025*
