"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

// Pre-compute images array at module level
const IMAGES: GalleryImage[] = Array.from({ length: 21 }, (_, i) => ({
  src: `/images/${i + 1}.jpeg`,
  alt: `Bé Bắp ${i + 1}`,
}));

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const openCarousel = (index: number) => {
    setCurrentIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="gallery mb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-peach" />
          <svg className="w-5 h-5 text-peach" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-peach" />
        </div>
        <h2 className="font-serif text-[22px] text-warm-brown">Khoảnh khắc đáng yêu</h2>
      </div>

      {/* Featured Image Preview */}
      <div className="mb-4">
        <div 
          className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          onClick={() => openCarousel(currentIndex)}
        >
          <Image
            src={IMAGES[currentIndex].src}
            alt={IMAGES[currentIndex].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 480px) 100vw, 480px"
            priority
          />
          {/* Overlay with counter */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <p className="text-white font-serif text-[18px]">{IMAGES[currentIndex].alt}</p>
            <span className="text-white/80 text-[14px]">{currentIndex + 1} / {IMAGES.length}</span>
          </div>
          {/* Play icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {IMAGES.map((image: GalleryImage, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all ${
              index === currentIndex 
                ? "ring-2 ring-soft-pink ring-offset-2" 
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <button 
          onClick={() => openCarousel(0)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-peach/30 text-warm-brown text-[13px] font-medium hover:shadow-lg hover:border-peach/50 transition-all"
        >
          <svg className="w-4 h-4 text-peach" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Xem tất cả {IMAGES.length} ảnh
        </button>
      </div>

      {/* Full Screen Carousel Modal */}
      {isCarouselOpen && (
        <div 
          className="fixed inset-0 z-50 bg-warm-brown/95 flex flex-col"
          onClick={closeCarousel}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="font-serif text-[18px]">{IMAGES[currentIndex].alt}</span>
              <span className="text-white/60 text-[14px]">{currentIndex + 1} / {IMAGES.length}</span>
            </div>
            <button 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={closeCarousel}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative px-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <div 
              className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[currentIndex].src}
                alt={IMAGES[currentIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 bg-warm-brown/50">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
              {IMAGES.map((image: GalleryImage, index: number) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex 
                      ? "ring-2 ring-white" 
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
