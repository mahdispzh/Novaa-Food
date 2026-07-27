export type SelectOption<T = string | number> = {
  label: string;
  value: T;
  className?: string;
};

export type Props<T = string | number> = {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  optionClassName?: string;
  disabled?: boolean;
  // اگه true باشه، یه اینپوت جستجو بالای لیست گزینه‌ها نمایش داده می‌شه.
  // پیش‌فرض false — یعنی رفتار فعلی کامپوننت بدون تغییر باقی می‌مونه
  // مگر جایی که صراحتاً بهش نیاز باشه (مثلاً لیست‌های بلند مثل استان/شهر)
  searchable?: boolean;
  searchPlaceholder?: string;
};