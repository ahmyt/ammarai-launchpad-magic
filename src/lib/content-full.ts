import { queryOptions, type QueryClient } from "@tanstack/react-query";
import type { Tool } from "@/data/types";
import { tools as staticTools } from "@/data/tools";
import { useCases as staticUseCases } from "@/data/use-cases";
import { features as staticFeatures } from "@/data/features";
import { posts as staticPosts } from "@/data/posts";
import { pages as staticPages } from "@/data/pages";
import {
  fetchContentRows,
  mergeContent,
  mergeKind,
  siteContentRowsQuery,
  type ContentKind,
  type ContentRow,
  type SiteContent,
} from "@/lib/content";

/**
 * Full tool records (with every section) merged with CMS edits. Only tool
 * pages, the studio and feeds import this, so the homepage stays light.
 */
export type FullSiteContent = Omit<SiteContent, "tools"> & { tools: Tool[] };

export function mergeFullContent(rows: ContentRow[]): FullSiteContent {
  return { ...mergeContent(rows), tools: mergeKind(staticTools, rows, "tool") };
}

export async function getFullSiteContent(queryClient: QueryClient): Promise<FullSiteContent> {
  const rows = await queryClient.ensureQueryData(siteContentRowsQuery);
  return mergeFullContent(rows);
}

export async function loadFullSiteContent(): Promise<FullSiteContent> {
  return mergeFullContent(await fetchContentRows());
}

export const fullSiteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: fetchContentRows,
  select: (rows: ContentRow[]) => mergeFullContent(rows),
  staleTime: 30_000,
});

export function staticItems(kind: ContentKind): Record<string, unknown>[] {
  switch (kind) {
    case "tool":
      return staticTools as unknown as Record<string, unknown>[];
    case "use_case":
      return staticUseCases as unknown as Record<string, unknown>[];
    case "feature":
      return staticFeatures as unknown as Record<string, unknown>[];
    case "post":
      return staticPosts as unknown as Record<string, unknown>[];
    case "page":
      return staticPages as unknown as Record<string, unknown>[];
  }
}
