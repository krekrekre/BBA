import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Kontrolna tabla" },
  { href: "/admin/usluge", label: "Usluge" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/utisci", label: "Utisci" },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-accent/30 min-h-screen p-4">
      <Link
        href="/admin/dashboard"
        className="block font-serif text-lg font-bold text-primary mb-6"
      >
        Admin
      </Link>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 rounded-lg text-text-dark hover:bg-accent/20 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8 pt-8 border-t border-accent/30">
        <Link
          href="/"
          className="block px-4 py-2 rounded-lg text-text-dark/70 hover:text-primary text-sm"
        >
          ← Nazad na sajt
        </Link>
      </div>
    </aside>
  );
}
