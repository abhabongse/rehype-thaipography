/**
 * Controls how to adjust zero or more spaces at a certain location.
 *
 * Specifically, it first looks for zero or more
 * [U+0020 spaces](https://www.compart.com/en/unicode/U+0020)
 * at a certain location
 * such as before Maiyamok or between the Era and the year number.
 * Then, some (or all) of these spaces may get removed,
 * and some certain characters may get inserted.
 *
 * **Note:**
 *
 * - `noop` actions are equivalent to `insert` with empty character additions.
 * - `delete` actions are equivalent to `replace` with empty character replacements.
 * - Whenever the documentation below mentions a _character_,
 *   it can actually be a string of arbitrary length.
 * - The value for each suboption below can be provided in the form of an object
 *   as well as string shorthand.
 */
export interface SpaceAdjustOptions {
  /**
   * Controls behavior when there isn’t any U+0020 space at a certain location.
   * The value for this option can be provided in the form of an object
   * as well as shorthand string.
   *
   * - `noop`: No change.
   * - `insert:char`: Inserts the specified `char` at the certain location
   */
  zeroSpace?:
    | { action: "noop" }
    | "noop"
    | { action: "insert"; char: string }
    | `insert:${string}`;

  /**
   * Controls behavior when exactly a single U+0020 space exists at a certain location.
   *
   * - `noop`: No change.
   * - `delete`: Removes the space.
   * - `replace:char`: Replaces the space with the specified `char`.
   * - `insertStart:char`: Inserts the specified `char` before the space.
   * - `insertEnd:char`: Inserts the specified `char` after the space.
   */
  singleSpace?:
    | { action: "noop" }
    | "noop"
    | { action: "delete" }
    | "delete"
    | { action: "replace"; char: string }
    | `replace:${string}`
    | { action: "insertStart"; char: string }
    | `insertStart:${string}`
    | { action: "insertEnd"; char: string }
    | `insertEnd:${string}`;

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
  multipleSpace?:
    | { action: "noop" }
    | "noop"
    | { action: "deleteOne" }
    | "deleteOne"
    | { action: "deleteAll" }
    | "deleteAll"
    | { action: "replaceFirst"; char: string }
    | `replaceFirst:${string}`
    | { action: "replaceLast"; char: string }
    | `replaceLast:${string}`
    | { action: "replaceAll"; char: string }
    | `replaceAll:${string}`
    | { action: "insertStart"; char: string }
    | `insertStart:${string}`
    | { action: "insertEnd"; char: string }
    | `insertEnd:${string}`;
}

export function splitActionAndChar(s: string): [string, string | null] {
  const colonIndex = s.indexOf(":");

  if (colonIndex === -1) {
    return [s, null];
  } else {
    return [s.substring(0, colonIndex), s.substring(colonIndex + 1)];
  }
}
