import { z } from "zod";

export const blogPostSchema = z.object({
  title_rs: z.string().min(1, "Naslov je obavezan"),
  slug: z.string().min(1, "Slug je obavezan").regex(/^[a-z0-9-]+$/, "Slug može sadržati samo mala slova, brojeve i crtice"),
  content_rs: z.string().min(1, "Sadržaj je obavezan"),
  excerpt_rs: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal("")),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  is_published: z.boolean().default(false),
  published_at: z.string().datetime().optional().nullable(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
