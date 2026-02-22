import type { Metadata } from "next";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin prijava",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="font-serif text-2xl font-bold text-text-dark text-center mb-2">
          Admin prijava
        </h1>
        <p className="text-center text-text-dark/60 text-sm mb-8">
          Unesite vaše kredencijale
        </p>
        <AdminLoginForm />
        <p className="text-center mt-6">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Nazad na sajt
          </Link>
        </p>
      </div>
    </div>
  );
}
