"use client";

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Clouds */}
      <Cloud className="top-4 left-4 w-20 h-14 opacity-40" delay="0s" />
      <Cloud className="top-8 left-24 w-16 h-10 opacity-30" delay="2s" />
      
      {/* Top Right Clouds */}
      <Cloud className="top-6 right-8 w-24 h-16 opacity-45" delay="1s" />
      <Cloud className="top-12 right-32 w-14 h-9 opacity-25" delay="3s" />

      {/* Scattered Stars */}
      <Star className="top-20 left-[15%] text-[#F8C8DC]" delay="0s" size="small" />
      <Star className="top-32 left-[8%] text-[#B8D4E3]" delay="0.7s" size="medium" />
      <Star className="top-16 right-[20%] text-[#FFD4BC]" delay="1.2s" size="small" />
      <Star className="top-40 right-[12%] text-[#F8C8DC]" delay="0.3s" size="medium" />
      <Star className="top-28 left-[25%] text-[#B8D4E3]" delay="1.8s" size="small" />
      <Star className="top-48 right-[25%] text-[#FFD4BC]" delay="0.5s" size="small" />

      {/* Side Balloons */}
      <BalloonCluster side="left" />
      <BalloonCluster side="right" />

      {/* Bottom decorations */}
      <Cloud className="bottom-20 left-12 w-18 h-12 opacity-35" delay="1.5s" />
      <Cloud className="bottom-32 right-16 w-22 h-14 opacity-40" delay="2.5s" />
      
      {/* Additional stars at bottom */}
      <Star className="bottom-40 left-[18%] text-[#F8C8DC]" delay="0.8s" size="small" />
      <Star className="bottom-24 right-[22%] text-[#B8D4E3]" delay="1.5s" size="medium" />
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
        className="w-full h-full text-white drop-shadow-sm"
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
  const sizeClass = size === "small" ? "w-2.5 h-2.5" : size === "medium" ? "w-3.5 h-3.5" : "w-4 h-4";

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

// Balloon Cluster Component
function BalloonCluster({ side }: { side: "left" | "right" }) {
  const basePosition = side === "left" ? "left-2" : "right-2";
  const baseClass = `absolute ${basePosition}`;

  return (
    <div className={`${baseClass} top-1/3`}>
      {/* Balloon 1 - Pink */}
      <div
        className="absolute animate-float-balloon"
        style={{ animationDelay: "0s", [side]: "0px", top: "0px" }}
      >
        <BalloonSvg color="#F8C8DC" />
      </div>
      
      {/* Balloon 2 - Blue */}
      <div
        className="absolute animate-float-balloon"
        style={{ animationDelay: "0.5s", [side]: side === "left" ? "25px" : "-25px", top: "40px" }}
      >
        <BalloonSvg color="#B8D4E3" />
      </div>
      
      {/* Balloon 3 - Peach */}
      <div
        className="absolute animate-float-balloon"
        style={{ animationDelay: "1s", [side]: side === "left" ? "-10px" : "10px", top: "80px" }}
      >
        <BalloonSvg color="#FFD4BC" />
      </div>
    </div>
  );
}

// Balloon SVG
function BalloonSvg({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 40 60"
      className="w-10 h-14 drop-shadow-sm opacity-60"
    >
      <ellipse cx="20" cy="25" rx="15" ry="20" fill={color} />
      <path
        d="M20 45 L20 55"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <polygon points="20,45 17,50 23,50" fill={color} />
    </svg>
  );
}
