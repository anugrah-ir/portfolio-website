"use server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import prisma from "../../../lib/prisma";
import { put } from "@vercel/blob";

async function saveFile(file: File) {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;

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
  }
);

export async function updateSite(key: string, value: string) {
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: 1,
      },
      data: {
        [key]: value,
      },
    });

    if (!updatedSite) {
      return { success: false };
    }

    revalidateTag("site-metadata", "max");
    revalidatePath("/admin");
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function updateFavicon(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const url = await saveFile(file);

  try {
    const updatedFavicon = await prisma.site.update({
      where: {
        id: 1,
      },
      data: {
        favicon: url,
      },
    });

    if (!updatedFavicon) {
      return { success: false };
    }

    revalidateTag("site-metadata", "max");
    revalidatePath("/admin");
    revalidatePath("/", "layout");

    return { success: true, data: url };
  } catch (error) {
    return { success: false };
  }
}
