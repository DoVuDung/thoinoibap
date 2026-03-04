"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span?: number;
  height?: number;
  marginTop?: number;
}

interface GalleryProps {
  images?: GalleryImage[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultImages: GalleryImage[] = [
    {
      id: "p-1",
      src: "/images/1.jpeg",
      alt: "Ngày sinh bé Bắp",
    },
    {
      id: "p-2",
      src: "/images/2.jpeg",
      alt: "Bắp sinh non 2 tháng nên ba mẹ phải thay nhau ấp em trong bệnh viên, lúc này nhẹ cân 1.5 kg",
    },
    {
      id: "p-3",
      src: "/images/3.jpeg",
      alt: "Bắp sau một tháng về nhà ngoại, đủ tiêu chuẩn ra viện, chiến binh nhí, cai thở oxy nhanh nhất phòng, khóc to nhất phòng",
    },
    {
      id: "p-4",
      src: "/images/4.jpeg",
      alt: "Khoảnh khắc đáng yêu",
    },
    {
      id: "p-5",
      src: "/images/5.jpeg",
      alt: "Bé Bắp kháu khỉnh",
    },
    {
      id: "p-6",
      src: "/images/6.jpeg",
      alt: "Gia đình nhỏ",
    },
    {
      id: "p-7",
      src: "/images/7.jpeg",
      alt: "Lần đầu đi cắt tóc",
    },
    {
      id: "p-8",
      src: "/images/8.jpeg",
      alt: "Bé tròn mắt",
    },
    {
      id: "p-9",
      src: "/images/9.jpeg",
      alt: "Bắp làm IT",
    },
    {
      id: "p-10",
      src: "/images/10.jpeg",
      alt: "Nụ cười thiên thần",
    },
    {
      id: "p-11",
      src: "/images/11.jpeg",
      alt: "Đáng yêu quá",
    },
    {
      id: "p-12",
      src: "/images/12.jpeg",
      alt: "Bắp chơi tết",
    },
    {
      id: "p-13",
      src: "/images/13.jpeg",
      alt: "Bắp lần đầu đươc ba cho ăn",
    },
    {
      id: "p-14",
      src: "/images/14.jpeg",
      alt: "Bé Bắp của mẹ",
    },
    {
      id: "p-15",
      src: "/images/15.jpeg",
      alt: "Bắp được mẹ mua ghế ô tô",
    },
    {
      id: "p-16",
      src: "/images/16.jpeg",
      alt: "Bắp lần đầu đi ăn sinh nhật bà Ngoại",
    },
    {
      id: "p-17",
      src: "/images/17.jpeg",
      alt: "Khoảnh khắc ngọt ngào",
    },
    {
      id: "p-18",
      src: "/images/18.jpeg",
      alt: "Bé yêu trong vòng tay",
    },
    {
      id: "p-19",
      src: "/images/19.jpeg",
      alt: "Được chụp hình với quần áo mới Chú Bình cô Hằng tặng",
    },
    {
      id: "p-20",
      src: "/images/20.jpeg",
      alt: "Nụ cười tỏa nắng",
    },
    {
      id: "p-21",
      src: "/images/21.jpeg",
      alt: "Thiên thần nhỏ của gia đình",
    },
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gallery my-15">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {galleryImages.map((img, index) => (
          <button
            key={img.id}
            onClick={() => openModal(index)}
            className={`thumbnail cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              index === currentIndex ? "ring-4 ring-pink-400" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={150}
              height={128}
              className="w-full h-32 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Carousel */}
      <div className="carousel relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="relative h-[500px] flex items-center justify-center bg-gray-50">
          <Image
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
            width={800}
            height={500}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Image Caption */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
          <p className="text-center text-gray-700 font-medium italic">
            {galleryImages[currentIndex].alt}
          </p>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative flex flex-col items-center justify-center max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close modal"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Full-size Image */}
            <div className="flex items-center justify-center max-h-[85vh]">
              <Image
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </div>

            {/* Caption in Modal */}
            <p className="text-white text-center mt-6 text-xl font-medium italic">
              {galleryImages[currentIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
