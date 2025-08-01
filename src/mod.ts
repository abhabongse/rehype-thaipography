import type * as hast from "hast";
import type * as unified from "unified";
import { visit, SKIP } from "unist-util-visit";

import type { Options } from "./types.ts";
import { SpaceAdjustProcessor } from "./spaceAdjust/processor.ts";
import { resolveConfig } from "./spaceAdjust/resolvers.ts";

const IGNORED_NODES = [
  "math",
  "script",
  "style",
  "svg",
  "title",
  "code",
  "kbd",
  "samp",
  "pre",
];

const MAIYAMOK_DEFAULT_VALUES = {
  zeroSpace: "insert:\u202F",
  singleSpace: "replace:\u202F",
  multipleSpace: "deleteOne",
} as const;

const YEAR_AND_ERA_DEFAULT_VALUES = {
  zeroSpace: "insert:\u202F",
  singleSpace: "replace:\u202F",
  multipleSpace: "deleteOne",
} as const;

/**
 * A {@link https://github.com/rehypejs/rehype | Rehype} plugin
 * that applies sensible Thai typographic conventions to HTML content.
 *
 * @see {@link https://jsr.io/@abhabongse/rehype-thaipography | Package Overview}
 * for a walkthrough on plugin features.
 *
 * @see {@linkcode Options} for API references on plugin options.
 */
export const rehypeThaipography: unified.Plugin<[Options?], hast.Root> = (
  options = {},
) => {
  const { maiyamok = {}, yearAndEra = {} } = options;
  const maiyamokProcessor = maiyamok
    ? new SpaceAdjustProcessor(
        /(?<! )( *)(?=ๆ)/gi,
        resolveConfig(maiyamok, MAIYAMOK_DEFAULT_VALUES),
      )
    : null;
  const yearAndEraProcessor = yearAndEra
    ? new SpaceAdjustProcessor(
        /(?<=[คจพมรฮ]\.ศ\.)( *)(?=\d+)/gi,
        resolveConfig(yearAndEra, YEAR_AND_ERA_DEFAULT_VALUES),
      )
    : null;

  return (tree: hast.Root) => {
    visit(tree, (node) => {
      if (node.type === "element" && IGNORED_NODES.includes(node.tagName)) {
        return SKIP;
      }
      if (node.type === "text" && maiyamokProcessor) {
        node.value = maiyamokProcessor.process(node.value);
      }
      if (node.type === "text" && yearAndEraProcessor) {
        node.value = yearAndEraProcessor.process(node.value);
      }
    });
  };
};
