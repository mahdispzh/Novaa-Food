# مستند دیتابیس Landing

این سند ساختار پاک‌سازی‌شده و نهایی دیتابیس بخش Landing نووا فود را توضیح می‌دهد. جداول احراز هویت `users`، `auth_sessions` و `otp_codes` تغییر ساختاری نکرده‌اند. تنها کلید خارجی مدل‌های جدید به جدول `users` متصل شده است.

## راه‌اندازی

```powershell
pnpm exec prisma migrate deploy
pnpm exec prisma db execute --file prisma/seed-landing.sql
pnpm exec prisma generate
```

فایل `seed-landing.sql` تکرارپذیر است و اجرای دوباره آن داده تکراری تولید نمی‌کند. این فایل هیچ رکوردی در جداول کاربر، نشست یا OTP ایجاد، ویرایش یا حذف نمی‌کند.

## سیاست شناسه و زمان

- تمام جداول دامنه Landing شناسه عددی خودکار `autoincrement` دارند.
- `created_at` هنگام ایجاد به‌صورت خودکار مقداردهی می‌شود.
- `updated_at` توسط Prisma به‌صورت خودکار به‌روزرسانی می‌شود.
- تمام timestampهای اصلی با `TIMESTAMPTZ(6)` ذخیره می‌شوند.
- زمان باز و بسته شدن رستوران با نوع `TIME` ذخیره می‌شود.

## حذف منطقی و Cascade

رکوردهای محتوایی با مقداردهی `deleted_at` حذف منطقی می‌شوند و APIهای عمومی فقط رکوردهای `deleted_at = NULL` را نمایش می‌دهند. در حذف منطقی، رکورد برای بازیابی و گزارش‌گیری در دیتابیس باقی می‌ماند.

کلیدهای خارجی وابسته دارای `ON DELETE CASCADE` هستند تا اگر مدیر دیتابیس عمداً یک حذف فیزیکی انجام داد، رکورد یتیم باقی نماند. روابط اختیاری مانند رستوران رویداد و کاربر پروفایل بلاگر از `SET NULL` استفاده می‌کنند.

## جداول رستوران

| جدول | کاربرد |
| --- | --- |
| `restaurants` | اطلاعات اصلی، مختصات، تماس، امتیاز تجمیعی و وضعیت رستوران |
| `restaurant_categories` | دسته‌بندی سلسله‌مراتبی با `parent_id` |
| `restaurant_category_links` | رابطه چندبه‌چند رستوران و دسته‌بندی |
| `restaurant_amenities` | امکانات قابل استفاده مجدد |
| `restaurant_amenity_links` | رابطه چندبه‌چند رستوران و امکانات |
| `restaurant_hours` | ساعات کاری هر روز؛ `weekday` بین ۰ تا ۶ است |
| `restaurant_images` | گالری مرتب‌شونده |
| `restaurant_menu_items` | آیتم‌های منو و سفارش پیشنهادی |
| `restaurant_reviews` | امتیاز، دیدگاه و پاسخ تو‌در‌تو |
| `saved_restaurants` | رستوران‌های ذخیره‌شده کاربران |

امتیاز در `restaurant_reviews.rating` باید بین ۱ تا ۵ باشد و API آن را کنترل می‌کند. دیدگاه جدید با `status = 0` در انتظار تأیید ساخته می‌شود و فقط دیدگاه دارای `status = 1` عمومی است.

## جداول رویداد

| جدول | کاربرد |
| --- | --- |
| `events` | زمان شروع/پایان، محل، ظرفیت، مهلت ثبت‌نام و رستوران میزبان |
| `event_attendees` | ثبت‌نام یکتای هر کاربر در هر رویداد |

وضعیت رویداد فعال در API عمومی `status = 1` است. لغو ثبت‌نام به‌صورت soft delete و با `status = 2` انجام می‌شود.

## جداول بلاگر

| جدول | کاربرد |
| --- | --- |
| `blogger_profiles` | پروفایل عمومی و اتصال اختیاری به یک کاربر |
| `blogger_follows` | دنبال‌کردن یکتای بلاگر توسط کاربر |
| `blogger_social_links` | لینک شبکه‌های اجتماعی بر اساس platform |
| `blogger_videos` | ویدئو، thumbnail و تعداد بازدید |
| `blogger_recommendations` | پیشنهاد یکتای رستوران توسط بلاگر |

## سطوح دسترسی API

- مسیرهای `/api/public/*`: بدون نیاز به ورود و فقط خواندنی.
- نقش `1`: کاربر عادی.
- نقش `2`: مدیر.
- مسیرهای CRUD مدیریتی با `withAuth(..., [2])` محافظت می‌شوند.
- ذخیره رستوران، دیدگاه، ثبت‌نام رویداد و دنبال‌کردن بلاگر با `withAuth(..., [1, 2])` محافظت می‌شوند.

### APIهای عمومی

- `GET /api/public/landing`
- `GET /api/public/restaurants`
- `GET /api/public/restaurants/:slug`
- `GET /api/public/restaurant-categories`
- `GET /api/public/events`
- `GET /api/public/events/:slug`
- `GET /api/public/bloggers`
- `GET /api/public/bloggers/:bloggerId`

### APIهای کاربر

- `GET|POST /api/protected/saved-restaurants`
- `GET|POST /api/protected/restaurant-reviews`
- `DELETE /api/protected/restaurant-reviews/:reviewId`
- `POST|DELETE /api/protected/events/:eventId/registration`
- `POST /api/protected/bloggers/:bloggerId/follow`

### APIهای مدیر

- `GET|POST /api/protected/restaurants`
- `GET|PUT|DELETE /api/protected/restaurants/:restaurantId`
- `GET|POST /api/protected/restaurant-categories`
- `PUT|DELETE /api/protected/restaurant-categories/:categoryId`
- `GET|POST /api/protected/events`
- `PUT|DELETE /api/protected/events/:eventId`
- `GET|POST /api/protected/bloggers`
- `PUT|DELETE /api/protected/bloggers/:bloggerId`

## داده آزمایشی

Seed شامل ۴ دسته‌بندی، ۵ امکان، ۵ رستوران در شیراز، ساعات کاری، چند آیتم منو، ۳ رویداد آینده، ۳ بلاگر، لینک‌های اجتماعی، ویدئو و پیشنهاد رستوران است. تصاویر از assetهای موجود در `public/images/bloggers` استفاده می‌کنند.

برای پاک‌سازی فقط داده آزمایشی Landing، به‌جای حذف فیزیکی بهتر است `deleted_at` رکوردهای اصلی مقداردهی شود. اجرای مجدد seed رکوردهای دارای slug/username یکسان را فعال و بازیابی می‌کند.
