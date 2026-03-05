"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface RSVPFormProps {
  guestName: string;
}

export default function RSVPForm({ guestName }: RSVPFormProps) {
  const [status, setStatus] = useState("yes");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save RSVP directly to Firebase
      const docRef = await addDoc(collection(db, "rsvps"), {
        guestName,
        status: status === "yes" ? "Attending" : "Not Attending",
        message: message || "",
        createdAt: new Date().toISOString(),
      });

      console.log("RSVP saved with ID:", docRef.id);
      setSubmitted(true);
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Rất tiếc, có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message after submission
  if (submitted) {
    return (
      <section className="rsvp mt-20">
        <div className="bg-white border-2 border-gold-leaf p-8 rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">{status === "yes" ? "🎉" : "😊"}</div>
          <h2 className="text-2xl font-serif text-cinereous mb-4">
            {status === "yes" ? "Cảm ơn bạn đã xác nhận!" : "Cảm ơn bạn đã phản hồi!"}
          </h2>
          <p className="text-clay mb-6">
            {status === "yes" 
              ? `Bé Bắp rất mong được gặp ${guestName} tại nhà vào ngày 11/03/2026!` 
              : "Gia đình đã nhận được thông tin. Chân thành cảm ơn bạn."}
          </p>
          <Link 
            href="/"
            className="inline-block py-4 px-8 bg-cinereous text-white font-serif text-lg uppercase tracking-wider hover:bg-black transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp mt-20">
      <div className="guest-greeting font-serif text-[38px] text-cinereous mb-10">
        Thân gửi <span id="guest-name">{guestName}</span>
      </div>

      <form id="invite-form" onSubmit={handleSubmit}>
        <div className="field mb-9 relative">
          <label className="text-[10px] uppercase tracking-[2px] text-gold-leaf absolute -top-[15px]">
            Kính mời
          </label>
          <input
            type="text"
            id="input-guest"
            className="input-text w-full border-none border-b border-[#ccc] bg-transparent py-2 px-0 font-inherit text-[17px] outline-none transition-colors focus:border-b-cinereous"
            value={guestName}
            readOnly
          />
        </div>

        <div className="field mb-9 relative">
          <label className="text-[10px] uppercase tracking-[2px] text-gold-leaf absolute -top-[15px]">
            Sự hiện diện
          </label>
          <select
            className="input-text w-full border-none border-b border-[#ccc] bg-transparent py-2 px-0 font-inherit text-[17px] outline-none transition-colors focus:border-b-cinereous rounded-none"
            id="confirm-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="yes">Chắc chắn tham dự</option>
            <option value="no">Tiếc quá, vắng mặt</option>
          </select>
        </div>

        <div className="field mb-9 relative">
          <label className="text-[10px] uppercase tracking-[2px] text-gold-leaf absolute -top-[15px]">
            Lời chúc cho con
          </label>
          <textarea
            className="input-text w-full border-none border-b border-[#ccc] bg-transparent py-2 px-0 font-inherit text-[17px] outline-none transition-colors focus:border-b-cinereous resize-none"
            rows={2}
            placeholder="Nhắn nhủ gửi đến bé Bắp..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-luxury w-full py-6 bg-cinereous text-white border-none font-serif text-[16px] uppercase tracking-[5px] cursor-pointer transition-all duration-[400ms] hover:bg-black hover:tracking-[7px]"
          disabled={isSubmitting || submitted}
        >
          {isSubmitting ? "Đang gửi..." : submitted ? "Đã gửi" : "Gửi phản hồi"}
        </button>
      </form>
    </section>
  );
}
