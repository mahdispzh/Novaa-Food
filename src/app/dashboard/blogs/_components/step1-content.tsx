"use client";

import { Text } from "@/src/shared/ui";
import { CustomSelect } from "@/src/shared/ui/custom-select/custom-select.ui";
import { useFormContext } from "react-hook-form";
import { BlogFormValues } from "./blog.schema";

interface Step1ContentProps {
  onNext: () => void;
  errors: any;
  isUsingNickname: boolean;
  onAuthorTypeChange: (value: boolean) => void;
  defaultAuthor: string;
}

// نقشه‌ی وضعیت‌ها با رنگ‌بندی (برای دکمه‌ها)
const statusMap: Record<number, { label: string; color: string }> = {
  0: { label: "پیش‌نویس", color: "bg-gray-200 text-gray-700" },
  1: { label: "منتشر شده", color: "bg-green-100 text-green-700" },
  2: { label: "زمان بندی شده", color: "bg-blue-100 text-blue-700" },
  3: { label: "منتشر نشده", color: "bg-red-100 text-red-700" },
};

// گزینه‌های انتخاب نوع نویسنده
const authorTypeOptions = [
  { label: "نام پیش فرض", value: "default" },
  { label: "وارد کردن نام", value: "nickname" },
];

export function Step1Content({
  onNext,
  errors,
  isUsingNickname,
  onAuthorTypeChange,
  defaultAuthor,
}: Step1ContentProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useFormContext<BlogFormValues>();

  const status = watch("status") || 0;
  const showPublishAt = status === 2;

  // ✅ هندلر تغییر نوع نویسنده با CustomSelect
  const handleAuthorTypeChange = (value: string | number) => {
    const boolValue = value === "nickname";
    onAuthorTypeChange(boolValue);
    if (!boolValue) {
      setValue("author", defaultAuthor);
    } else {
      setValue("author", "");
    }
  };

  // ✅ هندلر تغییر وضعیت با دکمه
  const handleStatusChange = (value: number) => {
    setValue("status", value);
    if (value !== 2) {
      setValue("publishAt", "");
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
      <div className="flex flex-col gap-3">
        {/* عنوان بلاگ */}
        <div>
          <Text text="عنوان بلاگ" size="md" weight="medium" />
          <input
            type="text"
            {...register("title")}
            placeholder="عنوان بلاگ را وارد کنید"
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {formErrors.title && (
            <Text
              text={`${formErrors.title.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* ✅ نام نویسنده با CustomSelect */}
        <div>
          <Text text="نام نویسنده" size="md" weight="medium" />
          <div className="mt-1 flex gap-2">
            <div className="w-[180px]">
              <CustomSelect
                value={isUsingNickname ? "nickname" : "default"}
                onChange={handleAuthorTypeChange}
                options={authorTypeOptions}
                className="w-1/3"
                placeholder="انتخاب کنید"
              />
            </div>

            <input
              type="text"
              {...register("author")}
              placeholder={
                isUsingNickname ? "نام مستعار را وارد کنید" : defaultAuthor
              }
              disabled={!isUsingNickname}
              className={`text-regular flex-1 rounded-sm border px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none ${
                !isUsingNickname
                  ? "cursor-not-allowed border-gray bg-gray-100 text-gray"
                  : "border-gray bg-white"
              }`}
            />
          </div>
          {formErrors.author && (
            <Text
              text={`${formErrors.author.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* خلاصه بلاگ */}
        <div>
          <Text text="خلاصه بلاگ" size="md" weight="medium" />
          <textarea
            {...register("summary")}
            placeholder="خلاصه بلاگ را وارد کنید"
            rows={3}
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
          {formErrors.summary && (
            <Text
              text={`${formErrors.summary.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* ✅ وضعیت انتشار - دکمه‌ها (بدون تغییر) */}
        <div>
          <Text text="وضعیت انتشار" size="md" weight="medium" />
          <div className="mt-2 flex flex-wrap gap-3">
            {Object.entries(statusMap).map(([key, { label, color }]) => {
              const value = Number(key);
              const isSelected = status === value;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleStatusChange(value)}
                  className={`cursor-pointer rounded-sm px-4 py-2 font-medium text-sm transition-all ${
                    color
                  } ${
                    isSelected
                      ? `shadow-md ring-2 ring-${color} ring-offset-2`
                      : "hover:scale-105 hover:shadow-sm"
                  }`}
                >
                  <Text text={label} size="sm" weight="regular" />
                </button>
              );
            })}
          </div>
          {formErrors.status && (
            <Text
              text={`${formErrors.status.message}`}
              size="sm"
              color="danger"
            />
          )}
        </div>

        {/* ✅ زمان انتشار (فقط در صورت انتخاب زمان‌بندی شده) */}
        {showPublishAt && (
          <div>
            <Text text="زمان انتشار" size="md" weight="medium" />
            <input
              type="datetime-local"
              {...register("publishAt")}
              className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-2.5 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
            />
            {formErrors.publishAt && (
              <Text
                text={`${formErrors.publishAt.message}`}
                size="sm"
                color="danger"
              />
            )}
          </div>
        )}
      </div>

      <div className="mb-10">
        <button
          type="submit"
          className="hover:bg-primary-dark flex w-full cursor-pointer items-center justify-center rounded-sm bg-secondary py-3 text-white"
        >
          <Text text="مرحله بعد" size="lg" weight="medium" color="white" />
        </button>
      </div>
    </form>
  );
}
