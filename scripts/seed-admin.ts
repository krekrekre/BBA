/**
 * Run with: npx tsx scripts/seed-admin.ts
 *
 * Creates initial admin user (admin@salon.com / admin123)
 * Loads env vars from .env.local (run from project root)
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const ADMIN_HASH = bcrypt.hashSync("admin123", 10);

async function seed() {
  const { error } = await supabase.from("admin_users").upsert(
    {
      email: "admin@salon.com",
      password_hash: ADMIN_HASH,
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
  console.log("Admin user created: admin@salon.com");
}

seed();
