import { z } from "zod";

export const ideaSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name")
    .max(80, "That name is too long"),
  email: z.email("Enter a valid email address").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more - at least 10 characters")
    .max(4000, "Please keep it under 4000 characters"),
  blogId: z.uuid().optional(),
});

export type IdeaSchemaValues = z.infer<typeof ideaSchema>;
