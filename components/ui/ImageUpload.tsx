'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  onImagesChange,
  maxFiles = 5,
  maxSize = 10
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit number of files
    const limitedFiles = acceptedFiles.slice(0, maxFiles - files.length);

    // Filter by size
    const validFiles = limitedFiles.filter(file => {
      const sizeMB = file.size / 1024 / 1024;
      return sizeMB <= maxSize;
    });

    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onImagesChange(newFiles);

      // Create previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [files, maxFiles, maxSize, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles,
    maxSize: maxSize * 1024 * 1024,
  });

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onImagesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-secondary-300 hover:border-primary-400 hover:bg-secondary-50'
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-12 h-12 text-secondary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          {isDragActive ? (
            <p className="text-primary-600 font-semibold">
              Bilder hier ablegen...
            </p>
          ) : (
            <>
              <p className="text-secondary-700 font-medium">
                Bilder hierher ziehen oder klicken zum Auswählen
              </p>
              <p className="text-sm text-secondary-500">
                Max. {maxFiles} Bilder, je bis {maxSize}MB (PNG, JPG, WEBP)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={preview}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Bild entfernen"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* File info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 rounded-b-lg">
                <p className="truncate">{files[index]?.name}</p>
                <p className="text-gray-300">
                  {(files[index]?.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload info */}
      {files.length > 0 && (
        <p className="text-sm text-secondary-600">
          {files.length} von {maxFiles} Bildern ausgewählt
        </p>
      )}
    </div>
  );
}
