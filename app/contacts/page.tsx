import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Contact Us
      </h1>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
        <form ref={form} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="user_name"
            >
              Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="user_email"
            >
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          {success && (
            <div className="mb-4 text-green-500 text-center">
              Message sent successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
        <p>
          Email:{" "}
          <a
            href="mailto:onesmuskipchumba5@gmail.com"
            className="text-blue-500 hover:underline"
          >
            onesmuskipchumba5@gmail.com
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/onesmuskipchumba0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            onesmuskipchumba0
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/onesmuskipchumba0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            onesmuskipchumba0
          </a>
        </p>
        <p>
          Phone:{" "}
          <a
            href="tel:+254792400709"
            className="text-blue-500 hover:underline"
          >
            +254792400709
          </a>
        </p>
      </div>
    </div>
  );
}
