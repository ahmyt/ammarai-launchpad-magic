CREATE UNIQUE INDEX customer_reviews_identity_unique_idx
ON public.customer_reviews (lower(reviewer_name), lower(review_title), review_date);