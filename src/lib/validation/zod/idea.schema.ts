import { z } from "zod";

/**
 * The idea box in a post's sidebar. The same schema validates the form in the
 * browser and the payload on the server, so the two cannot drift.
 */
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
  /** Which post the idea came from; absent when submitted from elsewhere. */
  blogId: z.uuid().optional(),
});

export type IdeaSchemaValues = z.infer<typeof ideaSchema>;
