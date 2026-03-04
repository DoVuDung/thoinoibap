"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface RSVP {
  id: string;
  guestName: string;
  status: string;
  message: string;
  createdAt: string;
}

export default function RSVPsPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  type FilterType = "all" | "attending" | "not-attending";
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const loadRSVPs = async () => {
      try {
        const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const loadedRSVPs: RSVP[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            guestName: data.guestName,
            status: data.status,
            message: data.message,
            createdAt: data.createdAt,
          };
        });
        setRsvps(loadedRSVPs);
      } catch (error) {
        console.error("Error loading RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRSVPs();
  }, []);

  const filteredRSVPs = rsvps.filter((rsvp) => {
    if (filter === "all") return true;
    if (filter === "attending") return rsvp.status === "Attending";
    if (filter === "not-attending") return rsvp.status === "Not Attending";
    return true;
  });

  const attendingCount = rsvps.filter((r) => r.status === "Attending").length;
  const notAttendingCount = rsvps.filter((r) => r.status === "Not Attending").length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-cinereous mb-8 text-center">
          Danh sách phản hồi (RSVP)
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-gold-leaf p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-cinereous">{rsvps.length}</p>
            <p className="text-sm text-gold-leaf uppercase tracking-wider">Tổng số</p>
          </div>
          <div className="bg-white border-2 border-green-600 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">{attendingCount}</p>
            <p className="text-sm text-green-600 uppercase tracking-wider">Tham dự</p>
          </div>
          <div className="bg-white border-2 border-red-600 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-red-600">{notAttendingCount}</p>
            <p className="text-sm text-red-600 uppercase tracking-wider">Vắng mặt</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { key: "all", label: "Tất cả" },
            { key: "attending", label: "Tham dự" },
            { key: "not-attending", label: "Vắng mặt" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as FilterType)}
              className={`px-6 py-2 border-2 uppercase tracking-wider text-sm transition-all ${
                filter === item.key
                  ? "bg-cinereous text-white border-cinereous"
                  : "border-gold-leaf text-clay hover:bg-gold-leaf hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-clay">Đang tải danh sách...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredRSVPs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gold-leaf/30">
            <p className="text-clay text-lg">Chưa có phản hồi nào</p>
          </div>
        )}

        {/* RSVP List */}
        <div className="space-y-4">
          {filteredRSVPs.map((rsvp) => (
            <div
              key={rsvp.id}
              className="bg-white border border-gold-leaf/30 rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-serif text-cinereous">
                      {rsvp.guestName}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs uppercase tracking-wider rounded ${
                        rsvp.status === "Attending"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rsvp.status === "Attending" ? "Tham dự" : "Vắng mặt"}
                    </span>
                  </div>
                  {rsvp.message && (
                    <p className="text-clay italic mb-2">&ldquo;{rsvp.message}&rdquo;</p>
                  )}
                  <p className="text-xs text-gold-leaf">
                    Gửi lúc: {formatDate(rsvp.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
