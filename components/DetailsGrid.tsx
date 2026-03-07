interface DetailsGridProps {
  timeLabel?: string;
  timeValue?: string;
  timeSubvalue?: string;
  locationLabel?: string;
  locationValue?: string;
  locationDetail?: string;
  mapsLink?: string;
}

export default function DetailsGrid({
  timeLabel = "Thờii gian",
  timeValue = "17:00",
  timeSubvalue = "Chủ nhật, 15.03.2025",
  locationLabel = "Địa điểm",
  locationValue = "55 Khúc Hạo",
  locationDetail = "An Hải, Sơn Trà, Đà Nẵng",
  mapsLink = "https://maps.app.goo.gl/YourGoogleMapsLink",
}: DetailsGridProps) {
  return (
    <div className="details-grid mb-12">
      {/* Section title */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-[24px] text-warm-brown mb-2">Tiệc Thôi Nôi</h2>
        <div className="flex justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-soft-pink" />
          <span className="w-2 h-2 rounded-full bg-baby-blue" />
          <span className="w-2 h-2 rounded-full bg-peach" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5">
        {/* Time Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-baby-blue/20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-baby-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-baby-blue/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-baby-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[2px] text-warm-brown/60 mb-1">
                {timeLabel}
              </h3>
              <p className="font-serif text-[32px] text-warm-brown leading-none mb-1">
                {timeValue}
              </p>
              <p className="text-[14px] text-warm-brown/80">
                {timeSubvalue}
              </p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-soft-pink/20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-soft-pink/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-soft-pink/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-soft-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-[11px] uppercase tracking-[2px] text-warm-brown/60 mb-1">
                {locationLabel}
              </h3>
              <p className="font-serif text-[24px] text-warm-brown leading-tight mb-1">
                {locationValue}
              </p>
              <p className="text-[14px] text-warm-brown/80 mb-3">
                {locationDetail}
              </p>
              
              {/* Maps link */}
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-baby-blue hover:text-warm-brown transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.806-.984A11.962 11.962 0 0115 6.618V17.382z" />
                </svg>
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-6 text-center">
        <p className="text-[12px] text-warm-brown/60 italic">
          Mong cô chú xác nhận tham dự trước ngày 11/03 để gia đình chuẩn bị tiệc chu đáo nhất!
        </p>
      </div>
    </div>
  );
}
