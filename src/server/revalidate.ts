import "server-only";
import { revalidatePath } from "next/cache";

export function revalidateBlogContent() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
}
