import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalaliday);
dayjs.locale("fa");

const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];

function toPersianDigits(input: string | number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
}

export function transformEventToCard(event: any) {
  const start = dayjs(event.starts_at).calendar("jalali");
  const end = dayjs(event.ends_at).calendar("jalali");

  return {
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    weekday: WEEKDAYS[dayjs(event.starts_at).day()],
    day: toPersianDigits(start.format("D")),
    month: start.format("MMMM"),
    timeRange: `از ساعت ${toPersianDigits(start.format("HH:mm"))}\n تا ساعت ${toPersianDigits(end.format("HH:mm"))}`,
    location:  event.address || "",
    remainingTime: toPersianDigits(getRemainingTime(event.starts_at)),
  };
}

function getRemainingTime(startsAt: Date) {
  const diffMs = new Date(startsAt).getTime() - Date.now();
  if (diffMs <= 0) return "00:00:00";

  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return [hours, minutes, seconds].map((n) => String(n).padStart(2, "0")).join(":");
}