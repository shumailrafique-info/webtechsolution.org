import { z } from "zod";
import { uploadedFileSchema } from "./uplaod-file.schema";

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

export const authorSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  bio: z.string().trim(),
  image: z.array(uploadedFileSchema).max(1, "Only one image is allowed"),
});

export const newAuthorSchema = authorSchema.extend({ password });

export const editAuthorFormSchema = authorSchema.extend({
  password: z.string(),
});

export const authorPasswordSchema = z.object({ password });

export type AuthorSchemaValues = z.infer<typeof authorSchema>;
export type NewAuthorSchemaValues = z.infer<typeof newAuthorSchema>;
export type AuthorPasswordSchemaValues = z.infer<typeof authorPasswordSchema>;
