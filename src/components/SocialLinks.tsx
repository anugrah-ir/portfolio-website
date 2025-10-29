import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import siteData from "@/data/siteData.json";

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
        <Linkedin className="h-8 w-8" />
        <p className="font-base text-xl">LinkedIn</p>
      </Link>
    </div>
  );
}
