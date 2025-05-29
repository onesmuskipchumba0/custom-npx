"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
    FaUser,
    FaEnvelope,
    FaRegPaperPlane,
    FaGithub,
    FaLinkedin,
    FaPhone,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contacts() {
    const form = useRef<HTMLFormElement>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSubmitting(true);
        setSuccess(false);
        setError("");

        emailjs
            .sendForm(
                "service_fhvetxe",
                "template_lvzce04",
                form.current,
                "qu9LLHb6JZzUFADPR"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setSuccess(true);
                    setError("");
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error(error.text);
                    setError("An error occurred while sending the message. Please try again later.");
                    setIsSubmitting(false);
                }
            );
        (e.currentTarget as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
                <div className="md:flex">
                    {/* Contact Information Section */}
                    <div className="md:w-2/5 bg-blue-600 dark:bg-blue-700 text-white p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <p className="mb-8 text-blue-100">
                            Feel free to reach out to me through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities.
                        </p>
                        
                        <div className="space-y-5">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 dark:bg-blue-600 p-2 rounded-lg">
                                    <FaEnvelope className="text-lg" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold">Email</h3>
                                    <a 
                                        href="mailto:onesmuskipchumba5@gmail.com" 
                                        className="text-blue-100 hover:text-white transition"
                                    >
                                        onesmuskipchumba5@gmail.com
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 dark:bg-blue-600 p-2 rounded-lg">
                                    <FaPhone className="text-lg" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold">Phone</h3>
                                    <a 
                                        href="tel:+254792400709" 
                                        className="text-blue-100 hover:text-white transition"
                                    >
                                        +254 792 400 709
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 dark:bg-blue-600 p-2 rounded-lg">
                                    <FaGithub className="text-lg" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold">GitHub</h3>
                                    <a 
                                        href="https://github.com/onesmuskipchumba0" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-100 hover:text-white transition"
                                    >
                                        github.com/onesmuskipchumba0
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500 dark:bg-blue-600 p-2 rounded-lg">
                                    <FaLinkedin className="text-lg" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold">LinkedIn</h3>
                                    <a 
                                        href="https://www.linkedin.com/in/onesmuskipchumba0" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-100 hover:text-white transition"
                                    >
                                        linkedin.com/in/onesmuskipchumba0
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="md:w-3/5 p-8 md:p-10">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            Get in Touch
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Have a question or want to work together? Send me a message.
                        </p>
                        
                        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="user_name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="user_name"
                                            name="user_name"
                                            placeholder="Your Name"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label
                                        htmlFor="user_email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="user_email"
                                            name="user_email"
                                            placeholder="your.email@example.com"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Subject
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaRegPaperPlane className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="What's this about?"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-200"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Your message here..."
                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-200"
                                    required
                                ></textarea>
                            </div>
                            
                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-lg bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100 text-sm"
                                >
                                    Message sent successfully! I'll get back to you soon.
                                </motion.div>
                            )}
                            
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-lg bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-100 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaRegPaperPlane className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}