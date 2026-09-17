import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeCheck, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { publicReviewsQuery, sortReviews, type CustomerReview } from "@/lib/reviews";
import { ActionButton } from "@/components/site/Button";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent" aria-label={label ?? `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-4" fill={index < Math.round(rating) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <Card className="studio-review-card flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        {review.verified ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
            <BadgeCheck className="size-4" aria-hidden="true" /> Verified
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-snug">{review.review_title}</h3>
      <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{review.review_text}</p>
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">{review.reviewer_name}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(`${review.review_date}T12:00:00`).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}

function ReviewBrowser({ reviews }: { reviews: CustomerReview[] }) {
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState<"newest" | "highest">("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = useMemo(
    () =>
      reviews
        .filter((review) => rating === 0 || review.rating === rating)
        .sort((a, b) =>
          sort === "highest"
            ? b.rating - a.rating || b.review_date.localeCompare(a.review_date)
            : b.review_date.localeCompare(a.review_date),
        ),
    [rating, reviews, sort],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Customer reviews</DialogTitle>
        <DialogDescription>Read feedback approved for publication by AmmarAI.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap gap-3 border-y border-border py-4">
        <label className="text-xs font-semibold text-muted-foreground">
          Rating
          <select
            value={rating}
            onChange={(event) => { setRating(Number(event.target.value)); setPage(1); }}
            className="ml-2 rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
          >
            <option value={0}>All</option>
            {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-muted-foreground">
          Order
          <select
            value={sort}
            onChange={(event) => { setSort(event.target.value as "newest" | "highest"); setPage(1); }}
            className="ml-2 rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest rated</option>
          </select>
        </label>
      </div>
      {visible.length ? (
        <div className="grid gap-4 sm:grid-cols-2">{visible.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
      ) : <p className="py-8 text-center text-sm text-muted-foreground">No reviews match this rating.</p>}
      {pages > 1 ? (
        <div className="flex items-center justify-between">
          <ActionButton variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</ActionButton>
          <span className="text-xs text-muted-foreground">Page {page} of {pages}</span>
          <ActionButton variant="outline" size="sm" disabled={page === pages} onClick={() => setPage((value) => value + 1)}>Next</ActionButton>
        </div>
      ) : null}
    </DialogContent>
  );
}

function ReviewForm() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setPending(true);
    setStatus(null);
    const form = new FormData(formEl);
    if (String(form.get("website") ?? "")) {
      setPending(false);
      setDone(true);
      return;
    }
    const { error } = await supabase.from("review_submissions").insert({
      reviewer_name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      rating: Number(form.get("rating")),
      review_title: String(form.get("title") ?? "").trim(),
      review_text: String(form.get("review") ?? "").trim(),
      review_date: String(form.get("date")),
      consent: form.get("consent") === "on",
      status: "pending",
    });
    if (error) setStatus(error.code === "23505" ? "This review has already been submitted." : error.message);
    else {
      formEl.reset();
      setDone(true);
      void queryClient.invalidateQueries({ queryKey: ["review-submissions"] });
    }
    setPending(false);
  }

  const fieldClass = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground";

  if (done) {
    return (
      <DialogContent className="max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thank you for your review</DialogTitle>
          <DialogDescription>
            Your review was received and is awaiting moderation. It will appear publicly once approved.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <DialogClose asChild>
            <ActionButton>Close</ActionButton>
          </DialogClose>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-h-[88vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Write a review</DialogTitle>
        <DialogDescription>Your review will be checked before it appears publicly.</DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} className="space-y-4">
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">Name<input className={fieldClass} name="name" minLength={2} maxLength={100} required /></label>
          <label className="text-sm font-semibold">Email<input className={fieldClass} name="email" type="email" maxLength={254} required /></label>
          <label className="text-sm font-semibold">Rating<select className={fieldClass} name="rating" defaultValue="5" required>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></label>
          <label className="text-sm font-semibold">Review date<input className={fieldClass} name="date" type="date" max={new Date().toISOString().slice(0, 10)} defaultValue={new Date().toISOString().slice(0, 10)} required /></label>
        </div>
        <label className="block text-sm font-semibold">Review title<input className={fieldClass} name="title" minLength={3} maxLength={140} required /></label>
        <label className="block text-sm font-semibold">Your review<textarea className={`${fieldClass} min-h-32`} name="review" minLength={20} maxLength={4000} required /></label>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><input name="consent" type="checkbox" required className="mt-0.5" />I confirm this reflects my genuine experience and consent to publication of my name and review.</label>
        {status ? <p role="status" className="text-sm text-destructive">{status}</p> : null}
        <ActionButton type="submit" disabled={pending}>{pending ? "Submitting…" : "Submit review"}</ActionButton>
      </form>
    </DialogContent>
  );
}

function ReviewDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {open ? <ReviewForm key={String(open)} /> : null}
    </Dialog>
  );
}

export function CustomerReviews() {
  const { data, isLoading } = useQuery(publicReviewsQuery);
  const reviews = data?.reviews ?? [];
  const settings = data?.settings;
  const selected = settings ? sortReviews(reviews, settings).slice(0, settings.display_count) : [];
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const verifiedCount = reviews.filter((review) => review.verified).length;
  const distribution = [5, 4, 3, 2, 1].map((value) => ({ value, count: reviews.filter((review) => review.rating === value).length }));

  return (
    <Section tone="sand" id="customer-reviews" className="studio-section studio-reviews-section">
      <Container>
        <SectionHeading eyebrow="Customer reviews" title="What customers say about AmmarAI" intro="Published feedback is reviewed before it appears here. Verified badges are applied only after validation." scale="large" className="studio-heading-wide" />
        {isLoading ? <p className="mt-8 text-sm text-muted-foreground">Loading reviews…</p> : reviews.length === 0 ? (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
            <div><p className="text-lg font-semibold">Genuine reviews coming soon</p><p className="mt-1 text-sm text-muted-foreground">Be among the first customers to share an experience.</p></div>
<ReviewDialog><ActionButton>Write a review</ActionButton></ReviewDialog>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-8 border-y border-border py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="flex items-center gap-5"><span className="font-display text-6xl font-semibold tabular-nums">{average.toFixed(1)}</span><div><Stars rating={average} label={`Average rating ${average.toFixed(1)} out of 5`} /><Dialog><DialogTrigger asChild><button type="button" className="mt-2 block text-sm font-semibold underline decoration-accent underline-offset-4">{reviews.length} customer {reviews.length === 1 ? "review" : "reviews"}</button></DialogTrigger><ReviewBrowser reviews={reviews} /></Dialog><p className="mt-1 text-xs text-muted-foreground">{verifiedCount} verified</p></div></div>
              <div className="space-y-2">{distribution.map((row) => <div key={row.value} className="grid grid-cols-[3rem_1fr_2rem] items-center gap-3 text-xs"><span>{row.value} star</span><span className="h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full bg-accent" style={{ width: `${reviews.length ? (row.count / reviews.length) * 100 : 0}%` }} /></span><span className="text-right tabular-nums text-muted-foreground">{row.count}</span></div>)}</div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{selected.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
            <div className="mt-8 flex flex-wrap gap-3"><ReviewDialog><ActionButton>Write a review</ActionButton></ReviewDialog><Dialog><DialogTrigger asChild><ActionButton variant="outline">Read all {reviews.length} reviews</ActionButton></DialogTrigger><ReviewBrowser reviews={reviews} /></Dialog></div>
          </>
        )}
      </Container>
    </Section>
  );
}
