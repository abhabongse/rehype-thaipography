import { rehypeThaipography } from "./mod.ts";

type NonEmpty<T extends string> = T extends "" ? never : T;
type NonEmptyString = Exclude<string, "">;

const empty = "";
const x: NonEmpty<string> = empty;

/**
 * Plugin options for the {@linkcode rehypeThaipography} plugin.
 *
 * @see {@linkcode SpaceAdjustOptions} on how to configure space adjustment behavior.
 */
export interface Options {
  /**
   * Configures adjustment of [U+0020 spaces](https://www.compart.com/en/unicode/U+0020) before
   * [U+0E46 Thai Character Maiyamok](https://www.compart.com/en/unicode/U+0E46).
   * Set this to `false` to disable (same as `"noop"` for all suboptions).
   *
   * ### Default Value
   *
   * Here are the default values for this option:
   * ```typescript
   * {
   *   zeroSpace: "insert:&#x202f;",     // insert U+202F Narrow No-Break Space
   *   singleSpace: "replace:&#x202f;",  // replace U+0020 with U+202F
   *   multipleSpace: "deleteOne",       // remove one U+0020
   * }
   * ```
   *
   * With these defaults, both "ต่างๆ นานา" and "ต่าง ๆ นานา"
   * becomes "ต่าง&#x202f;ๆ นานา".
   * The choice of [U+202F Narrow No-Break Space](https://www.compart.com/en/unicode/U+202F)
   * makes sense, as it prevents accidental line break before the Maiyamok
   * and is less wide than a full-width space, offering a more modern aesthetic.
   *
   * In the case of multiple spaces being used, U+202F will not be added.
   * For example, "ต่าง&emsp13;&emsp13;&emsp13;ๆ นานา" becomes "ต่าง&emsp13;&emsp13;ๆ นานา".
   * Of course, you can modify this behavior via the `multipleSpace` suboption.
   *
   * _Note: In the last above example, `&emsp13;` was used instead of regular space
   * for illustrative purpose only._
   */
  maiyamok?: SpaceAdjustOptions | false;

  /**
   * Options to configure how to space between Thai Era (such as พ.ศ. and ค.ศ.)
   * and the year number (e.g. 2563, 2020).
   * Set this to `false` to disable (same as `"noop"` for all suboptions).
   * 
   * ### Default Value
   *
   * Here are the default values for this option:
   * ```typescript
   * {
   *   zeroSpace: "insert:&#x202f;",     // insert U+202F Narrow No-Break Space
   *   singleSpace: "replace:&#x202f;",  // replace U+0020 with U+202F
   *   multipleSpace: "deleteOne",       // remove one U+0020
   * }
   * ```
   *
   * With these defaults, both "พ.ศ.2563" and "พ.ศ. 2563"
   * becomes "พ.ศ.&#x202f;2563".
   * The choice of [U+202F Narrow No-Break Space](https://www.compart.com/en/unicode/U+202F)
   * makes sense, as it prevents accidental line break between the Era and the year number
   * and is less wide than a full-width space, offering a more modern aesthetic.
   *
   * In the case of multiple spaces being used, U+202F will not be added.
   * For example, "พ.ศ.&emsp13;&emsp13;&emsp13;2563" becomes "พ.ศ.&emsp13;&emsp13;2563".
   * Of course, you can modify this behavior via the `multipleSpace` suboption.
   *
   * _Note: In the last above example, `&emsp13;` was used instead of regular space
   * for illustrative purpose only._
   */
  yearAndEra?: SpaceAdjustOptions | false;
}

/**
 * Controls how to adjust zero or more spaces at a certain location.
 *
 * > [!NOTE]
 * > Generally speaking,
 * > - `noop` is equivalent to `insert*:` with no character.
 * > - `delete` is equivalent to `replace*:` with no character.
 * >
 * > Also, whenever the documentation mentions a _character_,
 * > it can actually be a string of arbitrary length.
 */
export interface SpaceAdjustOptions {
  /**
   * Controls behavior when there is no U+0020 space at a certain location.
   *
   * - `noop`: No change.
   * - `insert:char`: Inserts the specified `char` at the certain location
   */
  zeroSpace?: "noop" | `insert:${string}`;

  /**
   * Controls behavior when exactly a single U+0020 space exists at a certain location.
   *
   * - `noop`: No change.
   * - `delete`: Removes the space.
   * - `replace:char`: Replaces the space with the specified `char`.
   * - `insertStart:char`: Inserts the specified `char` before the space.
   * - `insertEnd:char`: Inserts the specified `char` after the space.
   */
  singleSpace?: "noop" | "delete" | `replace:${string}` | `insertStart:${string}` | `insertEnd:${string}`;

  /**
   * Controls behavior when multiple U+0020 spaces exist at a certain location.
   *
   * - `noop`: No change.
   * - `deleteOne`: Removes one space.
   * - `deleteAll`: Removes all spaces.
   * - `replaceFirst:char`: Replaces the first space with the specified `char`.
   * - `replaceLast:char`: Replaces the last space with the specified `char`.
   * - `replaceAll:char`: Replaces all spaces with the specified `char`.
   * - `insertStart:char`: Inserts the specified `char` before the space.
   * - `insertEnd:char`: Inserts the specified `char` after the space.
   */
  multipleSpace?: "noop" | "deleteOne" | "deleteAll" | `replaceFirst:${string}` | `replaceLast:${string}` | `replaceAll:${string}` | `insertStart:${string}` | `insertEnd:${string}`;
}
