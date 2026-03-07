"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";
import DetailsGrid from "@/components/DetailsGrid";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import CardOpening from "@/components/CardOpening";
import FloatingElements from "@/components/FloatingElements";

export default function Home() {
  const [cardOpened, setCardOpened] = useState(false);
  const [guestName, setGuestName] = useState("Quý khách");
  const [hasInvitation, setHasInvitation] = useState(false);

  // Handle URL parameters on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const rawName = params.get("clientname") || params.get("name");
      if (rawName) {
        const cleanName = decodeURIComponent(rawName).replace(/"/g, "").replace(/\+/g, " ").trim();
        setGuestName(cleanName);
        setHasInvitation(true);
      }
    }
  });

  return (
    <>
      {/* Card Opening Animation */}
      {!cardOpened && <CardOpening onOpenComplete={() => setCardOpened(true)} />}

      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Main Content */}
      <div 
        className={`container max-w-[480px] mx-auto px-6 py-10 relative z-10 transition-opacity duration-1000 ${
          cardOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header />
        <Hero />
        <ContentSection />
        <DetailsGrid />
        <Gallery />
        {hasInvitation && guestName && <RSVPForm guestName={guestName} />}
        <footer className="text-center py-16 text-[10px] tracking-[3px] opacity-60 uppercase mt-20 text-warm-brown">
          <p className="mb-2">Gia đình Bắp trân trọng cảm ơn</p>
          <p>Đà Nẵng — Việt Nam</p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="text-soft-pink">★</span>
            <span className="text-baby-blue">★</span>
            <span className="text-peach">★</span>
          </div>
        </footer>
      </div>
    </>
  );
}
