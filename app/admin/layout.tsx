import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-parchment">
      <AdminNavbar />
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
}
