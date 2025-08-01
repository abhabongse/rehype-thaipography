import type * as hast from "hast";
import {
  defaultIgnore,
  findAndReplace,
  type FindAndReplaceTuple
} from "hast-util-find-and-replace";
import type * as unified from "unified";

import { Options } from "./types.ts";


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
  options = {}
) => {
  throw new Error("rehypeThaipography plugin is not yet implemented.");
  // const {
  //   maiyamok = {},
  //   yearAndEra = {}
  // } = options;
  //
  // return (tree: hast.Root) => {
  //   const ignoreNodes = ["code", "kbd", "samp", ...defaultIgnore];
  //   const rules = [
  //     ...rule(/(?<=:) /gi, replaceSpaceAfterColon),
  //     ...rule(/ (?=ๆ)/gi, replaceSpaceBeforeMaiyamok),
  //     ...rule(/(?<=[คจพมรฮ]\.ศ\.) (?=\d+)/gi, replaceSpaceBetweenYearAndEra)
  //   ];
  //   findAndReplace(tree, rules, { ignore: ignoreNodes });
  // };
};

const rule = (pattern: RegExp, replacement: string | null) => {
  if (replacement === null) {
    return [];
  }
  return [[pattern, replacement] as FindAndReplaceTuple];
};
