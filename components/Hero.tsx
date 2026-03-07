import Image from "next/image";

interface HeroProps {
  imageUrl?: string;
  babyName?: string;
}

export default function Hero({
  imageUrl = "/images/12.jpeg",
  babyName = "Bé Bắp",
}: HeroProps) {
  return (
    <section className="hero relative mb-16">
      {/* Decorative balloons - left side */}
      <div className="absolute -left-6 top-10 z-20 animate-float-balloon">
        <svg viewBox="0 0 40 60" className="w-10 h-14 opacity-60">
          <ellipse cx="20" cy="25" rx="15" ry="20" fill="#F8C8DC" />
          <path d="M20 45 L20 55" stroke="#F8C8DC" strokeWidth="1.5" fill="none" />
          <polygon points="20,45 17,50 23,50" fill="#F8C8DC" />
        </svg>
      </div>
      <div className="absolute -left-2 top-28 z-20 animate-float-balloon" style={{ animationDelay: "0.5s" }}>
        <svg viewBox="0 0 40 60" className="w-8 h-11 opacity-50">
          <ellipse cx="20" cy="25" rx="15" ry="20" fill="#B8D4E3" />
          <path d="M20 45 L20 55" stroke="#B8D4E3" strokeWidth="1.5" fill="none" />
          <polygon points="20,45 17,50 23,50" fill="#B8D4E3" />
        </svg>
      </div>

      {/* Decorative balloons - right side */}
      <div className="absolute -right-6 top-16 z-20 animate-float-balloon" style={{ animationDelay: "0.3s" }}>
        <svg viewBox="0 0 40 60" className="w-10 h-14 opacity-60">
          <ellipse cx="20" cy="25" rx="15" ry="20" fill="#FFD4BC" />
          <path d="M20 45 L20 55" stroke="#FFD4BC" strokeWidth="1.5" fill="none" />
          <polygon points="20,45 17,50 23,50" fill="#FFD4BC" />
        </svg>
      </div>
      <div className="absolute -right-1 top-36 z-20 animate-float-balloon" style={{ animationDelay: "0.8s" }}>
        <svg viewBox="0 0 40 60" className="w-8 h-11 opacity-50">
          <ellipse cx="20" cy="25" rx="15" ry="20" fill="#F8C8DC" />
          <path d="M20 45 L20 55" stroke="#F8C8DC" strokeWidth="1.5" fill="none" />
          <polygon points="20,45 17,50 23,50" fill="#F8C8DC" />
        </svg>
      </div>

      {/* Main image container with soft styling */}
      <div className="relative mx-auto w-[85%] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-white p-3">
        {/* Inner image with rounded corners */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={babyName}
            fill
            className="object-cover"
            priority
          />
          {/* Soft overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/10 to-transparent" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-1 left-1 w-8 h-8 border-t-2 border-l-2 border-soft-pink/40 rounded-tl-lg" />
        <div className="absolute top-1 right-1 w-8 h-8 border-t-2 border-r-2 border-baby-blue/40 rounded-tr-lg" />
        <div className="absolute bottom-1 left-1 w-8 h-8 border-b-2 border-l-2 border-peach/40 rounded-bl-lg" />
        <div className="absolute bottom-1 right-1 w-8 h-8 border-b-2 border-r-2 border-soft-pink/40 rounded-br-lg" />
      </div>

      {/* Floating badge with baby info */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 border-2 border-baby-blue/20">
          <span className="text-2xl">🎂</span>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[2px] text-warm-brown/60">Tròn</p>
            <p className="font-serif text-[24px] text-warm-brown leading-none">Một tuổi</p>
          </div>
          <span className="text-2xl">🎈</span>
        </div>
      </div>

      {/* Decorative stars around the image */}
      <div className="absolute top-4 right-8 w-4 h-4 text-peach animate-twinkle">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-4 w-3 h-3 text-soft-pink animate-twinkle" style={{ animationDelay: "0.4s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute top-20 right-2 w-3 h-3 text-baby-blue animate-twinkle" style={{ animationDelay: "0.7s" }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </section>
  );
}
