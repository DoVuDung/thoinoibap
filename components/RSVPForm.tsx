"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import WishUpload from "./WishUpload";

interface RSVPFormProps {
  guestName: string;
}

export default function RSVPForm({ guestName }: RSVPFormProps) {
  const [status, setStatus] = useState("yes");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWishUpload, setShowWishUpload] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save RSVP directly to Firebase
      await addDoc(collection(db, "rsvps"), {
        guestName,
        status: status === "yes" ? "Attending" : "Not Attending",
        message: message || "",
        createdAt: new Date().toISOString(),
      });

      // Show wish upload screen for attending guests
      if (status === "yes") {
        setShowWishUpload(true);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Rất tiếc, có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show wish upload screen after RSVP submission for attending guests
  if (showWishUpload) {
    return (
      <WishUpload 
        guestName={guestName} 
        onComplete={() => setSubmitted(true)} 
      />
    );
  }

  // Show success message after submission
  if (submitted) {
    return (
      <section className="rsvp mt-12 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-baby-blue/20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-soft-pink/20 flex items-center justify-center">
            <span className="text-3xl">{status === "yes" ? "🎉" : "😊"}</span>
          </div>
          <h2 className="font-serif text-[24px] text-warm-brown mb-3">
            {status === "yes" ? "Cảm ơn bạn đã xác nhận!" : "Cảm ơn bạn đã phản hồi!"}
          </h2>
          <p className="text-warm-brown/70 mb-6">
            {status === "yes" 
              ? `Bé Bắp rất mong được gặp ${guestName} tại nhà vào ngày 15/03/2025!` 
              : "Gia đình đã nhận được thông tin. Chân thành cảm ơn bạn."}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-baby-blue text-white rounded-full font-medium hover:bg-baby-blue/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Về trang chủ
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp mt-12 mb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-soft-pink" />
          <svg className="w-5 h-5 text-soft-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-soft-pink" />
        </div>
        <h2 className="font-serif text-[22px] text-warm-brown">Xác nhận tham dự</h2>
      </div>

      {/* Greeting */}
      <div className="text-center mb-8">
        <p className="font-serif text-[20px] text-warm-brown">
          Thân gửi <span className="text-soft-pink font-medium">{guestName}</span>
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-peach/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Selection */}
          <div>
            <label className="block text-[11px] uppercase tracking-[2px] text-warm-brown/60 mb-3">
              Sự hiện diện
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("yes")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  status === "yes"
                    ? "border-soft-pink bg-soft-pink/10 text-warm-brown"
                    : "border-gray-200 text-warm-brown/60 hover:border-soft-pink/50"
                }`}
              >
                <span className="text-2xl mb-1 block">✨</span>
                <span className="text-[13px] font-medium">Chắc chắn tham dự</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("no")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  status === "no"
                    ? "border-baby-blue bg-baby-blue/10 text-warm-brown"
                    : "border-gray-200 text-warm-brown/60 hover:border-baby-blue/50"
                }`}
              >
                <span className="text-2xl mb-1 block">💝</span>
                <span className="text-[13px] font-medium">Tiếc quá, vắng mặt</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[11px] uppercase tracking-[2px] text-warm-brown/60 mb-3">
              Lờii chúc cho con
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhắn nhủ gửi đến bé Bắp..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-soft-pink focus:outline-none transition-colors resize-none text-warm-brown placeholder:text-warm-brown/40"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-soft-pink to-peach text-white rounded-xl font-medium text-[15px] hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang gửi...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Gửi phản hồi
              </>
            )}
          </button>
        </form>
      </div>

      {/* Note */}
      <p className="text-center text-[11px] text-warm-brown/50 mt-4">
        Dữ liệu được lưu trữ an toàn qua Firebase
      </p>
    </section>
  );
}
