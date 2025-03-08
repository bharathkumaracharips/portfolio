import { useState } from "react";
import React from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";
import { IconSend } from "@tabler/icons-react";
import emailjs from "emailjs-com";

export default function ContactFormDemo() {
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.subject.trim() !== "" &&
      formData.message.trim() !== ""
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    setIsFormValid(isValid);

    if (!isValid) {
      setStatusMessage("Please fill in all fields.");
      setStatusType("warning");
      return;
    }

    setLoading(true);

    const form = e.target;

    form.querySelector('input[name="user_name"]')?.setAttribute("value", formData.name);
    form.querySelector('input[name="user_email"]')?.setAttribute("value", formData.email);
    form.querySelector('input[name="subject"]')?.setAttribute("value", formData.subject);
    form.querySelector('textarea[name="message"]')?.setAttribute("value", formData.message);

    emailjs
      .sendForm(
        "service_o06i9of",
        "template_043yoph",
        form,
        "HaQYq3fmat6ts9EFh"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Your message has been sent successfully!");
          setStatusType("success");
        },
        (error) => {
          console.log(error.text);
          setStatusMessage("Oops! Something went wrong.");
          setStatusType("error");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-b from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
        Get in Touch
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mx-auto text-center mb-4 dark:text-neutral-300">
        Have a question or want to get in touch? Send me a message!
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            type="text"
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            type="email"
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            placeholder="Your message subject"
            type="text"
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Your message here..."
            rows={4}
            onChange={handleChange}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50/80 dark:bg-zinc-800/80 text-black dark:text-white shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
          <IconSend className="inline-block ml-2 h-4 w-4" />
          <BottomGradient />
        </button>

        {!isFormValid && (
          <div className="mt-4 p-3 text-center rounded-md text-sm bg-yellow-100/80 text-yellow-700 backdrop-blur-sm">
            Please fill in all fields.
          </div>
        )}

        {statusMessage?.startsWith("Your") && (
          <div
            className={`mt-4 p-3 text-center rounded-md text-sm backdrop-blur-sm ${
              statusType === "success"
                ? "bg-green-100/80 text-green-700"
                : statusType === "error"
                ? "bg-red-100/80 text-red-700"
                : statusType === "warning"
                ? "bg-yellow-100/80 text-yellow-700"
                : ""
            }`}
          >
            {statusMessage}
          </div>
        )}
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
