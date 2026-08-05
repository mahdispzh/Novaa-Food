
export interface EventCardProps {
  title: string;
  description: string;
  weekday: string;      // مثلاً "پنجشنبه"
  day: string;           // مثلاً "۲۴"
  month: string;          // مثلاً "شهریور"
  timeRange: string;      // "از ساعت ۱۸:۰۰ تا ساعت ۲۰:۳۰"
  location: string;
  remainingTime: string;  // "۲۴:۳۶:۰۳" — از قبل فرمت‌شده، فقط نمایشیه
}