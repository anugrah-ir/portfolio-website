import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import siteData from "@/data/siteData.json";

export default function SocialLinks() {
    return (
        <div className="flex flex-col items-start gap-8 p-5 w-full lg:w-2/5 rounded-3xl bg-neutral-900 border border-neutral-800">
            <h2 className="self-center text-xl font-semibold">
                Reach Me Out Via My Socials
            </h2>
            <Link
                href={siteData.author.social.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row justify-start items-center w-full px-5 py-3 gap-5 rounded-xl bg-neutral-800 border border-neutral-700"
            >
                <Mail className="w-8 h-8" />
                <p className="text-xl font-base">Email</p>
            </Link>
            <Link
                href={siteData.author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row justify-start items-center w-full px-5 py-3 gap-5 rounded-xl bg-neutral-800 border border-neutral-700"
            >
                <Linkedin className="w-8 h-8" />
                <p className="text-xl font-base">LinkedIn</p>
            </Link>
        </div>
    );
}