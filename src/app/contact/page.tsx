import ContactForm from "@/components/ContactForm";

export default function Contact() {
    return (
        <div className="flex flex-col items-center gap-10 py-10 px-10">
            <h1 className="text-4xl font-semibold">Let's Connect</h1>
            <ContactForm />
        </div>
    );
}