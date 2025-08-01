import { useState, useEffect } from "react";
import React from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";
import { IconSend } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactFormDemo() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log('EmailJS Public Key:', publicKey); // Debug log
    if (publicKey && publicKey !== 'your_public_key_here') {
      emailjs.init(publicKey);
      console.log('EmailJS initialized successfully'); // Debug log
    } else {
      console.error('EmailJS public key not found or not configured');
    }
  }, []);

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.subject.trim() !== "" &&
      formData.message.trim() !== ""
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear status message when user starts typing
    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusMessage("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    // Check if EmailJS environment variables are configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'your_service_id_here' || 
        templateId === 'your_template_id_here' || 
        publicKey === 'your_public_key_here') {
      setStatusMessage("Email service not configured. Please contact the administrator.");
      setStatusType("error");
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // Send email using the modern EmailJS API
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'bharathkumaracharips@gmail.com', // Replace with your actual email
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatusMessage("Message sent successfully!");
      setStatusType("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Email send error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('public key') || errorMessage.includes('init')) {
        setStatusMessage("Email configuration error. Please check public key.");
      } else if (errorMessage.includes('service') || errorMessage.includes('template')) {
        setStatusMessage("Email service configuration error. Please contact support.");
      } else {
        setStatusMessage("Failed to send message. Please try again later.");
      }
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white text-center mb-1">
        Get in Touch
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Have a question or want to collaborate? I'd love to hear from you!
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name" className="text-gray-300 text-sm">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            type="text"
            onChange={handleChange}
            className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            type="email"
            onChange={handleChange}
            className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="subject" className="text-gray-300 text-sm">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            placeholder="What's this about?"
            type="text"
            onChange={handleChange}
            className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-gray-300 text-sm">Message</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Tell me more about your project..."
            rows={4}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <IconSend className="h-4 w-4" />
            </>
          )}
        </button>

        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "text-center text-sm py-2 px-3 rounded-md",
                statusType === "success" ? "text-green-400 bg-green-900/20" : "text-red-400 bg-red-900/20"
              )}
            >
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
