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
