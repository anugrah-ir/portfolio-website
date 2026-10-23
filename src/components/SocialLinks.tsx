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
    <div className="flex w-full flex-col items-start gap-8 rounded-3xl border border-neutral-800 bg-neutral-900 p-5 lg:w-2/5">
      <h2 className="self-center text-xl font-semibold">
        Reach Me Out Via My Socials
      </h2>
      <Link
        href={siteData.author.social.email}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row items-center justify-start gap-5 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3"
      >
        <Mail className="h-8 w-8" />
        <p className="font-base text-xl">Email</p>
      </Link>
      <Link
        href={siteData.author.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full flex-row items-center justify-start gap-5 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3"
      >
        <LinkedinIcon className="h-8 w-8" />
        <p className="font-base text-xl">LinkedIn</p>
      </Link>
    </div>
  );
}
