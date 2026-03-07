interface ContentSectionProps {
  label?: string;
  message?: string;
}

export default function ContentSection({
  label = "Kính mờii",
  message = "Gia đình thân mờii cô chú và các bạn đến tham dự tiệc thôi nôi của bé Bắp. Đây là dịp đặc biệt đánh dấu hành trình một năm đầu đờii đầy yêu thương và niềm vui của con. Sự hiện diện của quý vị sẽ là món quà ý nghĩa nhất dành cho bé!",
}: ContentSectionProps) {
  return (
    <div className="content-block mb-12 relative">
      {/* Decorative element */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-soft-pink" />
          <svg className="w-5 h-5 text-soft-pink" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-soft-pink" />
        </div>
      </div>

      {/* Label */}
      <span className="block text-[11px] uppercase tracking-[4px] text-baby-blue font-medium mb-4 text-center">
        {label}
      </span>

      {/* Message */}
      <div className="relative">
        {/* Quote mark */}
        <span className="absolute -top-2 -left-2 text-[40px] text-peach/30 font-serif leading-none">
          &ldquo;
        </span>
        
        <p className="font-serif text-[18px] leading-[1.8] text-warm-brown text-center px-4">
          {message}
        </p>
        
        {/* Quote mark */}
        <span className="absolute -bottom-6 -right-2 text-[40px] text-peach/30 font-serif leading-none rotate-180">
          &ldquo;
        </span>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8 gap-2">
        <span className="text-soft-pink text-lg">✦</span>
        <span className="text-baby-blue text-lg">✦</span>
        <span className="text-peach text-lg">✦</span>
      </div>
    </div>
  );
}
