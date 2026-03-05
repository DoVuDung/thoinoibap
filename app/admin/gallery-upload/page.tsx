"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export default function GalleryUploadPage() {
  const [index, setIndex] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [existingImages, setExistingImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [newIndexValue, setNewIndexValue] = useState("");
  const [deletingIndex, setDeletingIndex] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery/images');
        const data = await response.json();
        if (data.success) {
          setExistingImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [message]); // Refresh when upload completes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!index || !file) {
      setMessage("Vui lòng nhập số thứ tự và chọn ảnh!");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("index", index.toString());
      formData.append("title", title);

      // Use convert endpoint for DNG files, regular upload for others
      const isDng = file.name.toLowerCase().endsWith('.dng');
      const endpoint = isDng ? "/api/gallery/convert" : "/api/gallery/upload";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const convertMsg = result.converted ? " (DNG đã được chuyển sang JPEG)" : "";
        setMessage(`✅ Upload thành công${convertMsg}! Ảnh đã được lưu tại: ${result.path}`);
        // Reset form
        setIndex("");
        setTitle("");
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setMessage(`❌ Lỗi: ${result.error || "Upload thất bại"}`);
      }
    } catch (error) {
      setMessage("❌ Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };

  const handleRename = async (oldIndex: string) => {
    if (!newIndexValue || newIndexValue === oldIndex) {
      setEditingIndex(null);
      return;
    }
    try {
      const response = await fetch('/api/gallery/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldIndex, newIndex: newIndexValue }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ Đã đổi tên ảnh từ ${oldIndex} sang ${newIndexValue}`);
        // Refresh the list
        const refreshResponse = await fetch('/api/gallery/images');
        const data = await refreshResponse.json();
        if (data.success) {
          setExistingImages(data.images);
        }
      } else {
        setMessage(`❌ Lỗi: ${result.error || "Không thể đổi tên"}`);
      }
    } catch (error) {
      setMessage("❌ Lỗi kết nối. Vui lòng thử lại.");
    }
    setEditingIndex(null);
    setNewIndexValue("");
  };

  const startEditing = (currentIndex: string) => {
    setEditingIndex(currentIndex);
    setNewIndexValue(currentIndex);
  };

  const handleDelete = async (indexToDelete: string) => {
    console.log('Attempting to delete image with index:', indexToDelete);
    
    if (!indexToDelete) {
      setMessage("❌ Lỗi: Không xác định được số thứ tự ảnh");
      return;
    }
    
    if (!confirm(`Bạn có chắc muốn xóa ảnh số ${indexToDelete}?`)) {
      return;
    }
    
    setDeletingIndex(indexToDelete);
    try {
      const response = await fetch('/api/gallery/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: indexToDelete }),
      });
      
      console.log('Delete response status:', response.status);
      const result = await response.json();
      console.log('Delete response:', result);
      
      if (response.ok) {
        setMessage(`✅ Đã xóa ảnh số ${indexToDelete}`);
        // Refresh the list
        const refreshResponse = await fetch('/api/gallery/images');
        const data = await refreshResponse.json();
        if (data.success) {
          setExistingImages(data.images);
        }
      } else {
        setMessage(`❌ Lỗi: ${result.error || result.details || "Không thể xóa"}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage("❌ Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif text-cinereous mb-8 text-center">
          Upload Ảnh Gallery
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border-2 border-gold-leaf p-8 rounded-lg shadow-lg">
          {/* Image Index */}
          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
              Số thứ tự ảnh (1-50)
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={index}
              onChange={(e) => setIndex(e.target.value ? parseInt(e.target.value) : "")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-cinereous outline-none transition-colors text-lg"
              placeholder="Ví dụ: 22"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ảnh sẽ được lưu với tên: {index ? `${index}.jpeg` : "[số thứ tự].jpeg"}
            </p>
          </div>

          {/* Image Title */}
          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
              Tiêu đề ảnh (tùy chọn)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-cinereous outline-none transition-colors text-lg"
              placeholder="Ví dụ: Bé Bắp ăn bánh"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
              Chọn ảnh
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/dng,.dng"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-cinereous outline-none transition-colors"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Hỗ trợ: JPG, JPEG, PNG, WebP, DNG (RAW) (tối đa 50MB)
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-6">
              <label className="block text-sm uppercase tracking-wider text-gold-leaf mb-2">
                Xem trước
              </label>
              <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 bg-cinereous text-white font-serif text-lg uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-50"
          >
            {uploading ? "Đang upload..." : "Upload Ảnh"}
          </button>
        </form>

        {/* Existing Images List */}
        <div className="mt-10">
          <h2 className="text-2xl font-serif text-cinereous mb-6 text-center">
            Danh sách ảnh hiện có ({existingImages.length} ảnh) - Click STT để sửa
          </h2>
          
          {loadingImages ? (
            <div className="text-center py-8">
              <p className="text-clay">Đang tải danh sách ảnh...</p>
            </div>
          ) : existingImages.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border border-gold-leaf/30">
              <p className="text-clay">Chưa có ảnh nào</p>
            </div>
          ) : (
            <div className="bg-white border-2 border-gold-leaf rounded-lg shadow-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-cinereous text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-20">STT</th>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-24">Ảnh</th>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">Tiêu đề</th>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">Đường dẫn</th>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider w-20">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {existingImages.map((img) => {
                      const indexNum = img.src.match(/(\d+)\./)?.[1] || "";
                      const isEditing = editingIndex === indexNum;
                      return (
                        <tr key={img.id} className="hover:bg-parchment/50">
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={newIndexValue}
                                  onChange={(e) => setNewIndexValue(e.target.value)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleRename(indexNum);
                                    if (e.key === 'Escape') {
                                      setEditingIndex(null);
                                      setNewIndexValue("");
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleRename(indexNum)}
                                  className="text-green-600 hover:text-green-800 text-sm font-bold"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingIndex(null);
                                    setNewIndexValue("");
                                  }}
                                  className="text-red-600 hover:text-red-800 text-sm font-bold"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEditing(indexNum)}
                                className="text-cinereous font-medium hover:bg-gold-leaf/20 px-2 py-1 rounded transition-colors cursor-pointer"
                                title="Click để sửa số thứ tự"
                              >
                                {indexNum} ✏️
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative w-16 h-16 rounded overflow-hidden">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-clay">{img.alt}</td>
                          <td className="px-4 py-3 text-xs text-gray-500 font-mono">{img.src}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDelete(indexNum)}
                              disabled={deletingIndex === indexNum}
                              className="text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded hover:bg-red-100 transition-colors disabled:opacity-50"
                              title="Xóa ảnh này"
                            >
                              {deletingIndex === indexNum ? '...' : '🗑️'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-10 p-6 bg-parchment border-l-4 border-cinereous">
          <h4 className="font-serif text-cinereous mb-3">Hướng dẫn:</h4>
          <ul className="text-sm text-clay space-y-2 list-disc list-inside">
            <li><strong>Upload ảnh mới:</strong> Nhập số thứ tự, tiêu đề và chọn file ảnh</li>
            <li><strong>Sửa số thứ tự:</strong> Click vào số STT trong bảng, nhập số mới và nhấn ✓ hoặc Enter</li>
            <li><strong>Xóa ảnh:</strong> Click vào nút 🗑️ để xóa ảnh (có xác nhận)</li>
            <li>Nhấn ESC hoặc ✕ để hủy sửa</li>
            <li>Ảnh sẽ được lưu vào thư mục public/images/</li>
            <li>Sau khi upload/sửa/xóa, cần deploy lại để thay đổi có hiệu lực trên production</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
