import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_SESSION_COOKIE = "admin_session";

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", sessionId)
    .single();

  return data ? sessionId : null;
}
