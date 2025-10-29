import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function About() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-10 text-center text-4xl font-bold">About Me</h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        {/* Left column: Profile picture */}
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full bg-cover bg-center"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src="/me.png"
            alt="My profile picture"
            fill
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Right column: Intro text */}
        <div>
          <h2 className="text-3xl font-bold">{siteData.author.name}</h2>
          <p className="mt-4 max-w-2xl text-lg">{siteData.author.bio}</p>
        </div>
      </div>

      {/* Skills section */}
      <div className="mt-6">
        <h3 className="mt-16 mb-4 text-2xl font-semibold">Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {siteData.author.techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
