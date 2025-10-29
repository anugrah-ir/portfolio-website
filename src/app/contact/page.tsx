import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-10 py-10 px-10">
      <h1 className="text-4xl font-semibold">Let's Connect</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-10">
        <ContactForm />
        <p className="text-2xl lg:mt-10 font-base">OR...</p>
        <SocialLinks />
      </div>
    </div>
  );
}
