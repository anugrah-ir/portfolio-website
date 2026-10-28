import SiteForm from "@/components/SiteForm";
import AdminLoginForm from "@/components/AdminLoginForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { getSite } from "./actions";
import { verifyAdminSession } from "../../../lib/auth";

export default async function Admin() {
  const auth = await verifyAdminSession();

  if (!auth.authorized) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <AdminLoginForm requiresConfig={auth.requiresConfig} />
      </div>
    );
  }

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
      <div className="flex w-full max-w-3xl items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Admin Dashboard
        </h1>
        <AdminLogoutButton />
      </div>
      <SiteForm site={site} />
    </div>
  );
}
