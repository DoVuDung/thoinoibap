"use client";

import { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface WishUploadProps {
  guestName: string;
  onComplete: () => void;
}

interface UploadedImage {
  file: File;
  preview: string;
}

export default function WishUpload({ guestName, onComplete }: WishUploadProps) {
  const [wishText, setWishText] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push({
            file,
            preview: event.target?.result as string,
          });
          processedCount++;
          if (processedCount === files.length) {
            setUploadedImages((prev) => [...prev, ...newImages].slice(0, 10));
          }
        };
        reader.readAsDataURL(file);
      } else {
        processedCount++;
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToStorage = async (): Promise<string[]> => {
    if (uploadedImages.length === 0) return [];

    const imageUrls: string[] = [];

    for (const image of uploadedImages) {
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("folder", "wishes");

      try {
        const response = await fetch("/api/wishes/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        imageUrls.push(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return imageUrls;
  };

  const handleSubmit = async () => {
    if (!wishText.trim() && uploadedImages.length === 0) {
      alert("Vui lòng viết lờii chúc hoặc tải lên ít nhất một hình ảnh!");
      return;
    }

    setIsUploading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImagesToStorage();

      // Save wish to Firestore
      await addDoc(collection(db, "wishes"), {
        guestName,
        wishText: wishText.trim(),
        images: imageUrls,
        createdAt: new Date().toISOString(),
        likes: 0,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error saving wish:", error);
      alert("Có lỗi xảy ra khi lưu lờii chúc. Vui lòng thử lại!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (isSubmitted) {
    return (
      <section className="wish-upload mt-12 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-soft-pink/20 text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-soft-pink to-peach flex items-center justify-center">
            <span className="text-4xl">💝</span>
          </div>
          <h2 className="font-serif text-[24px] text-warm-brown mb-3">
            Cảm ơn lờii chúc của bạn!
          </h2>
          <p className="text-warm-brown/70 mb-6">
            Bé Bắp và gia đình rất trân trọng tấm lòng của {guestName}.
            Những khoảnh khắc đáng yêu sẽ được lưu giữ mãi mãi!
          </p>
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-soft-pink to-peach text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Về trang chủ
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="wish-upload mt-12 mb-16">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-peach" />
          <svg className="w-5 h-5 text-peach" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-peach" />
        </div>
        <h2 className="font-serif text-[22px] text-warm-brown">Gửi lờii chúc đến bé Bắp</h2>
        <p className="text-warm-brown/60 text-[13px] mt-1">
          Chia sẻ những lờii yêu thương và khoảnh khắc đáng nhớ
        </p>
      </div>

      {/* Facebook-style Post Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-baby-blue/20 overflow-hidden max-w-md mx-auto">
        {/* Card Header */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-soft-pink to-peach flex items-center justify-center text-white font-serif text-xl shadow-md">
            {guestName.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium text-warm-brown">{guestName}</p>
            <p className="text-xs text-warm-brown/50">Đang viết lờii chúc...</p>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="p-4">
          <textarea
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            placeholder={`${guestName} ơi, hãy viết lờii chúc cho bé Bắp nhé...`}
            className="w-full min-h-[100px] border-none resize-none outline-none text-[16px] text-warm-brown placeholder:text-warm-brown/40"
            maxLength={1000}
          />
          <p className="text-right text-[11px] text-warm-brown/40 mt-1">
            {wishText.length}/1000
          </p>
        </div>

        {/* Image Preview Grid */}
        {uploadedImages.length > 0 && (
          <div className="px-4 pb-4">
            <div
              className={`grid gap-2 ${
                uploadedImages.length === 1
                  ? "grid-cols-1"
                  : uploadedImages.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                >
                  <Image
                    src={image.preview}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Photo Button */}
        <div className="px-4 py-3 border-t border-gray-100">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadedImages.length >= 10}
            className="flex items-center gap-2 text-baby-blue hover:text-warm-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-10 h-10 rounded-full bg-baby-blue/10 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">
              {uploadedImages.length > 0
                ? `Thêm ảnh (${uploadedImages.length}/10)`
                : "Thêm ảnh"}
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <button
            onClick={handleSubmit}
            disabled={isUploading || (!wishText.trim() && uploadedImages.length === 0)}
            className="w-full py-3.5 bg-gradient-to-r from-soft-pink to-peach text-white rounded-xl font-medium hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Gửi lờii chúc</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            disabled={isUploading}
            className="w-full py-3 text-warm-brown/60 hover:text-warm-brown transition-colors text-[13px]"
          >
            Bỏ qua bước này
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-white/50 rounded-xl border border-peach/20 max-w-md mx-auto">
        <p className="text-[12px] text-warm-brown/60 text-center">
          <span className="font-medium">💡 Gợi ý:</span> Bạn có thể tải lên tối đa 10 hình ảnh.
          Những khoảnh khắc đáng yêu sẽ được trân trọng lưu giữ!
        </p>
      </div>
    </section>
  );
}
