interface GalleryProps {
  images?: Array<{
    id: string;
    src: string;
    alt: string;
    span: number; // 6 = full width, 3 = half width
    height: number;
    marginTop?: number;
  }>;
}

export default function Gallery({
  images = [
    {
      id: "p-1",
      src: "/images/gallery-1.jpg",
      alt: "Bắp",
      span: 6,
      height: 300,
    },
    {
      id: "p-2",
      src: "/images/gallery-2.jpg",
      alt: "Bắp",
      span: 3,
      height: 180,
      marginTop: 10,
    },
    {
      id: "p-3",
      src: "/images/gallery-3.jpg",
      alt: "Bắp",
      span: 3,
      height: 180,
      marginTop: -20,
    },
  ],
}: GalleryProps) {
  return (
    <div className="gallery grid grid-cols-6 gap-2 my-15">
      {images.map((img) => (
        <div
          key={img.id}
          className={`photo col-span-${img.span} bg-white p-1 shadow-[0_5px_15px_rgba(0,0,0,0.03)]`}
          style={{
            marginTop: img.marginTop ? `${img.marginTop}px` : undefined,
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            style={{ height: `${img.height}px` }}
          />
        </div>
      ))}
    </div>
  );
}
