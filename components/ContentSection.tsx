interface ContentSectionProps {
  label?: string;
  message?: string;
}

export default function ContentSection({
  label = "Gửi đến bạn quý",
  message = "Hành trình một năm đầu đời của bé Bắp là những chuỗi ngày rực rỡ và ấm áp. Gia đình thân mời bạn đến dự bữa cơm thân mật tại tư gia. Thôi nôi là một trong những khoảnh khắc quan trọng nhất của một đời người, đánh giá hành trình nhỏ, đáng yêu nhất, và bằng tất cả tình yêu thương ba mẹ ông bà dành cho Bắp",
}: ContentSectionProps) {
  return (
    <div className="content-block mb-15">
      <span className="section-label block text-[10px] uppercase tracking-[3px] text-gold-leaf mb-4">
        {label}
      </span>
      <p className="font-serif text-[21px] leading-[1.5] text-[#333]">
        {message}
      </p>
    </div>
  );
}
