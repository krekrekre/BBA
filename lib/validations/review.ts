import { z } from "zod";

export const reviewSchema = z.object({
  author_name: z.string().min(1, "Ime autora je obavezno"),
  author_image: z.string().url().optional().or(z.literal("")),
  rating: z.number().min(1).max(5, "Ocena mora biti između 1 i 5"),
  content_rs: z.string().min(1, "Sadržaj recenzije je obavezan"),
  service_mentioned: z.string().optional(),
  is_mock: z.boolean().default(true),
  is_published: z.boolean().default(true),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
