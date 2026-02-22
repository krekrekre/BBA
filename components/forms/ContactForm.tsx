"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // In production, replace with API route that sends email or saves to DB
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setMessage("Hvala vam! Vaša poruka je uspešno poslata.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Došlo je do greške. Molimo pokušajte ponovo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
          Ime i prezime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="Vaše ime"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="vas@email.com"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="+381..."
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 rounded-lg border border-accent/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
          placeholder="Vaša poruka..."
          disabled={status === "loading"}
        />
      </div>
      {message && (
        <p
          className={
            status === "success" ? "text-green-600 text-sm" : "text-red-600 text-sm"
          }
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Šaljem..." : "Pošalji poruku"}
      </button>
    </form>
  );
}
