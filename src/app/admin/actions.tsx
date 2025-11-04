"use server";
import prisma from "../../../lib/prisma";

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
