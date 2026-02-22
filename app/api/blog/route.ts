import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/auth/admin";
import { blogPostSchema } from "@/lib/validations/blog";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizovano" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizovano" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neispravni podaci", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const supabase = createAdminClient();

    const insertData = {
      title_rs: data.title_rs,
      slug: data.slug,
      content_rs: data.content_rs,
      excerpt_rs: data.excerpt_rs || null,
      featured_image: data.featured_image || null,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      is_published: data.is_published,
      published_at: data.is_published ? new Date().toISOString() : null,
    };

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Post sa ovim slug-om već postoji" },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }
}
