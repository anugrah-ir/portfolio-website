"use server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import prisma from "../../../lib/prisma";
import { put } from "@vercel/blob";
import { verifyAdminSession, loginAdmin, logoutAdmin } from "../../../lib/auth";

const ALLOWED_MIME_TYPES = new Set([
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
]);

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

function isSafeSvg(content: string): boolean {
  const lower = content.toLowerCase();
  const dangerousPatterns = [
    /<script[\s>]/i,
    /<\/script>/i,
    /javascript:/i,
    /data:text\/html/i,
    /<foreignobject[\s>]/i,
    /<iframe[\s>]/i,
    /<embed[\s>]/i,
    /<object[\s>]/i,
    /on\w+\s*=/i,
    /<!doctype/i,
    /<!entity/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(lower)) {
      return false;
    }
  }
  return true;
}

async function saveFile(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 2MB limit.");
  }

  const rawExt = "." + (file.name.split(".").pop()?.toLowerCase() || "");
  if (!ALLOWED_EXTENSIONS.has(rawExt)) {
    throw new Error("Unsupported file extension.");
  }

  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Unsupported file type.");
  }

  if (rawExt === ".svg" || file.type === "image/svg+xml") {
    const text = await file.text();
    if (!isSafeSvg(text)) {
      throw new Error(
        "SVG contains disallowed executable scripts or entities.",
      );
    }
  }

  // Sanitize base name to prevent directory traversal or control characters
  const baseName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 50);

  const filename = `favicon-${Date.now()}-${baseName}${rawExt}`;

  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
}

export const getSite = unstable_cache(
  async () => {
    try {
      const site = await prisma.site.findFirst({
        select: {
          title: true,
          description: true,
          favicon: true,
        },
      });
      return { success: true, site };
    } catch (error) {
      return { success: false };
    }
  },
  ["site-metadata"],
  {
    tags: ["site-metadata"],
    revalidate: 3600,
  },
);

export async function adminLogin(passcode: string) {
  const result = await loginAdmin(passcode);
  if (result.success) {
    revalidatePath("/admin");
  }
  return result;
}

export async function adminLogout() {
  const result = await logoutAdmin();
  revalidatePath("/admin");
  return result;
}

export async function updateSite(key: string, value: string) {
  const auth = await verifyAdminSession();
  if (!auth.authorized) {
    return { success: false, error: "Unauthorized access" };
  }

  const ALLOWED_KEYS = ["title", "description"] as const;
  type AllowedKey = (typeof ALLOWED_KEYS)[number];

  if (!ALLOWED_KEYS.includes(key as AllowedKey)) {
    return { success: false, error: "Invalid field name" };
  }

  const trimmedValue = typeof value === "string" ? value.trim() : "";
  if (
    key === "title" &&
    (trimmedValue.length < 1 || trimmedValue.length > 120)
  ) {
    return {
      success: false,
      error: "Title must be between 1 and 120 characters",
    };
  }
  if (
    key === "description" &&
    (trimmedValue.length < 1 || trimmedValue.length > 500)
  ) {
    return {
      success: false,
      error: "Description must be between 1 and 500 characters",
    };
  }

  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: 1,
      },
      data: {
        [key]: trimmedValue,
      },
    });

    if (!updatedSite) {
      return { success: false, error: "Failed to update site" };
    }

    revalidateTag("site-metadata", "max");
    revalidatePath("/admin");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Site update error:", error);
    return { success: false, error: "Failed to update site" };
  }
}

export async function updateFavicon(formData: FormData) {
  const auth = await verifyAdminSession();
  if (!auth.authorized) {
    return { success: false, error: "Unauthorized access" };
  }

  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const url = await saveFile(file);

    const updatedFavicon = await prisma.site.update({
      where: {
        id: 1,
      },
      data: {
        favicon: url,
      },
    });

    if (!updatedFavicon) {
      return { success: false, error: "Failed to update favicon in database" };
    }

    revalidateTag("site-metadata", "max");
    revalidatePath("/admin");
    revalidatePath("/", "layout");

    return { success: true, data: url };
  } catch (error) {
    console.error("Favicon update error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update favicon",
    };
  }
}
