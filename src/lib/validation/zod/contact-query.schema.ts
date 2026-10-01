import { z } from "zod";

export const contactQuerySchema = z.object({
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
    .max(5000, "Please keep it under 5000 characters"),
});

export type ContactQuerySchemaValues = z.infer<typeof contactQuerySchema>;
