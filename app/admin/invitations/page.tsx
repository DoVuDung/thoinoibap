"use client";

import { useState, useEffect } from "react";
import { generateInvitationLink } from "@/lib/guests";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Invitation {
  id: string;
  name: string;
  relationship: string;
  invitationUrl: string;
}

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Load guests from Firebase
  useEffect(() => {
    const loadGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guests"));
        const loadedInvitations: Invitation[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            relationship: data.relationship,
            invitationUrl: generateInvitationLink(data.name),
          };
        });
        setInvitations(loadedInvitations);
      } catch (error) {
        console.error("Error loading guests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

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

  const filteredInvitations =
    filter === "all"
      ? invitations
      : invitations.filter((inv) => inv.relationship === filter);

  const relationships = ["all", "family", "friend", "colleague"];

  return (
    <div className="min-h-screen bg-parchment py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-cinereous mb-8 text-center">
          Danh sách thiệp mời
        </h1>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-clay font-medium">
            Tổng số lời mời:{" "}
            <span className="text-cinereous font-bold">
              {filteredInvitations.length}
            </span>
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-clay">Đang tải danh sách...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredInvitations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gold-leaf/30">
            <p className="text-clay text-lg mb-2">Chưa có khách mờii nào</p>
            <p className="text-gold-leaf text-sm">Hãy thêm khách mờii trong trang Quản lý khách mờii</p>
          </div>
        )}

        {/* Invitation list */}
        <div className="space-y-4">
          {filteredInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-white border border-gold-leaf/30 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-cinereous mb-1">
                    {invitation.name}
                  </h3>
                  <p className="text-sm text-gold-leaf uppercase tracking-wider">
                    {invitation.relationship === "family"
                      ? "Gia đình"
                      : invitation.relationship === "friend"
                        ? "Bạn bè"
                        : "Đồng nghiệp"}
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                  <input
                    type="text"
                    value={invitation.invitationUrl}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-600 bg-gray-50"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(invitation.invitationUrl, invitation.id)
                    }
                    className={`w-full py-2 px-4 text-sm uppercase tracking-wider transition-all ${
                      copiedId === invitation.id
                        ? "bg-green-600 text-white"
                        : "bg-cinereous text-white hover:bg-black"
                    }`}
                  >
                    {copiedId === invitation.id ? "Đã chép" : "Sao chép link"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const allLinks = invitations
                .map((inv) => `${inv.name}: ${inv.invitationUrl}`)
                .join("\n");
              copyToClipboard(allLinks, "all");
            }}
            className="bg-gold-leaf text-white px-8 py-3 rounded hover:bg-clay transition-colors"
          >
            Sao chép tất cả lời mời
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-10 p-6 bg-parchment border-l-4 border-cinereous">
          <h4 className="font-serif text-cinereous mb-3">Hướng dẫn:</h4>
          <ul className="text-sm text-clay space-y-2 list-disc list-inside">
            <li>Chỉnh sửa danh sách khách mời trong file `lib/guests.ts`</li>
            <li>Sao chép link mời và gửi cho khách qua tin nhắn/email</li>
            <li>Khi khách mở link, tên sẽ tự động điền vào form RSVP</li>
            <li>Lọc danh sách theo mối quan hệ để dễ quản lý</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
