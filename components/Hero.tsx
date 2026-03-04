interface HeroProps {
  overlayText?: string;
  imageUrl?: string;
}

export default function Hero({
  overlayText = "Mừng con\nTròn một tuổi",
  imageUrl = "images/12.jpeg",
}: HeroProps) {
  return (
    <section className="hero relative mb-20">
      <div className="hero-frame w-[90%] h-[450px] bg-[#e5e2d9] p-[15px] rounded-sm relative z-10">
        <img
          src={imageUrl}
          alt="Minh Anh"
          className="hero-img w-full h-full object-cover sepia-[15%] contrast-[105%]"
        />
      </div>
      <div
        className="hero-overlay-text absolute bottom-[-30px] right-[-10px] z-20 bg-cinereous text-white p-7 font-serif -rotate-[2deg] shadow-[15px_15px_40px_rgba(0,0,0,0.1)] whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: overlayText }}
      />
    </section>
  );
}
