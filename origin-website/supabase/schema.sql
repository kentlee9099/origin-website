-- ============================================================
-- Origin EVA — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

-- ── nav_items ─────────────────────────────────────────────
CREATE TABLE nav_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label       TEXT NOT NULL,
  href        TEXT NOT NULL,
  sort_order  INT  NOT NULL DEFAULT 0,
  is_cta      BOOL NOT NULL DEFAULT false,
  is_visible  BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER nav_items_updated_at BEFORE UPDATE ON nav_items FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── ticker_items ──────────────────────────────────────────
CREATE TABLE ticker_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text        TEXT NOT NULL,
  link_url    TEXT,
  sort_order  INT  NOT NULL DEFAULT 0,
  is_visible  BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── hero_content (singleton) ──────────────────────────────
CREATE TABLE hero_content (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  headline             TEXT NOT NULL,
  headline_highlight   TEXT NOT NULL,
  subtitle             TEXT NOT NULL,
  cta_primary_label    TEXT NOT NULL,
  cta_primary_href     TEXT NOT NULL,
  cta_secondary_label  TEXT,
  cta_secondary_href   TEXT,
  stats                JSONB NOT NULL DEFAULT '[]',
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX hero_singleton ON hero_content ((true));
CREATE TRIGGER hero_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── about_content (singleton) ─────────────────────────────
CREATE TABLE about_content (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge               TEXT NOT NULL DEFAULT '关于我们',
  headline            TEXT NOT NULL,
  headline_highlight  TEXT NOT NULL,
  body_paragraphs     TEXT[] NOT NULL DEFAULT '{}',
  stats               JSONB NOT NULL DEFAULT '[]',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX about_singleton ON about_content ((true));
CREATE TRIGGER about_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── about_features ────────────────────────────────────────
CREATE TABLE about_features (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon        TEXT NOT NULL DEFAULT '★',
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order  INT  NOT NULL DEFAULT 0,
  is_visible  BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER about_feat_updated_at BEFORE UPDATE ON about_features FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── services ─────────────────────────────────────────────
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon        TEXT NOT NULL DEFAULT '★',
  category_en TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  features    TEXT[] NOT NULL DEFAULT '{}',
  cta_label   TEXT NOT NULL DEFAULT '了解详情',
  cta_href    TEXT NOT NULL DEFAULT '#',
  sort_order  INT  NOT NULL DEFAULT 0,
  is_visible  BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── cases ────────────────────────────────────────────────
CREATE TABLE cases (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url   TEXT,
  media_type  TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image','video')),
  video_url   TEXT,
  sort_order  INT  NOT NULL DEFAULT 0,
  is_visible  BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── insights ─────────────────────────────────────────────
CREATE TABLE insights (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  category     TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'article',
  description  TEXT NOT NULL,
  image_url    TEXT,
  video_url    TEXT,
  author_name  TEXT NOT NULL,
  author_role  TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_visible   BOOL NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER insights_updated_at BEFORE UPDATE ON insights FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── testimonials ─────────────────────────────────────────
CREATE TABLE testimonials (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rating         INT  NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote          TEXT NOT NULL,
  author_name    TEXT NOT NULL,
  author_title   TEXT NOT NULL,
  author_company TEXT NOT NULL,
  author_avatar  TEXT,
  sort_order     INT  NOT NULL DEFAULT 0,
  is_visible     BOOL NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER testi_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── cta_content (singleton) ──────────────────────────────
CREATE TABLE cta_content (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge                TEXT,
  headline             TEXT NOT NULL,
  headline_highlight   TEXT NOT NULL,
  headline_suffix      TEXT,
  body                 TEXT NOT NULL,
  cta_primary_label    TEXT NOT NULL,
  cta_primary_href     TEXT NOT NULL,
  cta_secondary_label  TEXT,
  cta_secondary_href   TEXT,
  trust_signals        JSONB NOT NULL DEFAULT '[]',
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX cta_singleton ON cta_content ((true));
CREATE TRIGGER cta_updated_at BEFORE UPDATE ON cta_content FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── media_assets ─────────────────────────────────────────
CREATE TABLE media_assets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket        TEXT NOT NULL,
  storage_path  TEXT NOT NULL UNIQUE,
  public_url    TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type     TEXT NOT NULL,
  size_bytes    INT  NOT NULL,
  width         INT,
  height        INT,
  alt_text      TEXT,
  used_by       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── RLS Policies ─────────────────────────────────────────
ALTER TABLE nav_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticker_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content   ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content  ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases          ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_content    ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets   ENABLE ROW LEVEL SECURITY;

-- Public read (visible items only)
CREATE POLICY "public read nav"        ON nav_items      FOR SELECT USING (is_visible = true);
CREATE POLICY "public read ticker"     ON ticker_items   FOR SELECT USING (is_visible = true);
CREATE POLICY "public read hero"       ON hero_content   FOR SELECT USING (true);
CREATE POLICY "public read about"      ON about_content  FOR SELECT USING (true);
CREATE POLICY "public read features"   ON about_features FOR SELECT USING (is_visible = true);
CREATE POLICY "public read services"   ON services       FOR SELECT USING (is_visible = true);
CREATE POLICY "public read cases"      ON cases          FOR SELECT USING (is_visible = true);
CREATE POLICY "public read insights"   ON insights       FOR SELECT USING (is_visible = true);
CREATE POLICY "public read testi"      ON testimonials   FOR SELECT USING (is_visible = true);
CREATE POLICY "public read cta"        ON cta_content    FOR SELECT USING (true);
CREATE POLICY "public read media"      ON media_assets   FOR SELECT USING (true);

-- Service role full access (admin operations)
CREATE POLICY "service all nav"        ON nav_items      USING (auth.role() = 'service_role');
CREATE POLICY "service all ticker"     ON ticker_items   USING (auth.role() = 'service_role');
CREATE POLICY "service all hero"       ON hero_content   USING (auth.role() = 'service_role');
CREATE POLICY "service all about"      ON about_content  USING (auth.role() = 'service_role');
CREATE POLICY "service all features"   ON about_features USING (auth.role() = 'service_role');
CREATE POLICY "service all services"   ON services       USING (auth.role() = 'service_role');
CREATE POLICY "service all cases"      ON cases          USING (auth.role() = 'service_role');
CREATE POLICY "service all insights"   ON insights       USING (auth.role() = 'service_role');
CREATE POLICY "service all testi"      ON testimonials   USING (auth.role() = 'service_role');
CREATE POLICY "service all cta"        ON cta_content    USING (auth.role() = 'service_role');
CREATE POLICY "service all media"      ON media_assets   USING (auth.role() = 'service_role');

-- ── Realtime ─────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE nav_items, ticker_items, hero_content,
  about_content, about_features, services, cases, insights, testimonials, cta_content;

-- ── Seed: default nav items ───────────────────────────────
INSERT INTO nav_items (label, href, sort_order, is_cta) VALUES
  ('关于我们', '#about',        0, false),
  ('服务',     '#services',     1, false),
  ('案例',     '#cases',        2, false),
  ('洞察',     '#insights',     3, false),
  ('联系我们', '/contact',      4, true);

-- ── Seed: default ticker ──────────────────────────────────
INSERT INTO ticker_items (text, sort_order) VALUES
  ('哈萨克斯坦阿拉木图仓储中心已启用',        0),
  ('本月跨境货运量环比增长 +23%',             1),
  ('俄罗斯合规清关专项服务现已开放',          2),
  ('2024 年中亚大宗贸易白皮书发布',           3);
