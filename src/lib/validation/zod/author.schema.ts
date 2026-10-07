import { z } from "zod";
import { uploadedFileSchema } from "./uplaod-file.schema";

export const authorSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and dashes",
    ),
  bio: z.string().trim(),
  image: z.array(uploadedFileSchema).max(1, "Only one image is allowed"),
});

export type AuthorSchemaValues = z.infer<typeof authorSchema>;
