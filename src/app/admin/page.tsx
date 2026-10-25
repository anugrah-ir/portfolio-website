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
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 md:py-16">
      <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        Admin Dashboard
      </h1>
      <SiteForm site={site} />
    </div>
  );
}
