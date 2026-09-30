/**
 * Blog seed content.
 *
 * Each post lives in its own file under `posts/` because they are long. The
 * markup helpers they use live in `blocks.ts`.
 *
 * Between them the posts use every control the toolbar offers: headings, all
 * the inline marks, colour, highlight, sub/superscript, alignment, the three
 * list types, quotes, rules, code blocks, tables, resizable images (plain and
 * captioned) and a YouTube embed.
 */

import type { BlogSeed } from "./blocks";
import { accessibilityPlaybook } from "./posts/accessibility-playbook";
import { choosingACms } from "./posts/choosing-a-cms";
import { designSystemSecondYear } from "./posts/design-system-second-year";
import { projectProcess } from "./posts/project-process";
import { websitePerformanceGuide } from "./posts/website-performance-guide";

export type { BlogSeed } from "./blocks";

export const BLOG_SEEDS: BlogSeed[] = [
  websitePerformanceGuide,
  designSystemSecondYear,
  choosingACms,
  accessibilityPlaybook,
  projectProcess,
];
