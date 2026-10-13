BEGIN;

CREATE TABLE IF NOT EXISTS "blog_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "blog_categories_slug_unique" UNIQUE ("slug")
);

ALTER TABLE "blogs" ADD COLUMN IF NOT EXISTS "category_id" uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blogs_category_id_blog_categories_id_fk'
  ) THEN
    ALTER TABLE "blogs"
      ADD CONSTRAINT "blogs_category_id_blog_categories_id_fk"
      FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "blogs_category_idx" ON "blogs" USING btree ("category_id");

COMMIT;
