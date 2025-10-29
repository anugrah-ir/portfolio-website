import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-10 px-10 py-10">
      <h1 className="text-4xl font-semibold">Let's Connect</h1>
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
        <ContactForm />
        <p className="font-base text-2xl lg:mt-10">OR...</p>
        <SocialLinks />
      </div>
    </div>
  );
}
