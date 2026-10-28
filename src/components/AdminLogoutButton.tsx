"use client";

import { LogOut } from "lucide-react";
import { adminLogout } from "@/app/admin/actions";

export default function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => adminLogout()}
      className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-300 transition hover:border-neutral-500 hover:text-white sm:text-sm"
    >
      <LogOut size={16} />
      <span>Log Out</span>
    </button>
  );
}
