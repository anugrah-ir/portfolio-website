import Link from "next/link";
import { Mail } from "lucide-react";
import siteData from "@/data/siteData.json";

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-xl sm:gap-8 sm:rounded-3xl sm:p-7 md:p-8 lg:w-[46%]">
      <h2 className="self-center text-center text-lg font-semibold sm:text-xl">
        Reach Me Out Via My Socials
      </h2>
      <Link
        href={siteData.author.social.email}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row items-center justify-start gap-4 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-4 py-3 transition-all hover:border-neutral-500 hover:bg-neutral-700/80 sm:gap-5 sm:px-5 sm:py-3.5"
      >
        <Mail className="h-6 w-6 text-neutral-300 sm:h-7 sm:w-7" />
        <span className="text-base font-medium text-white sm:text-lg">
          Email
        </span>
      </Link>
      <Link
        href={siteData.author.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row items-center justify-start gap-4 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-4 py-3 transition-all hover:border-neutral-500 hover:bg-neutral-700/80 sm:gap-5 sm:px-5 sm:py-3.5"
      >
        <LinkedinIcon className="h-6 w-6 text-neutral-300 sm:h-7 sm:w-7" />
        <span className="text-base font-medium text-white sm:text-lg">
          LinkedIn
        </span>
      </Link>
    </div>
  );
}
