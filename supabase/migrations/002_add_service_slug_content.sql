-- Add slug and content fields for individual service pages (SEO-friendly URLs)

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS content_rs TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Unique slug per category
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_category_slug
  ON services (category, slug)
  WHERE slug IS NOT NULL;
