interface HeaderProps {
  dateLabel?: string;
  title?: string;
  subtitle?: string;
  fullName?: string;
  nickname?: string;
}

export default function Header({
  dateLabel = "Chủ nhật, 15 tháng 3, 2025",
  title = "MINH ANH - BẮP",
  subtitle = "tròn một tuổi",
  fullName = "Đỗ Trần Minh Anh",
  nickname = "Bé Bắp",
}: HeaderProps) {
  return (
    <header className="text-center mb-12 relative">
      {/* Decorative clouds */}
      <div className="absolute -top-4 left-0 w-16 h-10 opacity-40">
        <svg viewBox="0 0 100 60" fill="currentColor" className="w-full h-full text-white">
          <path d="M25,40 Q15,40 15,30 Q15,15 30,15 Q35,5 50,5 Q65,5 70,15 Q85,15 85,30 Q85,40 75,40 Z" />
        </svg>
      </div>
      <div className="absolute -top-2 right-0 w-14 h-9 opacity-30">
        <svg viewBox="0 0 100 60" fill="currentColor" className="w-full h-full text-white">
          <path d="M25,40 Q15,40 15,30 Q15,15 30,15 Q35,5 50,5 Q65,5 70,15 Q85,15 85,30 Q85,40 75,40 Z" />
        </svg>
      </div>

      {/* Date label */}
      <span className="block text-[10px] tracking-[4px] uppercase text-warm-brown/70 font-light mb-4">
        {dateLabel}
      </span>

      {/* Main title */}
      <div className="relative inline-block">
        <h1 className="font-serif font-light text-[36px] leading-tight text-warm-brown tracking-wide">
          {title}
        </h1>
        {/* Script subtitle */}
        <p 
          className="font-serif italic text-[28px] text-soft-pink mt-1"
          style={{ fontFamily: "'Cormorant Garamond', cursive" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Decorative stars */}
      <div className="flex justify-center gap-3 mt-4">
        <svg className="w-3 h-3 text-soft-pink animate-twinkle" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg className="w-4 h-4 text-baby-blue animate-twinkle" style={{ animationDelay: "0.3s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg className="w-3 h-3 text-peach animate-twinkle" style={{ animationDelay: "0.6s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Baby name */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-[13px] font-medium uppercase tracking-[2px] text-warm-brown">
          {fullName}
        </span>
        <span className="text-soft-pink">|</span>
        <span className="font-serif italic text-[20px] text-baby-blue">
          {nickname}
        </span>
      </div>
    </header>
  );
}
