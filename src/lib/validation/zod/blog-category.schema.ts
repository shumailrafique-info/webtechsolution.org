import { z } from "zod";

export const blogCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and dashes",
    ),
});

export type BlogCategorySchemaValues = z.infer<typeof blogCategorySchema>;
