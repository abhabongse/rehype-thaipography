import type { SpaceAdjustConfig } from "./resolvers.ts";

export class SpaceAdjustProcessor {
  readonly regex: RegExp;
  readonly config: SpaceAdjustConfig;

  constructor(regex: RegExp, config: SpaceAdjustConfig) {
    this.regex = regex;
    this.config = config;
  }

  process(s: string): string {
    return s.replace(this.regex, (_: string, spaces: string): string => {
      const spacesCount = spaces.length;
      if (spacesCount === 0) {
        if (this.config.zero.action === "insert") {
          return this.config.zero.char;
        }
      } else if (spacesCount === 1) {
        if (this.config.single.action === "replace") {
          return this.config.single.char;
        } else if (this.config.single.action === "insertStart") {
          return this.config.single.char + " ";
        } else {
          return " " + this.config.single.char;
        }
      } else {
        if (this.config.multiple.action === "replaceFirst") {
          return this.config.multiple.char + " ".repeat(spacesCount - 1);
        } else if (this.config.multiple.action === "replaceLast") {
          return " ".repeat(spacesCount - 1) + this.config.multiple.char;
        } else if (this.config.multiple.action === "replaceAll") {
          return this.config.multiple.char;
        } else if (this.config.multiple.action === "insertStart") {
          return this.config.multiple.char + " ".repeat(spacesCount);
        } else {
          return " ".repeat(spacesCount) + this.config.multiple.char;
        }
      }
      throw new Error("Something went wrong.");
    });
  }
}
