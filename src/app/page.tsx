import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen max-w-6xl mx-auto px-6">
        {/* Left Side Text */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">Hi</h1>
          <h1 className="text-6xl font-bold">I'm {siteData.author.nickName}</h1>
          <h2 className="text-4xl font-semibold">{siteData.author.role}</h2>
        </div>

        {/* Right Side Image */}
        <div
          className="mt-10 md:mt-0 relative w-[400px] h-[400px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src={siteData.author.avatar}
            alt="Anugrah"
            width={400}
            height={400}
            className="object-cover rounded-full shadow-lg"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="py-15 max-w-4xl mx-auto px-6 text-left"
      >
        <h2 className="text-5xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-300">{siteData.author.bio}</p>
      </section>
    </main>
  );
}
