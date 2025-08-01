import { type SpaceAdjustOptions, splitActionAndChar } from "./types.ts";

export interface SpaceAdjustConfig {
  zero: ZeroSpaceConfig;
  single: SingleSpaceConfig;
  multiple: MultipleSpaceConfig;
}

interface ZeroSpaceConfig {
  action: "insert";
  char: string;
}

interface SingleSpaceConfig {
  action: "replace" | "insertStart" | "insertEnd";
  char: string;
}

interface MultipleSpaceConfig {
  action:
    | "replaceFirst"
    | "replaceLast"
    | "replaceAll"
    | "insertStart"
    | "insertEnd";
  char: string;
}

export function resolveConfig(
  options: SpaceAdjustOptions,
  defaultValues: Required<SpaceAdjustOptions>,
) {
  let {
    zeroSpace = defaultValues.zeroSpace,
    singleSpace = defaultValues.singleSpace,
    multipleSpace = defaultValues.multipleSpace,
  } = options;
  return {
    zero: resolveZeroSpaceConfig(zeroSpace),
    single: resolveSingleSpaceConfig(singleSpace),
    multiple: resolveMultipleSpaceConfig(multipleSpace),
  };
}

function resolveZeroSpaceConfig(
  config: Exclude<SpaceAdjustOptions["zeroSpace"], undefined>,
): ZeroSpaceConfig {
  if (typeof config === "string") {
    const [action, char] = splitActionAndChar(config);
    if (action === "noop" && char === null) {
      return { action: "insert", char: "" };
    } else if (action == "insert" && char !== null) {
      return { action: "insert", char };
    }
  } else {
    if (config.action === "noop") {
      return { action: "insert", char: "" };
    } else {
      return config;
    }
  }
  throw new Error(`Unknown zeroSpace option: ${config}`);
}

function resolveSingleSpaceConfig(
  config: Exclude<SpaceAdjustOptions["singleSpace"], undefined>,
): SingleSpaceConfig {
  if (typeof config === "string") {
    const [action, char] = splitActionAndChar(config);
    if (action === "noop" && char === null) {
      return { action: "insertEnd", char: "" };
    } else if (action === "delete" && char === null) {
      return { action: "replace", char: "" };
    } else if (
      (action === "replace" ||
        action === "insertStart" ||
        action === "insertEnd") &&
      char !== null
    ) {
      return { action, char };
    }
  } else {
    if (config.action === "noop") {
      return { action: "insertEnd", char: "" };
    } else if (config.action === "delete") {
      return { action: "replace", char: "" };
    } else {
      return config;
    }
  }
  throw new Error(`Unknown zeroSpace option: ${config}`);
}

function resolveMultipleSpaceConfig(
  config: Exclude<SpaceAdjustOptions["multipleSpace"], undefined>,
): MultipleSpaceConfig {
  if (typeof config === "string") {
    const [action, char] = splitActionAndChar(config);
    if (action === "noop" && char === null) {
      return { action: "insertEnd", char: "" };
    } else if (action === "deleteOne" && char === null) {
      return { action: "replaceLast", char: "" };
    } else if (action === "deleteAll" && char === null) {
      return { action: "replaceAll", char: "" };
    } else if (
      (action === "replaceFirst" ||
        action === "replaceLast" ||
        action === "replaceAll" ||
        action === "insertStart" ||
        action === "insertEnd") &&
      char !== null
    ) {
      return { action, char };
    }
  } else {
    if (config.action === "noop") {
      return { action: "insertEnd", char: "" };
    } else if (config.action === "deleteOne") {
      return { action: "replaceLast", char: "" };
    } else if (config.action === "deleteAll") {
      return { action: "replaceAll", char: "" };
    } else {
      return config;
    }
  }
  throw new Error(`Unknown multipleSpace option: ${config}`);
}
