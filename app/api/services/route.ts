import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/auth/admin";
import { serviceSchema } from "@/lib/validations/service";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizovano" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase
    .from("services")
    .select("*")
    .order("order_index")
    .order("title_rs");

  if (category && ["tretmani-lica", "epilacija", "depilacija"].includes(category)) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

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
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neispravni podaci", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const supabase = createAdminClient();

    const insertData = {
      category: data.category,
      title_rs: data.title_rs,
      slug: data.slug,
      description_rs: data.description_rs || null,
      content_rs: data.content_rs || null,
      image_url: data.image_url || null,
      price_range: data.price_range || null,
      duration: data.duration || null,
      meta_title: data.meta_title || null,
      meta_description: data.meta_description || null,
      order_index: data.order_index,
      is_active: data.is_active,
    };

    const { data: service, error } = await supabase
      .from("services")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Usluga sa ovim slug-om u ovoj kategoriji već postoji" },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }
}
