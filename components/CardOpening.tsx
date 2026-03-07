"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CardOpeningProps {
  onOpenComplete: () => void;
}

export default function CardOpening({ onOpenComplete }: CardOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start opening animation after a brief delay
    const startTimer = setTimeout(() => {
      setIsOpening(true);
    }, 800);

    // Complete animation and notify parent
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onOpenComplete();
    }, 2800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onOpenComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        isOpening ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #FDF6E3 0%, #FFF8E7 50%, #FDF6E3 100%)",
      }}
    >
      {/* Floating clouds background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud className="top-10 left-10 w-24 h-16 opacity-60" delay="0s" />
        <Cloud className="top-20 right-16 w-32 h-20 opacity-50" delay="1s" />
        <Cloud className="bottom-32 left-20 w-20 h-12 opacity-40" delay="2s" />
        <Cloud className="bottom-20 right-24 w-28 h-18 opacity-55" delay="0.5s" />
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="top-16 left-1/4 text-[#F8C8DC]" delay="0s" size="small" />
        <Star className="top-24 right-1/3 text-[#B8D4E3]" delay="0.5s" size="medium" />
        <Star className="top-1/3 left-16 text-[#FFD4BC]" delay="1s" size="small" />
        <Star className="bottom-1/3 right-20 text-[#F8C8DC]" delay="1.5s" size="medium" />
        <Star className="bottom-1/4 left-1/3 text-[#B8D4E3]" delay="0.3s" size="small" />
      </div>

      {/* Card Container with 3D flip */}
      <div
        className="relative w-[90%] max-w-[420px] aspect-[3/4]"
        style={{ perspective: "1200px" }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-[1500ms] origin-left preserve-3d ${
            isOpening ? "animate-card-open" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isOpening ? "rotateY(-120deg)" : "rotateY(0deg)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Front of card (cover) */}
          <div
            className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/images/card.jpg"
              alt="Thiệp mừng thôi nôi"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>

          {/* Back of card (inside) */}
          <div
            className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #FFF8E7 0%, #FDF6E3 100%)",
            }}
          >
            {/* Inside card decoration */}
            <div className="absolute inset-4 border-2 border-dashed border-[#B8D4E3]/40 rounded-xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="text-6xl mb-4">🎈</div>
              <p className="font-serif text-[#6B4423] text-xl text-center">
                Mở thiệp để xem
                <br />
                lờii mờii nhé!
              </p>
            </div>
          </div>
        </div>

        {/* Click hint */}
        {!isOpening && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center animate-pulse">
            <p className="text-[#6B4423]/70 text-sm font-medium">
              Nhấn để mở thiệp
            </p>
            <div className="mt-2 text-2xl">👆</div>
          </div>
        )}
      </div>

      {/* Balloon decorations */}
      <Balloon className="left-8 bottom-20 text-[#F8C8DC]" delay="0s" />
      <Balloon className="right-12 bottom-32 text-[#B8D4E3]" delay="0.5s" />
      <Balloon className="left-16 top-1/3 text-[#FFD4BC]" delay="1s" />
    </div>
  );
}

// Cloud Component
function Cloud({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${className} animate-float-cloud`}
      style={{ animationDelay: delay }}
    >
      <svg
        viewBox="0 0 100 60"
        fill="currentColor"
        className="w-full h-full text-white drop-shadow-lg"
      >
        <path d="M25,40 Q15,40 15,30 Q15,15 30,15 Q35,5 50,5 Q65,5 70,15 Q85,15 85,30 Q85,40 75,40 Z" />
      </svg>
    </div>
  );
}

// Star Component
function Star({
  className,
  delay,
  size,
}: {
  className: string;
  delay: string;
  size: "small" | "medium" | "large";
}) {
  const sizeClass = size === "small" ? "w-3 h-3" : size === "medium" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div
      className={`absolute ${className} ${sizeClass} animate-twinkle`}
      style={{ animationDelay: delay }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
}

// Balloon Component
function Balloon({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${className} animate-float-balloon`}
      style={{ animationDelay: delay }}
    >
      <svg
        viewBox="0 0 40 60"
        fill="currentColor"
        className="w-12 h-16 drop-shadow-md opacity-70"
      >
        <ellipse cx="20" cy="25" rx="15" ry="20" />
        <path
          d="M20 45 L20 55"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <polygon points="20,45 17,50 23,50" fill="currentColor" />
      </svg>
    </div>
  );
}
