# Supabase Setup

## 1. Create a Supabase project at https://supabase.com

## 2. Run the migration
- Go to SQL Editor in Supabase Dashboard
- Copy contents of `migrations/001_initial_schema.sql`
- Run the query

## 3. Create Storage bucket for blog images
- Go to Storage in Supabase Dashboard
- Create bucket: `blog-images`
- Set to Public (or configure RLS for public read)

## 4. Create admin user
Run in SQL Editor (replace with your email and bcrypt hash):
```sql
-- Generate bcrypt hash for password "admin123" using: bcrypt.hashSync('admin123', 10)
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@salon.com', '$2a$10$...');
```

Or use the seed script after running the app.
