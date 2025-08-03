/**
 * Type definitions for the {@linkcode rehypeThaipography} plugin.
 *
 * @module types
 */

import type { SpaceAdjustOptions } from "./spaceAdjust/types.ts";
import { rehypeThaipography } from "./mod.ts";

export type { SpaceAdjustOptions } from "./spaceAdjust/types.ts";

/**
 * Plugin options for the {@linkcode rehypeThaipography} plugin.
 */
export interface Options {
  /**
   * Configures the spacing that appears before the
   * [U+0E46 Thai Character Maiyamok](https://www.compart.com/en/unicode/U+0E46).
   * Set this to `false` to disable all adjustments.
   *
   * #### Default Value
   *
   * By default, the following adjustments are made:
   * ```typescript
   * {
   *   zeroSpace: "insert:\u202f",     // insert U+202F Narrow No-Break Space
   *   singleSpace: "replace:\u202f",  // replace U+0020 with U+202F
   *   multipleSpace: "deleteOne",     // remove one U+0020
   * }
   * ```
   *
   * This behavior ensures that both "ต่างๆ นานา" and "ต่าง ๆ นานา"
   * are reformatted to "ต่าง&#x202f;ๆ นานา".
   * A [U+202F Narrow No-Break Space](https://www.compart.com/en/unicode/U+202F)
   * is used to prevent an accidental line break before the Maiyamok,
   * and it provides a more modern, compact aesthetic than a full-width space.
   *
   * If multiple spaces are present, only one is removed and no characters are added.
   * For example, "ต่าง&emsp13;&emsp13;&emsp13;ๆ นานา" becomes "ต่าง&emsp13;&emsp13;ๆ นานา".
   * (*Note: In this example, `&emsp13;` was used to visualize
   * the existence of regular space characters.*)
   *
   * #### Customizations
   *
   * See {@linkcode SpaceAdjustOptions} on how to configure space adjustment behavior.
   */
  maiyamok?: SpaceAdjustOptions | false;

  /**
   * Configures the spacing between Thai Era (such as พ.ศ. and ค.ศ.)
   * and the year number (e.g. 2563, 2020).
   * Set this to `false` to disable for adjustments.
   *
   * #### Default Value
   *
   * By default, the following adjustments are made:
   * ```typescript
   * {
   *   zeroSpace: "insert:\u202f",     // insert U+202F Narrow No-Break Space
   *   singleSpace: "replace:\u202f",  // replace U+0020 with U+202F
   *   multipleSpace: "deleteOne",     // remove one U+0020
   * }
   * ```
   *
   * This behavior ensures that both "พ.ศ.2563" and "พ.ศ. 2563"
   * are reformatted to "พ.ศ.&#x202f;2563".
   * A [U+202F Narrow No-Break Space](https://www.compart.com/en/unicode/U+202F)
   * is used to prevent an accidental line break between the era and the year number,
   * and it provides a more modern, compact aesthetic than a full-width space.
   *
   * If multiple spaces are present, only one is removed and no characters are added.
   * For example, "พ.ศ.&emsp13;&emsp13;&emsp13;2563" becomes "พ.ศ.&emsp13;&emsp13;2563".
   * (*Note: In this example, `&emsp13;` was used to visualize
   * the existence of regular space characters.*)
   *
   * #### Customizations
   *
   * See {@linkcode SpaceAdjustOptions} on how to configure space adjustment behavior.
   */
  yearAndEra?: SpaceAdjustOptions | false;
}
