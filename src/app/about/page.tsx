import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function About() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10">About Me</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left column: Profile picture */}
        <div
          className="w-48 h-48 relative rounded-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src="/me.png"
            alt="My profile picture"
            fill
            className="object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Right column: Intro text */}
        <div>
          <h2 className="text-3xl font-bold">{siteData.author.name}</h2>
          <p className="mt-4 text-lg max-w-2xl">{siteData.author.bio}</p>
        </div>
      </div>

      {/* Skills section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4 mt-16">Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {siteData.author.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-neutral-800 text-white rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
