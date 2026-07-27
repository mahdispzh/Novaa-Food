"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { PlusIcon } from "@/src/shared/constants/icons/plus-icon";
import { DefaultButton, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BlogFormValues } from "./blog.schema";

interface Step2ContentProps {
  onNext: () => void;
  onPrev: () => void;
  errors: any;
  currentImage?: string | null;
}

export function Step2Content({
  onNext,
  onPrev,
  errors,
  currentImage,
}: Step2ContentProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useFormContext<BlogFormValues>();
  const [newKeyword, setNewKeyword] = useState("");
  const [newTag, setNewTag] = useState("");

  const keywords = watch("keywords") || [];
  const tags = watch("tags") || [];
  const selectedImage = watch("image") as File | null;

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null,
  );

  useEffect(() => {
    if (selectedImage instanceof File) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(currentImage || null);
    }
  }, [selectedImage, currentImage]);

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setValue("keywords", [...keywords, trimmed]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (item: string) => {
    setValue(
      "keywords",
      keywords.filter((k) => k !== item),
    );
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed]);
      setNewTag("");
    }
  };

  const removeTag = (item: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== item),
    );
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="mt-4 flex h-full flex-col justify-between px-6"
    >
      <div className="flex flex-col gap-4">
        {/* کلیدواژه‌ها */}
        <div>
          <div className="flex items-center justify-between">
            <Text text="کلیدواژه‌ها" size="md" weight="medium" />
            <button
              type="button"
              onClick={addKeyword}
              className="flex items-center gap-1 text-sm text-primary hover:opacity-80"
            >
              <PlusIcon size="md" color="text-primary" />
              <Text text="افزودن" size="sm" />
            </button>
          </div>

          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder="کلیدواژه را وارد کنید..."
              className="flex-1 rounded-sm border border-gray px-3 py-2 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
            />
          </div>

          {keywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeKeyword(item)}
                    className="text-gray-400 hover:text-danger"
                  >
                    <CloseIcon size="xs" />
                  </button>
                </span>
              ))}
            </div>
          )}
          {formErrors.keywords && (
            <Text
              text={`${formErrors.keywords.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* تگ‌ها */}
        <div>
          <div className="flex items-center justify-between">
            <Text text="تگ‌ها" size="md" weight="medium" />
            <button
              type="button"
              onClick={addTag}
              className="flex items-center gap-1 text-sm text-primary hover:opacity-80"
            >
              <PlusIcon size="md" color="text-primary" />
              <Text text="افزودن" size="sm" />
            </button>
          </div>

          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="تگ را وارد کنید..."
              className="flex-1 rounded-sm border border-gray px-3 py-2 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
            />
          </div>

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeTag(item)}
                    className="text-gray-400 hover:text-danger"
                  >
                    <CloseIcon size="xs" />
                  </button>
                </span>
              ))}
            </div>
          )}
          {formErrors.tags && (
            <Text
              text={`${formErrors.tags.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* زمان مطالعه */}
        <div>
          <Text text="زمان مطالعه (دقیقه)" size="md" weight="medium" />
          <input
            type="number"
            {...register("readTime")}
            placeholder="زمان مطالعه را وارد کنید"
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {formErrors.readTime && (
            <Text
              text={`${formErrors.readTime.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* عکس بلاگ */}
        <div>
          <Text text="عکس بلاگ" size="md" weight="medium" />
          <div className="mt-1 flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray bg-gray-50">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="پیش‌نمایش تصویر"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Text text="بدون عکس" size="sm" color="gray" />
              )}
            </div>

            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray px-3 py-3 text-center text-sm text-primary transition hover:bg-gray-50">
              <Text
                text={
                  selectedImage
                    ? selectedImage.name
                    : "برای وارد کردن تصویر کلیک کنید "
                }
                size="sm"
              />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setValue("image", file, { shouldValidate: true });
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mb-10 flex justify-between gap-2">
        <DefaultButton
          type="primary"
          style="outline"
          label="مرحله قبل"
          action={onPrev}
        />
        <DefaultButton
          type="primary"
          style="fill"
          label="مرحله بعد"
          action={onNext}
        />
      </div>
    </form>
  );
}
