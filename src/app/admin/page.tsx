import prisma from "../../../lib/prisma";
import SiteForm from "@/components/SiteForm";
import { getSite } from "./actions";

export default async function Admin() {
  let { success, site } = await getSite();

  if (!success || !site) {
    site = {
      title: "",
      description: "",
      favicon: "",
    };
  }

  return (
    <div className="flex flex-col items-center gap-5 px-10 py-5 lg:gap-10 lg:px-20 lg:py-10">
      <h1 className="text-2xl font-medium lg:text-4xl">Admin Dashboard</h1>
      <SiteForm site={site} />
    </div>
  );
}
