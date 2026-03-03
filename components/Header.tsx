interface HeaderProps {
  dateLabel?: string;
  title?: string;
  fullName?: string;
  nickname?: string;
}

export default function Header({
  dateLabel = "Mười một tháng ba, Hai ngàn hai sáu",
  title = "Kỷ niệm Thôi Nôi",
  fullName = "Đỗ Trần Minh Anh",
  nickname = "Bé Bắp",
}: HeaderProps) {
  return (
    <header className="border-b border-gold-leaf/50 pb-7 mb-12">
      <span className="date-top block text-[11px] tracking-[5px] uppercase text-gold-leaf font-light">
        {dateLabel}
      </span>
      <h1 className="font-serif font-light text-[52px] leading-none mt-5 mb-5 text-cinereous">
        {title}
      </h1>
      <div className="flex justify-between items-end">
        <span className="text-[14px] font-semibold uppercase tracking-[2px]">
          {fullName}
        </span>
        <span className="font-serif italic text-[24px] text-gold-leaf">
          {nickname}
        </span>
      </div>
    </header>
  );
}
