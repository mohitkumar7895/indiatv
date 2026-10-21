import { revalidatePath, revalidateTag } from "next/cache";
import { invalidateMemo } from "@/lib/cache";

export function revalidateSite(paths: string[] = []) {
  invalidateMemo();
  try {
    revalidateTag("cms", "max");
  } catch {
    // revalidateTag may throw if called outside server context
  }
  try {
    revalidatePath("/", "layout");
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch {
    // revalidatePath safe catch
  }
}

