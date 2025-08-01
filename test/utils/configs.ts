import type { Options } from "@abhabongse/rehype-thaipography/types";

//  _   _          ___                       _   _
// | \ | | ___    / _ \ _ __   ___ _ __ __ _| |_(_) ___  _ __
// |  \| |/ _ \  | | | | '_ \ / _ \ '__/ _` | __| |/ _ \| '_ \
// | |\  | (_) | | |_| | |_) |  __/ | | (_| | |_| | (_) | | | |
// |_| \_|\___/   \___/| .__/ \___|_|  \__,_|\__|_|\___/|_| |_|
//                     |_|

const fullNoop: Options[] = [
  {
    maiyamok: false,
    yearAndEra: false,
  },
  {
    maiyamok: {
      zeroSpace: "noop",
      singleSpace: { action: "noop" },
      multipleSpace: "noop",
    },
    yearAndEra: {
      zeroSpace: { action: "noop" },
      singleSpace: { action: "noop" },
      multipleSpace: "noop",
    },
  },
  {
    maiyamok: {
      zeroSpace: "noop",
      singleSpace: "noop",
      multipleSpace: { action: "noop" },
    },
    yearAndEra: {
      zeroSpace: { action: "noop" },
      singleSpace: "noop",
      multipleSpace: "noop",
    },
  },
];

const maiyamokNoop: Options[] = [
  {
    maiyamok: false,
  },
  {
    maiyamok: {
      zeroSpace: "noop",
      singleSpace: { action: "noop" },
      multipleSpace: "noop",
    },
    yearAndEra: {},
  },
  {
    maiyamok: {
      zeroSpace: "noop",
      singleSpace: "noop",
      multipleSpace: { action: "noop" },
    },
    yearAndEra: {
      zeroSpace: "insert:\u202f",
      singleSpace: "replace:\u202f",
      multipleSpace: "deleteOne",
    },
  },
];

const yearAndEraNoop: Options[] = [
  {
    yearAndEra: false,
  },
  {
    maiyamok: {},
    yearAndEra: {
      zeroSpace: { action: "noop" },
      singleSpace: "noop",
      multipleSpace: "noop",
    },
  },
  {
    maiyamok: {
      zeroSpace: "insert:\u202f",
      singleSpace: "replace:\u202f",
      multipleSpace: "deleteOne",
    },
    yearAndEra: {
      zeroSpace: { action: "noop" },
      singleSpace: { action: "noop" },
      multipleSpace: "noop",
    },
  },
];

//  ____            _         ___                       _   _
// | __ )  __ _ ___(_) ___   / _ \ _ __   ___ _ __ __ _| |_(_) ___  _ __
// |  _ \ / _` / __| |/ __| | | | | '_ \ / _ \ '__/ _` | __| |/ _ \| '_ \
// | |_) | (_| \__ \ | (__  | |_| | |_) |  __/ | | (_| | |_| | (_) | | | |
// |____/ \__,_|___/_|\___|  \___/| .__/ \___|_|  \__,_|\__|_|\___/|_| |_|
//                                |_|

const deletion: Options[] = [
  {
    maiyamok: {
      zeroSpace: "noop",
      singleSpace: "delete",
      multipleSpace: { action: "deleteOne" },
    },
    yearAndEra: {
      zeroSpace: "insert:",
      singleSpace: "noop",
      multipleSpace: "deleteAll",
    },
  },
  {
    maiyamok: {
      zeroSpace: "insert:",
      singleSpace: { action: "delete" },
      multipleSpace: "deleteOne",
    },
    yearAndEra: {
      zeroSpace: "noop",
      singleSpace: { action: "noop" },
      multipleSpace: { action: "deleteAll" },
    },
  },
];

const insertion: Options[] = [
  {
    maiyamok: {
      zeroSpace: "insert:*",
      singleSpace: "insertStart::",
      multipleSpace: { action: "noop" },
    },
    yearAndEra: {
      zeroSpace: "insert:||",
      singleSpace: { action: "insertStart", char: "@" },
      multipleSpace: "insertEnd:+",
    },
  },
  {
    maiyamok: {
      zeroSpace: { action: "insert", char: "*" },
      singleSpace: { action: "insertStart", char: ":" },
      multipleSpace: "insertEnd:",
    },
    yearAndEra: {
      zeroSpace: { action: "insert", char: "||" },
      singleSpace: "insertStart:@",
      multipleSpace: { action: "insertEnd", char: "+" },
    },
  },
];

const replacement: Options[] = [
  {
    maiyamok: {
      zeroSpace: "insert:-",
      singleSpace: "replace:+",
      multipleSpace: "replaceFirst:=",
    },
    yearAndEra: {
      zeroSpace: "insert:|",
      singleSpace: "replace:~",
      multipleSpace: "replaceLast:&",
    },
  },
  {
    maiyamok: {
      zeroSpace: { action: "insert", char: "-" },
      singleSpace: { action: "replace", char: "+" },
      multipleSpace: { action: "replaceFirst", char: "=" },
    },
    yearAndEra: {
      zeroSpace: { action: "insert", char: "|" },
      singleSpace: { action: "replace", char: "~" },
      multipleSpace: { action: "replaceLast", char: "&" },
    },
  },
];

//  __  __ _              _    ___                       _   _
// |  \/  (_)_  _____  __| |  / _ \ _ __   ___ _ __ __ _| |_(_) ___  _ __
// | |\/| | \ \/ / _ \/ _` | | | | | '_ \ / _ \ '__/ _` | __| |/ _ \| '_ \
// | |  | | |>  <  __/ (_| | | |_| | |_) |  __/ | | (_| | |_| | (_) | | | |
// |_|  |_|_/_/\_\___|\__,_|  \___/| .__/ \___|_|  \__,_|\__|_|\___/|_| |_|
//                                 |_|

const mixed: Options[] = [
  {
    maiyamok: {
      zeroSpace: "insert:\u2004",
      singleSpace: "replace:\u2005",
      multipleSpace: "deleteOne",
    },
    yearAndEra: {
      zeroSpace: "noop",
      singleSpace: "insertStart:\u200a\u2060",
      multipleSpace: "replaceAll:\u2009\u2060",
    },
  },
  {
    maiyamok: {
      zeroSpace: { action: "insert", char: "\u2004" },
      singleSpace: { action: "replace", char: "\u2005" },
      multipleSpace: { action: "deleteOne" },
    },
    yearAndEra: {
      zeroSpace: { action: "noop" },
      singleSpace: { action: "insertStart", char: "\u200a\u2060" },
      multipleSpace: { action: "replaceAll", char: "\u2009\u2060" },
    },
  },
];

//   ____                _     _                _
//  / ___|___  _ __ ___ | |__ (_)_ __   ___  __| |
// | |   / _ \| '_ ` _ \| '_ \| | '_ \ / _ \/ _` |
// | |__| (_) | | | | | | |_) | | | | |  __/ (_| |
//  \____\___/|_| |_| |_|_.__/|_|_| |_|\___|\__,_|
//

export const configs: Record<string, Options[]> = {
  fullNoop,
  maiyamokNoop,
  yearAndEraNoop,
  deletion,
  insertion,
  replacement,
  mixed,
};
