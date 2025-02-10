require('dotenv').config();
import type React from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";
import { IconSend } from "@tabler/icons-react";
import emailjs from "emailjs-com"; // Import emailjs

export default function ContactFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    // Collect form data
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Update form data dynamically (hidden fields for emailjs template)
    form.querySelector('input[name="user_name"]')?.setAttribute("value", name);
    form.querySelector('input[name="user_email"]')?.setAttribute("value", email);
    form.querySelector('input[name="subject"]')?.setAttribute("value", subject);
    form.querySelector('textarea[name="message"]')?.setAttribute("value", message);

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_o06i9of", // Replace with your EmailJS service ID
        "template_043yoph", // Replace with your EmailJS template ID
        form, // Send the form element itself
        "HaQYq3fmat6ts9EFh" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text); // Log success
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.log(error.text); // Log error
          alert("Oops! Something went wrong.");
        }
      );
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-10 md:mt-16 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Contact Me</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Have a question or want to get in touch? Send me a message!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="you@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Your message subject" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Send Message
          <IconSend className="inline-block ml-2 h-4 w-4" />
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

