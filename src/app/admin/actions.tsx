"use server";
import prisma from "../../../lib/prisma";
import { put } from "@vercel/blob";

export async function getSite() {
  try {
    const site = await prisma.site.findFirst();
    return site;
  } catch (error) {
    return null;
  }
}

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

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;

  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
}
