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
  { href: "/", label: "Xem trang chính", icon: "" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
                <span className="font-serif text-lg tracking-wide">
                  Admin Panel
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
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

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80 hidden sm:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
}
