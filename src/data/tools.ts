import type { Tool } from "./types";
import { coreToolsA } from "./tools-core-a";
import { coreToolsB } from "./tools-core-b";
import { seoAnalyzerTools } from "./tools-seo-analyzer";
import { chatbotTools } from "./tools-chatbots";
import { platformTools } from "./tools-platform";
import { agentTools } from "./tools-agents";
import { engagementTools } from "./tools-engagement";
import { visualTools } from "./tools-visual";
import { videoTools } from "./tools-video";
import { chatWorkspaceTools } from "./tools-chat";
import { blogTemplateTools } from "./tools-templates-blog";
import { ecommerceTemplateTools } from "./tools-templates-ecommerce";
import { socialTemplateTools } from "./tools-templates-social";
import { websiteTemplateTools } from "./tools-templates-website";
import { advertisingTemplateTools } from "./tools-templates-advertising";
import { businessTemplateTools } from "./tools-templates-business";
import { academicTemplateTools } from "./tools-templates-academic";
import { commsTemplateTools } from "./tools-templates-comms";
import { lifestyleTemplateTools } from "./tools-templates-lifestyle";
import { writerTemplateTools } from "./tools-templates-writer";
import { marketplaceTools } from "./tools-marketplace";

export const tools: Tool[] = [
  ...agentTools,
  ...marketplaceTools,
  ...chatWorkspaceTools,
  ...engagementTools,
  ...visualTools,
  ...videoTools,
  ...coreToolsA,
  ...coreToolsB,
  ...seoAnalyzerTools,
  ...platformTools,
  ...chatbotTools,
  ...blogTemplateTools,
  ...ecommerceTemplateTools,
  ...socialTemplateTools,
  ...websiteTemplateTools,
  ...advertisingTemplateTools,
  ...businessTemplateTools,
  ...academicTemplateTools,
  ...commsTemplateTools,
  ...lifestyleTemplateTools,
  ...writerTemplateTools,
];

export const TOOL_COUNT = tools.length;
export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export {
  categoryOrder,
  usedCategories,
  toolsByCategory,
  featuredTools,
  popularTools,
  recentTools,
  suggestTools,
  toolSummaries,
  toolSummaryBySlug,
} from "./tools-lite";
