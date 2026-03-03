interface DetailsGridProps {
  timeLabel?: string;
  timeValue?: string;
  locationLabel?: string;
  locationValue?: string;
  locationDetail?: string;
  mapsLink?: string;
}

export default function DetailsGrid({
  timeLabel = "Thời gian",
  timeValue = "11:30 Trưa — 11.03.2026",
  locationLabel = "Địa điểm",
  locationValue = "55 Khúc Hạo",
  locationDetail = "An Hải, Sơn Trà, Đà Nẵng",
  mapsLink = "https://maps.app.goo.gl/YourGoogleMapsLink",
}: DetailsGridProps) {
  return (
    <div className="details-grid grid grid-cols-1 gap-10 border-t border-[#ddd] pt-7">
      <div className="detail-item">
        <h3 className="text-[12px] uppercase tracking-[2px] mb-2 text-gold-leaf">
          {timeLabel}
        </h3>
        <p className="font-serif text-[24px] font-semibold text-cinereous">
          {timeValue}
        </p>
      </div>
      <div className="detail-item">
        <h3 className="text-[12px] uppercase tracking-[2px] mb-2 text-gold-leaf">
          {locationLabel}
        </h3>
        <p className="font-serif text-[24px] font-semibold text-cinereous">
          {locationValue}
        </p>
        <span className="text-[14px] italic">{locationDetail}</span>
      </div>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cinereous text-[11px] font-semibold no-underline border-b border-cinereous/50 inline-block mt-2"
      >
        BẢN ĐỒ DẪN ĐƯỜNG —&gt;
      </a>
    </div>
  );
}
