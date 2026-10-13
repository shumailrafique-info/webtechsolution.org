ALTER TYPE "user_role" ADD VALUE IF NOT EXISTS 'author';

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.authors') IS NULL THEN
    RAISE EXCEPTION 'authors table not found: this migration has already been applied';
  END IF;
END $$;

ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "bio" text DEFAULT '' NOT NULL;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "avatar" jsonb;

CREATE TEMP TABLE author_map (
  author_slug text PRIMARY KEY,
  user_id text NOT NULL,
  account_id text NOT NULL,
  email text NOT NULL,
  password_hash text NOT NULL
) ON COMMIT DROP;

INSERT INTO author_map (author_slug, user_id, account_id, email, password_hash) VALUES
  ('amit', 'TM70R72MN89yTPzAdbqa8i23ECyJi9NY', 'UMfBSXtkrWgDuwCVttcGXVST6Er9cpKs', 'amit@gmail.com', 'ff98e85fb5e7a20b9f94c2c61c5e0522:0429b51c4f5fc0c82c7cbbf7299f7bf99ee81ac86e796257a19e288a7f93b5e1e4fd8f790f8a031a63558318edb8233ea2f2f0d5fce7ce0bea1abbf5973bcb86'),
  ('brian', 'lPhwiIsY4t6GmXMOC8ZY4zqtyzIvvo37', 'yjvMMg2wCEP6FDL7s2YGOwDFBustdr7d', 'brian@gmail.com', 'c4ecbaea79a0c4c428b8afb55fe93957:6f91b3c79996ee9418a8b262f0fbf402a4a31ce1a27b70fe4fcfdeaea49e4e9b03b819a71d84c52976a66273cb5da2ce191caabb3456d66e5b7e55f543362a36'),
  ('dileep', 'qVNekfKtpqNcH89B6QhEfBAPSV29w4uP', 'Vg91EV5o0u9sOtBLczBarjHEGJbIDI5N', 'dileep@gmail.com', 'debdd82b498171dc4a0f940ec7f20f3f:4f14535770361fd04f49be5ed2bf0c3af1a8683a2b52d00ba004f0af1ba91bfcfb859842218c47bf409edc2120ccdec4953d714c108648583b6572a4617793a2'),
  ('ethan', 'GTQGBnV83C4i1IunbAZ9ZNdI3zw8roqX', 'aNct26QyIAe2mGY1vVjvhZ5uqkvP7e2j', 'ethan@gmail.com', 'bd24047d5bb0884c8e4c6f94a5caedbd:c122aefd3677a7eb1956a315dba6ddf93c697e37992eecb3ed55fc78be35ff2fc7f84c46172f7cd787489aa23f81e5dc6a7830347198a524bd2c599830f39501'),
  ('fawad-malik', 'pFBRqf84NaBYWFKjXxv3ILHaZFvXPxOM', '1zwmOld2dNcxAK4QMygtXDnUO6fPet3Q', 'fawad-malik@gmail.com', '739e75e53b7b08afc5d62a47d2046043:ce8be44ef75a01047beceb4f82be9a765c872ad786e824a05bed44d61c9348a6865e519d6677bfff95519a054cf367a9759d3b124a36c697f382dac535d0f009'),
  ('michael', '3USPytVzM6cH6gmO8k3WulEJkEIHmPWn', '5GcUuLasd2ydtUc8U1JVQDvNRUVhiUMb', 'michael@gmail.com', '0059569360d4f243f85e57c25bfbaee2:f6781e4e276ca9d5576eeba5f799588c480abd516e5ca1361bc72f000a42b516c66852fb5100e9d2de9d5dc02335031f8c42a4b671fcb913d1806d15c1e58bb0'),
  ('noman-sarwar', '3awUVAKth3a903fxW6aeKsC646EetugS', 'kkVRhYfeDTUqIS0TtPYM9sQDhbR31HwV', 'noman-sarwar@gmail.com', '61dc44f1889b8a25a50f026a0cc2d278:fc1bb930ec120e26a5dbc8726bd3e3dd09842dc2eebc75a7d9fce4cb997fa5a940298ce605f233933dc7586f643868ed42dd6f3edc577bcb1bb742db6ea3c6d0'),
  ('preteek', '8gh1k3If3Ty39D7QntrJyDkI8kx9QJ9w', '93SsB4J2FKK1uKqIkcRQcppbuLb96toV', 'preteek@gmail.com', '4b6232310a06f9949ea5f76e7ac84782:9b6e859c5f4188f0539c1b6e8397267fcd2c10c898b3ec882df1a55018fb849ff2e3b31c0df2c3060d923790dc412e9925220ac6f477ceaaaa6d07a7b6c36a36'),
  ('saad', '9tos4SyFDDAgLdQfdVQkNHMMrtRxcLZP', 'dgik7HOketxZAI1V1bgG2jV1XAIlz8Kg', 'saad@gmail.com', 'a1241801d5068bce44509266469b34ae:f42c09643da742ccc18181f60b4897e91a2c38884a27fca65cc1b64c43aa4eac9f1cd2d1e27b9fd314a08d7f3c89af31a5df0b196f3fa15204627cd6c28cc935'),
  ('shahidmansuri', 'zNGP4mgzFJeThhyFNuVGCYT6Sl04qUCi', 'DV3qH8QptvqCln4giBN5MoXpQwpmgPLc', 'shahidmansuri@gmail.com', '26fc1301515cc08a87e141f4155f57bd:094095ce6f36a0a9cc0c4d8f22c8f7a87c0bf3a7af1c1722194a55c526410f1906d5b647fc41a5e2ad647886eb80c3f4e130930a7b3fbf2aa7860455001dff72'),
  ('sobi', 'vXGlzDNDL8CHw1AacPAS0DN6xjeKOluA', 'C6KBkCyxesfdtF8KcATQvjyLnWkzYFqh', 'sobi@gmail.com', '9033ad01be16699ea22fee9af395444a:08f0a68d8e31fe415546977beaec8b2d7f1b48596967383e4c7c77d2c4ce76aef6a02f43180c2d56419daa068789c71069972bb5ab098d1aa55e113726b7642c'),
  ('sourav-sharma', 'lMW7tQm0baaWkUD1x5SUKcvZOA800wsY', 'n993wF6G1ExaAY991PBuaIkKfOIEMVAd', 'sourav-sharma@gmail.com', 'dc4610c27a10d642fd8244d3de7c2c54:94ac8ab7105ca3273c3443599d9dc1167711e084e1972068dec0629f7e386ca57e41d54c6ce588c32bdbe49cf043f74548b59bbac601a51b73f99638433776d5'),
  ('thomas', 'pBUa5CnEAUiueCy11WCHty3yEnPG17bz', 'o2TtzNRxInSEWZzvCFfsZLyrlwALPw6a', 'thomas@gmail.com', '7c41fcff02ddb80b700e683629e12504:851a33665949e1814b44697e37904eecd2595bcaad85b8834cc963c4ada1baed17a022a734ee510d8291d1e28b385efd9bf3adf9c69a9dfe4c5c9769071f384b'),
  ('vince-louie-daniot', 'jA087jhjcMZob0eMTnDXvlrXb1RVEVTc', '8tadt20ir2BTjQ2IBtuieAYNiFu1lGY0', 'vince-louie-daniot@gmail.com', 'ee1171211357531885caa7c7ff8e418a:1c89c8799d245509c0b646ab6db7a134aac68a7f5a5721b658b444e6b68896b51b443fd626ff698079c9648d1dcf1e4a7902cf58c62ee1510130d00b4e0c75b2');

