// components/EmailSubscription.js
"use client";

import { useState } from "react";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("Failed to subscribe. Please try again later.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Stay Updated!</h2>
      <p className="text-center mb-4 text-gray-600">
        Be the first to learn the daily new word
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          className="w-full p-2 border-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
  );
}
