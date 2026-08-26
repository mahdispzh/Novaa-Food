-- Idempotent test data for the Nova Food landing domain.
-- This file never inserts, updates, or deletes users/auth_sessions/otp_codes.

INSERT INTO restaurant_categories (name, slug, icon, description, sort_order, is_active, created_at, updated_at)
VALUES
  ('رستوران', 'restaurant', 'resturantIcon', 'رستوران‌های ایرانی و بین‌المللی', 1, true, NOW(), NOW()),
  ('کافه', 'cafe', 'coffeeIcon', 'کافه و کافی‌شاپ', 2, true, NOW(), NOW()),
  ('فست‌فود', 'fast-food', 'burgerIcon', 'فست‌فود و غذای سریع', 3, true, NOW(), NOW()),
  ('بیکری', 'bakery', 'memoryCheckpointIcon', 'نان و شیرینی تازه', 4, true, NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order, is_active = true, deleted_at = NULL, updated_at = NOW();

INSERT INTO restaurant_amenities (name, slug, icon, created_at, updated_at)
VALUES
  ('فضای باز', 'outdoor-seating', 'outdoorIcon', NOW(), NOW()),
  ('مناسب جلسات کاری', 'business-meeting', 'businessIcon', NOW(), NOW()),
  ('فضای کار اشتراکی', 'coworking', 'laptopIcon', NOW(), NOW()),
  ('پارکینگ', 'parking', 'parkingIcon', NOW(), NOW()),
  ('اینترنت رایگان', 'free-wifi', 'wifiIcon', NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, deleted_at = NULL, updated_at = NOW();

INSERT INTO restaurants (slug, name, short_description, description, cover_image, phone_primary, phone_secondary, address, city, province, latitude, longitude, instagram, contact_description, average_rating, reviews_count, views_count, is_featured, is_active, created_at, updated_at)
VALUES
  ('sam-cafe', 'سام کافه', 'قهوه، صبحانه و نوشیدنی', 'ترکیبی از فضای گرم، نوشیدنی‌های باکیفیت و لحظاتی برای یک تجربه متفاوت.', '/images/bloggers/1.png', '09171127098', '07132456070', 'شیراز، بلوار صنایع، شهرک آرین، پارک علم و فناوری', 'شیراز', 'فارس', 29.625671, 52.512924, 'https://instagram.com/samcafe', 'برای رزرو و هماهنگی با ما تماس بگیرید.', 4.80, 230, 3150, true, true, NOW(), NOW()),
  ('radio-cafe', 'کافه رادیو', 'کافه دنج و آرام', 'محیطی آرام برای گفتگو، کار و نوشیدن قهوه تخصصی.', '/images/bloggers/2.png', '09170000002', NULL, 'شیراز، معالی‌آباد', 'شیراز', 'فارس', 29.681320, 52.469610, 'https://instagram.com/radiocafe', NULL, 4.60, 140, 2140, true, true, NOW(), NOW()),
  ('haft-khan', 'رستوران هفت‌خوان', 'غذای ایرانی و بین‌المللی', 'مجموعه‌ای از طعم‌های ایرانی و بین‌المللی در فضایی خانوادگی.', '/images/bloggers/3.png', '07132270000', NULL, 'شیراز، بلوار قرآن', 'شیراز', 'فارس', 29.642830, 52.558130, NULL, NULL, 4.70, 320, 5200, true, true, NOW(), NOW()),
  ('burger-land', 'برگر لند', 'برگر دست‌ساز', 'برگرهای دست‌ساز با مواد اولیه تازه.', '/images/bloggers/4.png', '09170000004', NULL, 'شیراز، فرهنگ‌شهر', 'شیراز', 'فارس', 29.698210, 52.456110, NULL, NULL, 4.35, 96, 1260, false, true, NOW(), NOW()),
  ('daily-bakery', 'بیکری دیلی', 'نان و شیرینی تازه', 'پخت روزانه نان، کروسان و شیرینی.', '/images/bloggers/5.png', '09170000005', NULL, 'شیراز، ارم', 'شیراز', 'فارس', 29.635410, 52.525710, NULL, NULL, 4.55, 78, 980, false, true, NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, short_description = EXCLUDED.short_description, description = EXCLUDED.description, cover_image = EXCLUDED.cover_image, address = EXCLUDED.address, city = EXCLUDED.city, province = EXCLUDED.province, latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude, average_rating = EXCLUDED.average_rating, reviews_count = EXCLUDED.reviews_count, views_count = EXCLUDED.views_count, is_featured = EXCLUDED.is_featured, is_active = true, deleted_at = NULL, updated_at = NOW();

INSERT INTO restaurant_category_links (restaurant_id, category_id, created_at)
SELECT r.id, c.id, NOW() FROM (VALUES ('sam-cafe','cafe'), ('radio-cafe','cafe'), ('haft-khan','restaurant'), ('burger-land','fast-food'), ('daily-bakery','bakery')) AS x(restaurant_slug, category_slug)
JOIN restaurants r ON r.slug = x.restaurant_slug JOIN restaurant_categories c ON c.slug = x.category_slug
ON CONFLICT (restaurant_id, category_id) DO NOTHING;

INSERT INTO restaurant_amenity_links (restaurant_id, amenity_id, created_at)
SELECT r.id, a.id, NOW() FROM (VALUES ('sam-cafe','outdoor-seating'), ('sam-cafe','business-meeting'), ('sam-cafe','coworking'), ('radio-cafe','free-wifi'), ('haft-khan','parking'), ('daily-bakery','outdoor-seating')) AS x(restaurant_slug, amenity_slug)
JOIN restaurants r ON r.slug = x.restaurant_slug JOIN restaurant_amenities a ON a.slug = x.amenity_slug
ON CONFLICT (restaurant_id, amenity_id) DO NOTHING;

INSERT INTO restaurant_hours (restaurant_id, weekday, opens_at, closes_at, is_closed, created_at, updated_at)
SELECT r.id, d.weekday, d.opens_at::time, d.closes_at::time, false, NOW(), NOW()
FROM restaurants r CROSS JOIN (VALUES (0,'08:00','23:30'),(1,'08:00','23:30'),(2,'08:00','23:30'),(3,'08:00','23:30'),(4,'08:00','23:30'),(5,'09:00','23:59'),(6,'09:00','23:59')) AS d(weekday,opens_at,closes_at)
WHERE r.slug IN ('sam-cafe','radio-cafe','haft-khan','burger-land','daily-bakery')
ON CONFLICT (restaurant_id, weekday) DO UPDATE SET opens_at = EXCLUDED.opens_at, closes_at = EXCLUDED.closes_at, is_closed = false, updated_at = NOW();

INSERT INTO restaurant_menu_items (restaurant_id, name, description, image, price, sort_order, is_available, created_at, updated_at)
SELECT r.id, x.name, x.description, x.image, x.price, x.sort_order, true, NOW(), NOW()
FROM (VALUES
 ('sam-cafe','چیزکیک لوتوس','چیزکیک با کرم لوتوس','/images/bloggers/1.png',185000,1),
 ('sam-cafe','لاته','اسپرسو با شیر','/images/bloggers/2.png',125000,2),
 ('radio-cafe','قهوه دمی','قهوه تخصصی روز','/images/bloggers/3.png',110000,1),
 ('haft-khan','کباب مخصوص','چلوکباب ویژه مجموعه','/images/bloggers/4.png',490000,1)
) AS x(restaurant_slug,name,description,image,price,sort_order) JOIN restaurants r ON r.slug=x.restaurant_slug
WHERE NOT EXISTS (SELECT 1 FROM restaurant_menu_items mi WHERE mi.restaurant_id=r.id AND mi.name=x.name);

INSERT INTO events (restaurant_id, slug, title, description, cover_image, location_name, address, starts_at, ends_at, registration_deadline, capacity, status, is_featured, created_at, updated_at)
SELECT r.id, x.slug, x.title, x.description, x.cover_image, r.name, r.address, x.starts_at, x.ends_at, x.deadline, x.capacity, 1, x.featured, NOW(), NOW()
FROM (VALUES
 ('sam-cafe','nova-cafe-opening','افتتاحیه کافه نووا','یک شب ویژه با موسیقی زنده و پذیرایی.','/images/bloggers/1.png','2027-01-21 18:00:00+03:30'::timestamptz,'2027-01-21 21:00:00+03:30'::timestamptz,'2027-01-20 23:59:00+03:30'::timestamptz,80,true),
 ('radio-cafe','coffee-workshop','کارگاه آشنایی با قهوه','آشنایی عملی با دم‌آوری قهوه تخصصی.','/images/bloggers/2.png','2027-02-05 16:00:00+03:30'::timestamptz,'2027-02-05 19:00:00+03:30'::timestamptz,'2027-02-04 20:00:00+03:30'::timestamptz,24,true),
 ('haft-khan','shirazi-food-night','شب غذای شیرازی','تجربه طعم غذاهای اصیل شیرازی.','/images/bloggers/3.png','2027-03-12 19:00:00+03:30'::timestamptz,'2027-03-12 23:00:00+03:30'::timestamptz,NULL::timestamptz,120,false)
) AS x(restaurant_slug,slug,title,description,cover_image,starts_at,ends_at,deadline,capacity,featured) JOIN restaurants r ON r.slug=x.restaurant_slug
ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, cover_image=EXCLUDED.cover_image, starts_at=EXCLUDED.starts_at, ends_at=EXCLUDED.ends_at, registration_deadline=EXCLUDED.registration_deadline, capacity=EXCLUDED.capacity, status=1, is_featured=EXCLUDED.is_featured, deleted_at=NULL, updated_at=NOW();

INSERT INTO blogger_profiles (username, display_name, title, bio, cover_image, visitors_count, is_verified, is_active, created_at, updated_at)
VALUES
 ('alihedarii','علی حیدری','Food Explorer','عاشق کشف کافه‌های دنج و رستوران‌های خاص شیراز.','/images/bloggers/1.png',3000,true,true,NOW(),NOW()),
 ('mrymrezaeii','مریم رضایی','Cafe Reviewer','راهنمای کافه‌گردی و تجربه طعم‌های تازه.','/images/bloggers/2.png',2100,true,true,NOW(),NOW()),
 ('ariyaahmadii','آریا احمدی','Food Photographer','روایت غذا و مکان با عکس و ویدئو.','/images/bloggers/3.png',1800,false,true,NOW(),NOW())
ON CONFLICT (username) DO UPDATE SET display_name=EXCLUDED.display_name,title=EXCLUDED.title,bio=EXCLUDED.bio,cover_image=EXCLUDED.cover_image,visitors_count=EXCLUDED.visitors_count,is_verified=EXCLUDED.is_verified,is_active=true,deleted_at=NULL,updated_at=NOW();

INSERT INTO blogger_social_links (blogger_id, platform, url, sort_order, created_at, updated_at)
SELECT b.id,x.platform,x.url,x.sort_order,NOW(),NOW() FROM (VALUES
 ('alihedarii','instagram','https://instagram.com/alihedarii',1),('alihedarii','telegram','https://t.me/alihedarii',2),('alihedarii','whatsapp','https://wa.me/989170000000',3),
 ('mrymrezaeii','instagram','https://instagram.com/mrymrezaeii',1),('ariyaahmadii','instagram','https://instagram.com/ariyaahmadii',1)
) AS x(username,platform,url,sort_order) JOIN blogger_profiles b ON b.username=x.username
ON CONFLICT (blogger_id,platform) DO UPDATE SET url=EXCLUDED.url,sort_order=EXCLUDED.sort_order,deleted_at=NULL,updated_at=NOW();

INSERT INTO blogger_videos (blogger_id, title, thumbnail, video_url, views_count, sort_order, created_at, updated_at)
SELECT b.id,x.title,x.thumbnail,x.video_url,x.views_count,x.sort_order,NOW(),NOW() FROM (VALUES
 ('alihedarii','سام کافه','/images/bloggers/1.png','https://example.com/videos/sam-cafe',1280,1),
 ('alihedarii','کافه رادیو','/images/bloggers/2.png','https://example.com/videos/radio-cafe',1190,2),
 ('mrymrezaeii','هفت‌خوان','/images/bloggers/3.png','https://example.com/videos/haft-khan',960,1)
) AS x(username,title,thumbnail,video_url,views_count,sort_order) JOIN blogger_profiles b ON b.username=x.username
WHERE NOT EXISTS (SELECT 1 FROM blogger_videos v WHERE v.blogger_id=b.id AND v.video_url=x.video_url);

INSERT INTO blogger_recommendations (blogger_id, restaurant_id, caption, sort_order, created_at, updated_at)
SELECT b.id,r.id,x.caption,x.sort_order,NOW(),NOW() FROM (VALUES
 ('alihedarii','sam-cafe','پیشنهاد عالی برای صبحانه',1),('alihedarii','radio-cafe','مناسب کار و قرار دوستانه',2),
 ('mrymrezaeii','daily-bakery','کروسان تازه و باکیفیت',1),('ariyaahmadii','haft-khan','تجربه کامل غذای ایرانی',1)
) AS x(username,restaurant_slug,caption,sort_order) JOIN blogger_profiles b ON b.username=x.username JOIN restaurants r ON r.slug=x.restaurant_slug
ON CONFLICT (blogger_id,restaurant_id) DO UPDATE SET caption=EXCLUDED.caption,sort_order=EXCLUDED.sort_order,deleted_at=NULL,updated_at=NOW();
