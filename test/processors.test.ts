import * as assert from "node:assert";
import { test } from "node:test";

import { rehypeThaipography } from "@abhabongse/rehype-thaipography";
import type { Options } from "@abhabongse/rehype-thaipography/types";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { configs } from "./utils/configs.ts";
import { getTestScenarios, type TestScenario } from "./utils/fixture.ts";
import { roundtripHtmlProcessor } from "./utils/processors.ts";

const scenarios = (await getTestScenarios()) || [];
if (scenarios.length === 0) {
  console.warn("Cannot find test cases.");
  process.exit(1);
}

for (const scenario of scenarios) {
  for (const [index, config] of configs[scenario.processor].entries()) {
    test(`processor "${scenario.processor}#${index}" should work correctly`, async () => {
      const processor = buildProcessor(config);

      const actualOutput = processor
        .processSync(scenario.inputMarkdown)
        .toString();
      const expectedOutput = roundtripHtmlProcessor
        .processSync(scenario.expectedHtml)
        .toString();

      assert.strictEqual(
        actualOutput,
        expectedOutput,
        `Output from "${scenario.processor}" processor does not match expected output.`,
      );
    });
  }
}

function buildProcessor(config: Options) {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeThaipography, config)
    .use(rehypeStringify);
}
