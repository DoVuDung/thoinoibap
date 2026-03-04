import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-parchment py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-cinereous mb-4 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-clay mb-12">
          Quản lý thiệp mừ và danh sách khách mởi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guest Manager Card */}
          <Link
            href="/admin/guest-manager"
            className="bg-white border-2 border-gold-leaf rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-2xl font-serif text-cinereous mb-2 group-hover:text-gold-leaf transition-colors">
              Quản lý khách mởi
            </h2>
            <p className="text-clay text-sm">
              Thêm, xóa, và quản lý danh sách khách mởi. Tạo link mởi tự động.
            </p>
          </Link>

          {/* Invitations Card */}
          <Link
            href="/admin/invitations"
            className="bg-white border-2 border-gold-leaf rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-serif text-cinereous mb-2 group-hover:text-gold-leaf transition-colors">
              Danh sách thiệp
            </h2>
            <p className="text-clay text-sm">
              Xem và sao chép link mởi cho tất cả khách. Lọc theo mối quan hệ.
            </p>
          </Link>

          {/* View Main Site Card */}
          <Link
            href="/"
            className="bg-white border-2 border-gold-leaf rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group md:col-span-2"
          >
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-2xl font-serif text-cinereous mb-2 group-hover:text-gold-leaf transition-colors">
              Xem trang chính
            </h2>
            <p className="text-clay text-sm">
              Xem trang thiệp mừ như khách sẽ nhìn thấy.
            </p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white border-2 border-gold-leaf rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-serif text-cinereous mb-4">
            Truy cập nhanh
          </h3>
          <div className="space-y-2 text-sm text-clay">
            <p>
              <strong>Guest Manager:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                /admin/guest-manager
              </code>
            </p>
            <p>
              <strong>Invitations:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                /admin/invitations
              </code>
            </p>
            <p>
              <strong>Main Site:</strong>{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">/</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
