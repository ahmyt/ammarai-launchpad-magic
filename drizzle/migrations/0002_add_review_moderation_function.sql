CREATE OR REPLACE FUNCTION public.admin_moderate_review(_submission_id uuid, _status text, _verified boolean DEFAULT false, _featured boolean DEFAULT false)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _submission public.review_submissions%ROWTYPE;
  _review_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  IF _status NOT IN ('approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid moderation status';
  END IF;

  SELECT * INTO _submission
  FROM public.review_submissions
  WHERE id = _submission_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Review submission not found';
  END IF;

  UPDATE public.review_submissions SET status = _status WHERE id = _submission_id;

  IF _status = 'approved' THEN
    INSERT INTO public.customer_reviews (
      submission_id, reviewer_name, review_title, review_text, rating, review_date,
      status, verified, featured, source, source_url, approved_at
    ) VALUES (
      _submission.id, _submission.reviewer_name, _submission.review_title,
      _submission.review_text, _submission.rating, _submission.review_date,
      'approved', _verified, _featured, _submission.source, _submission.source_url, now()
    )
    ON CONFLICT (submission_id) DO UPDATE SET
      reviewer_name = EXCLUDED.reviewer_name,
      review_title = EXCLUDED.review_title,
      review_text = EXCLUDED.review_text,
      rating = EXCLUDED.rating,
      review_date = EXCLUDED.review_date,
      status = 'approved',
      verified = EXCLUDED.verified,
      featured = EXCLUDED.featured,
      source = EXCLUDED.source,
      source_url = EXCLUDED.source_url,
      approved_at = now()
    RETURNING id INTO _review_id;
  ELSE
    UPDATE public.customer_reviews SET status = 'rejected' WHERE submission_id = _submission_id;
  END IF;

  RETURN _review_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_moderate_review(uuid, text, boolean, boolean) TO authenticated;