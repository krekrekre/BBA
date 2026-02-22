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

  const inputStyles =
    "w-full px-4 py-3 rounded-lg border border-accent/50 bg-bg-light/50 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-text-dark/40";
  const labelStyles = "block text-sm font-medium text-text-dark mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelStyles}>
          Ime i prezime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputStyles}
          placeholder="Vaše ime"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputStyles}
          placeholder="vas@email.com"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelStyles}>
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={inputStyles}
          placeholder="+381..."
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="message" className={labelStyles}>
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputStyles} resize-none`}
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
        className="w-full bg-brand text-cream py-3.5 rounded-lg font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wide mt-6"
      >
        {status === "loading" ? "Šaljem..." : "Pošalji poruku"}
      </button>
    </form>
  );
}