DO $$
DECLARE missing text;
BEGIN
  SELECT string_agg(a.slug, ', ') INTO missing
  FROM authors a LEFT JOIN author_map m ON m.author_slug = a.slug
  WHERE m.author_slug IS NULL;
  IF missing IS NOT NULL THEN
    RAISE EXCEPTION 'authors without a mapping: %', missing;
  END IF;
END $$;

INSERT INTO "user" ("id", "name", "email", "email_verified", "image", "created_at", "updated_at", "role", "bio", "avatar")
SELECT m.user_id, a.name, m.email, false, a.image->>'url', a.created_at, now(), 'author', a.bio, a.image
FROM authors a JOIN author_map m ON m.author_slug = a.slug;

INSERT INTO "account" ("id", "account_id", "provider_id", "user_id", "password", "created_at", "updated_at")
SELECT m.account_id, m.user_id, 'credential', m.user_id, m.password_hash, now(), now()
FROM author_map m;

ALTER TABLE "blogs" ADD COLUMN "author_user_id" text;

UPDATE "blogs" b
SET "author_user_id" = m.user_id
FROM authors a JOIN author_map m ON m.author_slug = a.slug
WHERE b."author_id" = a.id;

DO $$
DECLARE unmapped integer;
BEGIN
  SELECT count(*) INTO unmapped FROM "blogs" WHERE "author_id" IS NOT NULL AND "author_user_id" IS NULL;
  IF unmapped > 0 THEN
    RAISE EXCEPTION '% posts could not be mapped to an author user', unmapped;
  END IF;
END $$;

ALTER TABLE "blogs" DROP CONSTRAINT IF EXISTS "blogs_author_id_authors_id_fk";
DROP INDEX IF EXISTS "blogs_author_idx";
ALTER TABLE "blogs" DROP COLUMN "author_id";
ALTER TABLE "blogs" RENAME COLUMN "author_user_id" TO "author_id";
ALTER TABLE "blogs"
  ADD CONSTRAINT "blogs_author_id_user_id_fk"
  FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE SET NULL;
CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");

DROP TABLE "authors";

COMMIT;
