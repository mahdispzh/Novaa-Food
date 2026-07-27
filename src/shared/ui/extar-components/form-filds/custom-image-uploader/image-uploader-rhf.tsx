"use client";

import { Control, FieldValues, Path, useController } from "react-hook-form";

interface ImageUploaderRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  maxImages?: number;
}

export function ImageUploaderRHF<T extends FieldValues>({
  control,
  name,
  maxImages = 10,
}: ImageUploaderRHFProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newFiles = [...(value || []), ...fileArray];
      onChange(newFiles.slice(0, maxImages));
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...(value || [])];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const getImageSrc = (item: File | string) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    return item;
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="flex flex-wrap gap-2">
        {(value || []).map((item: File | string, index: number) => (
          <div key={index} className="relative">
            <img
              src={getImageSrc(item)}
              alt={`تصویر ${index + 1}`}
              className="h-20 w-20 rounded object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {(value || []).length === 0 && (
        <p className="text-sm text-gray-500">هنوز تصویری انتخاب نشده است</p>
      )}
    </div>
  );
}
