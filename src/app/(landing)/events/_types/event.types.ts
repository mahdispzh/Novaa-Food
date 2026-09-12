export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  day: string; // e.g. "۰۹" — Persian numeral, shown in the date badge
  month: string; // e.g. "شهریور" — shown under the day in the date badge
  timeRange: string; // e.g. "از ساعت ۱۸:۰۰ الی ۲۱:۰۰"
  location: string; // e.g. "شعبه اصلی، خیابان ولیعصر شماره ۲۴"
  isSaved: boolean;
}
