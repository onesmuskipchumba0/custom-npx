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

export default function Contacts() {
    const form = useRef<HTMLFormElement>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                "service_fhvetxe", // Replace with your EmailJS service ID
                "template_lvzce04", // Replace with your EmailJS template ID
                form.current,
                "qu9LLHb6JZzUFADPR" // Replace with your EmailJS public key
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setSuccess(true);
                    setError("");
                },
                (error) => {
                    console.error(error.text);
                    setError("An error occurred while sending the message.");
                }
            );
        (e.currentTarget as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Get in Touch
                </h1>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="w-full">
                            <label
                                htmlFor="user_name"
                                className="text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                            >
                                <FaUser className="mr-2" /> Name
                            </label>
                            <input
                                type="text"
                                id="user_name"
                                name="user_name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                        </div>
                        <div className="w-full mt-4 sm:mt-0">
                            <label
                                htmlFor="user_email"
                                className="text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                            >
                                <FaEnvelope className="mr-2" /> Email
                            </label>
                            <input
                                type="email"
                                id="user_email"
                                name="user_email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                        >
                            <FaRegPaperPlane className="mr-2" /> Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Your message..."
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        ></textarea>
                    </div>
                    {success && (
                        <div className="p-2 rounded bg-green-100 text-green-700 text-center">
                            Message sent successfully!
                        </div>
                    )}
                    {error && (
                        <div className="p-2 rounded bg-red-100 text-red-700 text-center">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition duration-200 text-white py-3 rounded font-semibold"
                    >
                        Send Message
                    </button>
                </form>
                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                        Other ways to contact
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:onesmuskipchumba5@gmail.com"
                            className="flex items-center text-blue-500 hover:text-blue-600 transition"
                        >
                            <FaEnvelope className="mr-2" /> Email
                        </a>
                        <a
                            href="https://github.com/onesmuskipchumba0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-500 hover:text-blue-600 transition"
                        >
                            <FaGithub className="mr-2" /> GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/onesmuskipchumba0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-500 hover:text-blue-600 transition"
                        >
                            <FaLinkedin className="mr-2" /> LinkedIn
                        </a>
                        <a
                            href="tel:+254792400709"
                            className="flex items-center text-blue-500 hover:text-blue-600 transition"
                        >
                            <FaPhone className="mr-2" /> +254792400709
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
