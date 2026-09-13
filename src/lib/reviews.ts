import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type CustomerReview = Database["public"]["Tables"]["customer_reviews"]["Row"];
export type ReviewSettings = Database["public"]["Tables"]["review_settings"]["Row"];
export type ReviewSubmission = Database["public"]["Tables"]["review_submissions"]["Row"];

export const defaultReviewSettings: ReviewSettings = {
  id: "homepage",
  display_count: 6,
  min_rating: 1,
  date_from: null,
  date_to: null,
  sort_order: "newest",
  featured_first: true,
  updated_at: new Date(0).toISOString(),
};

export const publicReviewsQuery = queryOptions({
  queryKey: ["customer-reviews", "public"],
  queryFn: async () => {
    const [{ data: reviews, error: reviewsError }, { data: settings, error: settingsError }] =
      await Promise.all([
        supabase
          .from("customer_reviews")
          .select(
            "id, reviewer_name, review_title, review_text, rating, review_date, verified, featured, display_order, source, source_url, status, approved_at, created_at, updated_at, submission_id",
          )
          .eq("status", "approved"),
        supabase.from("review_settings").select("*").eq("id", "homepage").maybeSingle(),
      ]);
    if (reviewsError) throw reviewsError;
    if (settingsError) throw settingsError;
    return {
      reviews: (reviews ?? []) as CustomerReview[],
      settings: (settings as ReviewSettings | null) ?? defaultReviewSettings,
    };
  },
  staleTime: 60_000,
});

export function sortReviews(reviews: CustomerReview[], settings: ReviewSettings) {
  return reviews
    .filter((review) => {
      if (review.rating < settings.min_rating) return false;
      if (settings.date_from && review.review_date < settings.date_from) return false;
      if (settings.date_to && review.review_date > settings.date_to) return false;
      return true;
    })
    .sort((a, b) => {
      if (settings.featured_first && a.featured !== b.featured) return a.featured ? -1 : 1;
      if (settings.sort_order === "manual") return a.display_order - b.display_order;
      if (settings.sort_order === "oldest") return a.review_date.localeCompare(b.review_date);
      if (settings.sort_order === "highest") {
        return b.rating - a.rating || b.review_date.localeCompare(a.review_date);
      }
      return b.review_date.localeCompare(a.review_date);
    });
}
