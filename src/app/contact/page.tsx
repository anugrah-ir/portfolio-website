import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function Contact() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 md:py-16">
      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Let&apos;s Connect
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start lg:gap-8">
        <ContactForm />
        <div className="flex items-center justify-center py-2 lg:py-24">
          <span className="text-sm font-semibold tracking-wider text-neutral-400 uppercase sm:text-base">
            OR
          </span>
        </div>
        <SocialLinks />
      </div>
    </div>
  );
}
