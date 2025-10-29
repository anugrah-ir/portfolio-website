import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center lg:justify-between min-h-[80vh] lg:min-h-[90vh] max-w-6xl mx-auto px-6">
        {/* Left Side Text */}
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold">Hi</h1>
          <h1 className="text-4xl lg:text-6xl font-bold">
            I'm {siteData.author.nickName}
          </h1>
          <h2 className="text-3xl lg:text-4xl font-semibold">
            {siteData.author.role}
          </h2>
        </div>

        {/* Right Side Image */}
        <div
          className="flex justofy-center items-center mt-10 md:mt-0 relative w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src={siteData.author.avatar}
            alt="Anugrah"
            fill
            className="object-cover rounded-full shadow-lg"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="py-5 max-w-4xl mx-auto px-6 text-left mt-10 lg:mt-0"
      >
        <h2 className="text-5xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          {siteData.author.bio}
        </p>
      </section>
    </main>
  );
}
