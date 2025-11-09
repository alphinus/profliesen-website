'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  featured?: boolean;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  categories: string[];
}

export default function ImageGallery({ images, categories }: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'Alle') return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {['Alle', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
              <p className="text-gray-300 text-sm">{image.category}</p>
            </div>

            {/* Featured Badge */}
            {image.featured && (
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}

            {/* Zoom Icon */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 p-2 rounded-full">
                <svg className="w-5 h-5 text-secondary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-secondary-600 text-lg">
            Keine Projekte in dieser Kategorie gefunden.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          image={filteredImages[selectedImageIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
