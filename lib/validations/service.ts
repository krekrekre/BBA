import { z } from "zod";

const categoryEnum = z.enum([
  "tretmani-lica",
  "epilacija",
  "depilacija",
]);

export const serviceSchema = z.object({
  category: categoryEnum,
  title_rs: z.string().min(1, "Naslov je obavezan"),
  slug: z
    .string()
    .min(1, "Slug je obavezan")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug može sadržati samo mala slova, brojeve i crtice"
    ),
  description_rs: z.string().nullish(),
  content_rs: z.string().nullish(),
  image_url: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional(),
  price_range: z.string().nullish(),
  duration: z.string().nullish(),
  meta_title: z.string().nullish(),
  meta_description: z.string().nullish(),
  order_index: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
