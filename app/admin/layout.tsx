"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/admin/guest-manager", label: "Quản lý khách mờii", icon: "" },
  { href: "/admin/invitations", label: "Danh sách thiệp", icon: "" },
  { href: "/admin/rsvps", label: "Phản hồi RSVP", icon: "" },
  { href: "/admin/gallery-upload", label: "Upload ảnh", icon: "" },
  { href: "/", label: "Xem trang chính", icon: "" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Redirect to login if not authenticated and not on login page
      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <p className="text-cinereous">Đang tải...</p>
      </div>
    );
  }

  // Don't show layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Don't show content if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <nav className="bg-cinereous text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center">
              <Link href="/admin/guest-manager" className="flex items-center space-x-2">
                <span className="text-2xl">🎂</span>
                <span className="font-serif text-lg tracking-wide hidden sm:block">
                  Admin Panel
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Info, Logout & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80 hidden lg:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="hidden sm:block text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
              >
                Đăng xuất
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/20 mt-4">
                  <p className="px-4 text-sm text-white/60 mb-2">{user.email}</p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-md transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
}
