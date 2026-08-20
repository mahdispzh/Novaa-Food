-- CreateTable
CREATE TABLE "restaurant_categories" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "icon" VARCHAR(100),
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurant_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "short_description" TEXT,
    "description" TEXT,
    "cover_image" TEXT,
    "phone_primary" VARCHAR(30),
    "phone_secondary" VARCHAR(30),
    "address" TEXT,
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "instagram" TEXT,
    "website" TEXT,
    "contact_description" TEXT,
    "average_rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "reviews_count" INTEGER NOT NULL DEFAULT 0,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_category_links" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_category_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_amenities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "icon" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurant_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_amenity_links" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "amenity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_amenity_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_hours" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL,
    "opens_at" TIME(0),
    "closes_at" TIME(0),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "restaurant_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_images" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurant_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_menu_items" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" INTEGER,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurant_menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_reviews" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "restaurant_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_restaurants" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER,
    "slug" VARCHAR(180) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "cover_image" TEXT,
    "location_name" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "starts_at" TIMESTAMPTZ(6) NOT NULL,
    "ends_at" TIMESTAMPTZ(6) NOT NULL,
    "registration_deadline" TIMESTAMPTZ(6),
    "capacity" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_attendees" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "event_attendees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogger_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "username" VARCHAR(80) NOT NULL,
    "display_name" VARCHAR(180) NOT NULL,
    "title" VARCHAR(180),
    "bio" TEXT,
    "cover_image" TEXT,
    "visitors_count" INTEGER NOT NULL DEFAULT 0,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "blogger_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogger_follows" (
    "id" SERIAL NOT NULL,
    "blogger_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogger_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogger_social_links" (
    "id" SERIAL NOT NULL,
    "blogger_id" INTEGER NOT NULL,
    "platform" VARCHAR(40) NOT NULL,
    "url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "blogger_social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogger_videos" (
    "id" SERIAL NOT NULL,
    "blogger_id" INTEGER NOT NULL,
    "title" TEXT,
    "thumbnail" TEXT NOT NULL,
    "video_url" TEXT,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "blogger_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogger_recommendations" (
    "id" SERIAL NOT NULL,
    "blogger_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "caption" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "blogger_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_categories_slug_key" ON "restaurant_categories"("slug");

-- CreateIndex
CREATE INDEX "restaurant_categories_parent_id_idx" ON "restaurant_categories"("parent_id");

-- CreateIndex
CREATE INDEX "restaurant_categories_is_active_deleted_at_sort_order_idx" ON "restaurant_categories"("is_active", "deleted_at", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_slug_key" ON "restaurants"("slug");

-- CreateIndex
CREATE INDEX "restaurants_is_active_deleted_at_is_featured_idx" ON "restaurants"("is_active", "deleted_at", "is_featured");

-- CreateIndex
CREATE INDEX "restaurants_city_deleted_at_idx" ON "restaurants"("city", "deleted_at");

-- CreateIndex
CREATE INDEX "restaurants_latitude_longitude_idx" ON "restaurants"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "restaurant_category_links_category_id_idx" ON "restaurant_category_links"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_category_links_restaurant_id_category_id_key" ON "restaurant_category_links"("restaurant_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_amenities_slug_key" ON "restaurant_amenities"("slug");

-- CreateIndex
CREATE INDEX "restaurant_amenity_links_amenity_id_idx" ON "restaurant_amenity_links"("amenity_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_amenity_links_restaurant_id_amenity_id_key" ON "restaurant_amenity_links"("restaurant_id", "amenity_id");

-- CreateIndex
CREATE INDEX "restaurant_hours_restaurant_id_idx" ON "restaurant_hours"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_hours_restaurant_id_weekday_key" ON "restaurant_hours"("restaurant_id", "weekday");

-- CreateIndex
CREATE INDEX "restaurant_images_restaurant_id_deleted_at_sort_order_idx" ON "restaurant_images"("restaurant_id", "deleted_at", "sort_order");

-- CreateIndex
CREATE INDEX "restaurant_menu_items_restaurant_id_is_available_deleted_at_idx" ON "restaurant_menu_items"("restaurant_id", "is_available", "deleted_at", "sort_order");

-- CreateIndex
CREATE INDEX "restaurant_reviews_restaurant_id_status_deleted_at_created__idx" ON "restaurant_reviews"("restaurant_id", "status", "deleted_at", "created_at");

-- CreateIndex
CREATE INDEX "restaurant_reviews_user_id_idx" ON "restaurant_reviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_reviews_restaurant_id_user_id_parent_id_key" ON "restaurant_reviews"("restaurant_id", "user_id", "parent_id");

-- CreateIndex
CREATE INDEX "saved_restaurants_user_id_idx" ON "saved_restaurants"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_restaurants_restaurant_id_user_id_key" ON "saved_restaurants"("restaurant_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_status_deleted_at_starts_at_idx" ON "events"("status", "deleted_at", "starts_at");

-- CreateIndex
CREATE INDEX "events_restaurant_id_idx" ON "events"("restaurant_id");

-- CreateIndex
CREATE INDEX "event_attendees_user_id_deleted_at_idx" ON "event_attendees"("user_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_attendees_event_id_user_id_key" ON "event_attendees"("event_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogger_profiles_user_id_key" ON "blogger_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogger_profiles_username_key" ON "blogger_profiles"("username");

-- CreateIndex
CREATE INDEX "blogger_profiles_is_active_deleted_at_idx" ON "blogger_profiles"("is_active", "deleted_at");

-- CreateIndex
CREATE INDEX "blogger_follows_user_id_idx" ON "blogger_follows"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogger_follows_blogger_id_user_id_key" ON "blogger_follows"("blogger_id", "user_id");

-- CreateIndex
CREATE INDEX "blogger_social_links_blogger_id_deleted_at_sort_order_idx" ON "blogger_social_links"("blogger_id", "deleted_at", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "blogger_social_links_blogger_id_platform_key" ON "blogger_social_links"("blogger_id", "platform");

-- CreateIndex
CREATE INDEX "blogger_videos_blogger_id_deleted_at_sort_order_idx" ON "blogger_videos"("blogger_id", "deleted_at", "sort_order");

-- CreateIndex
CREATE INDEX "blogger_recommendations_restaurant_id_deleted_at_idx" ON "blogger_recommendations"("restaurant_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "blogger_recommendations_blogger_id_restaurant_id_key" ON "blogger_recommendations"("blogger_id", "restaurant_id");

-- AddForeignKey
ALTER TABLE "restaurant_categories" ADD CONSTRAINT "restaurant_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "restaurant_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_category_links" ADD CONSTRAINT "restaurant_category_links_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_category_links" ADD CONSTRAINT "restaurant_category_links_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "restaurant_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_amenity_links" ADD CONSTRAINT "restaurant_amenity_links_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_amenity_links" ADD CONSTRAINT "restaurant_amenity_links_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "restaurant_amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_hours" ADD CONSTRAINT "restaurant_hours_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_images" ADD CONSTRAINT "restaurant_images_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_menu_items" ADD CONSTRAINT "restaurant_menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_reviews" ADD CONSTRAINT "restaurant_reviews_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_reviews" ADD CONSTRAINT "restaurant_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_reviews" ADD CONSTRAINT "restaurant_reviews_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "restaurant_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_restaurants" ADD CONSTRAINT "saved_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_restaurants" ADD CONSTRAINT "saved_restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_attendees" ADD CONSTRAINT "event_attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_attendees" ADD CONSTRAINT "event_attendees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_profiles" ADD CONSTRAINT "blogger_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_follows" ADD CONSTRAINT "blogger_follows_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_follows" ADD CONSTRAINT "blogger_follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_social_links" ADD CONSTRAINT "blogger_social_links_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_videos" ADD CONSTRAINT "blogger_videos_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_recommendations" ADD CONSTRAINT "blogger_recommendations_blogger_id_fkey" FOREIGN KEY ("blogger_id") REFERENCES "blogger_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogger_recommendations" ADD CONSTRAINT "blogger_recommendations_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
