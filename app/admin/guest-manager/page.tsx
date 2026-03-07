"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Guest {
  id?: string;
  name: string;
  relationship: string;
  invitationUrl: string;
  createdAt: Date | null;
}

export default function GuestManager() {
  const [guestName, setGuestName] = useState("");
  const [relationship, setRelationship] = useState("family");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRelationship, setEditRelationship] = useState("family");

 

  // Load guests from Firestore on mount
  useEffect(() => {
    const loadGuests = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "guests"));
        const loadedGuests: Guest[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || null,
        })) as Guest[];
        setGuests(loadedGuests);
      } catch (error) {
        console.error("Error loading guests:", error);
        console.error("Error details:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
          alert(`Không thể tải danh sách khách mờii. Lỗi: ${error.message}`);
        } else {
          alert("Không thể tải danh sách khách mờii. Vui lòng kiểm tra Firebase configuration.");
        }
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

  const generateInvitationLink = (name: string): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const encodedName = encodeURIComponent(`"${name}"`);
    return `${baseUrl}?clientname=${encodedName}`;
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName.trim()) {
      alert("Vui lòng nhập tên khách mời!");
      return;
    }

    try {
      console.log("Adding guest:", guestName);
      console.log("Firebase db:", db);
      const invitationUrl = generateInvitationLink(guestName);
      
      const docRef = await addDoc(collection(db, "guests"), {
        name: guestName.trim(),
        relationship,
        invitationUrl,
        createdAt: new Date(),
      });

      setGuests([
        ...guests,
        {
          id: docRef.id,
          name: guestName.trim(),
          relationship,
          invitationUrl,
          createdAt: new Date(),
        },
      ]);

      setGuestName("");
      alert(`Đã thêm ${guestName} vào danh sách!`);
    } catch (error) {
      console.error("Error adding guest:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        alert(`Không thể thêm khách mờii. Lỗi: ${error.message}`);
      } else {
        alert("Không thể thêm khách mờii. Vui lòng thử lại.");
      }
    }
  };

  const handleDeleteGuest = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa "${name}" khỏi danh sách?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "guests", id));
      setGuests(guests.filter((g) => g.id !== id));
      alert(`Đã xóa ${name} khỏi danh sách!`);
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Không thể xóa khách mời.");
    }
  };

  const startEditing = (guest: Guest) => {
    setEditingId(guest.id!);
    setEditName(guest.name);
    setEditRelationship(guest.relationship);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditRelationship("family");
  };

  const handleUpdateGuest = async (id: string) => {
    if (!editName.trim()) {
      alert("Vui lòng nhập tên khách mờii!");
      return;
    }

    try {
      const newInvitationUrl = generateInvitationLink(editName);
      await updateDoc(doc(db, "guests", id), {
        name: editName.trim(),
        relationship: editRelationship,
        invitationUrl: newInvitationUrl,
      });

      setGuests(guests.map((g) =>
        g.id === id
          ? {
              ...g,
              name: editName.trim(),
              relationship: editRelationship,
              invitationUrl: newInvitationUrl,
            }
          : g
      ));

      setEditingId(null);
      alert("Đã cập nhật thông tin khách mờii!");
    } catch (error) {
      console.error("Error updating guest:", error);
      alert("Không thể cập nhật khách mờii.");
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      alert("Đã sao chép link mời!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleBulkExport = () => {
    const allLinks = filteredGuests
      .map((guest) => `${guest.name}: ${guest.invitationUrl}`)
      .join("\n");
    copyToClipboard(allLinks, "all");
  };

  const filteredGuests =
    filter === "all"
      ? guests
      : guests.filter((guest) => guest.relationship === filter);

  const relationships = ["all", "family", "friend", "colleague"];

  return (
    <div className="min-h-screen bg-parchment py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-cinereous mb-8 text-center">
          Quản Lý Danh Sách Khách Mời
        </h1>

        {/* Add Guest Form */}
        <form onSubmit={handleAddGuest} className="bg-white border-2 border-gold-leaf p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-serif text-cinereous mb-6">Thêm Khách Mới</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
                Tên Khách Mời
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nhập tên khách..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-cinereous outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
                Mối Quan Hệ
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-cinereous outline-none transition-colors text-lg bg-white"
              >
                <option value="family">Gia đình</option>
                <option value="friend">Bạn bè</option>
                <option value="colleague">Đồng nghiệp</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full md:w-auto px-8 py-4 bg-cinereous text-white font-serif text-lg uppercase tracking-wider hover:bg-black transition-colors"
          >
            + Thêm và Tạo Link Mời
          </button>
        </form>

        {/* Filter and Stats */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {relationships.map((rel) => (
              <button
                key={rel}
                onClick={() => setFilter(rel)}
                className={`px-6 py-2 border-2 uppercase tracking-wider text-sm transition-all ${
                  filter === rel
                    ? "bg-cinereous text-white border-cinereous"
                    : "border-gold-leaf text-clay hover:bg-gold-leaf hover:text-white"
                }`}
              >
                {rel === "all"
                  ? "Tất cả"
                  : rel === "family"
                  ? "Gia đình"
                  : rel === "friend"
                  ? "Bạn bè"
                  : "Đồng nghiệp"}
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-clay font-medium">
              Tổng số khách:{" "}
              <span className="text-cinereous font-bold text-xl">
                {filteredGuests.length}
              </span>
            </p>
          </div>
        </div>

        {/* Guest List Table */}
        <div className="bg-white border-2 border-gold-leaf rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cinereous text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                    Tên Khách
                  </th>
                  <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                    Mối Quan Hệ
                  </th>
                  <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                    Link Mời
                  </th>
                  <th className="px-6 py-4 text-center text-sm uppercase tracking-wider">
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGuests.map((guest, index) => {
                  const isEditing = editingId === guest.id;
                  return (
                    <tr key={guest.id} className="hover:bg-parchment transition-colors">
                      <td className="px-6 py-4 text-clay font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gold-leaf rounded text-lg font-serif text-cinereous"
                            autoFocus
                          />
                        ) : (
                          <span className="text-lg font-serif text-cinereous">
                            {guest.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editRelationship}
                            onChange={(e) => setEditRelationship(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gold-leaf rounded text-sm uppercase tracking-wider bg-white"
                          >
                            <option value="family">Gia đình</option>
                            <option value="friend">Bạn bè</option>
                            <option value="colleague">Đồng nghiệp</option>
                          </select>
                        ) : (
                          <span className="text-sm uppercase tracking-wider text-gold-leaf">
                            {guest.relationship === "family"
                              ? "Gia đình"
                              : guest.relationship === "friend"
                              ? "Bạn bè"
                              : "Đồng nghiệp"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={guest.invitationUrl}
                          readOnly
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-gray-600 bg-gray-50"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleUpdateGuest(guest.id!)}
                                className="px-4 py-2 text-xs uppercase tracking-wider bg-green-600 text-white hover:bg-green-700 transition-colors"
                              >
                                Lưu
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-4 py-2 text-xs uppercase tracking-wider bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                              >
                                Hủy
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => copyToClipboard(guest.invitationUrl, guest.id!)}
                                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                                  copiedId === guest.id
                                    ? "bg-green-600 text-white"
                                    : "bg-cinereous text-white hover:bg-black"
                                }`}
                              >
                                {copiedId === guest.id ? "Đã chép" : "Sao chép"}
                              </button>
                              <button
                                onClick={() => startEditing(guest)}
                                className="px-4 py-2 text-xs uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteGuest(guest.id!, guest.name)}
                                className="px-4 py-2 text-xs uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors"
                              >
                                Xóa
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredGuests.length === 0 && (
            <div className="text-center py-12 text-clay">
              <p className="text-lg">
                {loading
                  ? "Đang tải dữ liệu..."
                  : "Chưa có khách mời nào. Hãy thêm khách mời đầu tiên!"}
              </p>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {filteredGuests.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleBulkExport}
              className="bg-gold-leaf text-white px-8 py-4 rounded-lg hover:bg-clay transition-colors text-lg uppercase tracking-wider"
            >
              📋 Sao chép tất cả lời mời ({filteredGuests.length} khách)
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-10 p-6 bg-parchment border-l-4 border-cinereous">
          <h4 className="font-serif text-cinereous mb-3">Hướng dẫn:</h4>
          <ul className="text-sm text-clay space-y-2 list-disc list-inside">
            <li>Nhập tên khách và chọn mối quan hệ, sau đó click &quot;Thêm và Tạo Link Mời&quot;</li>
            <li>Link mời sẽ tự động tạo với định dạng: <code className="bg-white px-2 py-1 rounded">?clientname=&quot;Tên&quot;</code></li>
            <li>Dữ liệu được lưu vào Firebase Firestore</li>
            <li>Sao chép link và gửi cho khách qua tin nhắn/email</li>
            <li>Khi khách mở link, tên sẽ tự động điền vào form RSVP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
