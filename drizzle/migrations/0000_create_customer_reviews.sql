CREATE TABLE public.review_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL CHECK (char_length(reviewer_name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_title text NOT NULL CHECK (char_length(review_title) BETWEEN 3 AND 140),
  review_text text NOT NULL CHECK (char_length(review_text) BETWEEN 20 AND 4000),
  review_date date NOT NULL DEFAULT CURRENT_DATE CHECK (review_date <= CURRENT_DATE),
  consent boolean NOT NULL DEFAULT false CHECK (consent = true),
  source text NOT NULL DEFAULT 'Website submission',
  source_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, review_title, review_date)
);
GRANT INSERT ON public.review_submissions TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_submissions TO authenticated;
GRANT ALL ON public.review_submissions TO service_role;
ALTER TABLE public.review_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a review"
ON public.review_submissions FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending' AND consent = true);
CREATE POLICY "Admins manage review submissions"
ON public.review_submissions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid UNIQUE REFERENCES public.review_submissions(id) ON DELETE SET NULL,
  reviewer_name text NOT NULL CHECK (char_length(reviewer_name) BETWEEN 2 AND 100),
  review_title text NOT NULL CHECK (char_length(review_title) BETWEEN 3 AND 140),
  review_text text NOT NULL CHECK (char_length(review_text) BETWEEN 20 AND 4000),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_date date NOT NULL CHECK (review_date <= CURRENT_DATE),
  status text NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  source text NOT NULL DEFAULT 'Direct customer',
  source_url text,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.customer_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_reviews TO authenticated;
GRANT ALL ON public.customer_reviews TO service_role;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads approved customer reviews"
ON public.customer_reviews FOR SELECT TO anon, authenticated
USING (status = 'approved');
CREATE POLICY "Admins manage customer reviews"
ON public.customer_reviews FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.review_settings (
  id text PRIMARY KEY DEFAULT 'homepage' CHECK (id = 'homepage'),
  display_count smallint NOT NULL DEFAULT 6 CHECK (display_count BETWEEN 1 AND 24),
  min_rating smallint NOT NULL DEFAULT 1 CHECK (min_rating BETWEEN 1 AND 5),
  date_from date,
  date_to date,
  sort_order text NOT NULL DEFAULT 'newest' CHECK (sort_order IN ('newest', 'oldest', 'highest', 'manual')),
  featured_first boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (date_from IS NULL OR date_to IS NULL OR date_from <= date_to)
);
GRANT SELECT ON public.review_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_settings TO authenticated;
GRANT ALL ON public.review_settings TO service_role;
ALTER TABLE public.review_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads review settings"
ON public.review_settings FOR SELECT TO anon, authenticated
USING (true);
CREATE POLICY "Admins manage review settings"
ON public.review_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX review_submissions_status_created_idx ON public.review_submissions (status, created_at DESC);
CREATE INDEX customer_reviews_public_idx ON public.customer_reviews (status, rating, review_date DESC);
CREATE INDEX customer_reviews_featured_idx ON public.customer_reviews (featured DESC, display_order, review_date DESC);

CREATE TRIGGER review_submissions_set_updated_at
BEFORE UPDATE ON public.review_submissions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER customer_reviews_set_updated_at
BEFORE UPDATE ON public.customer_reviews
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER review_settings_set_updated_at
BEFORE UPDATE ON public.review_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();