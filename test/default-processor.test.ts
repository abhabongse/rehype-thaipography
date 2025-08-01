import * as assert from "node:assert";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { read } from "to-vfile";

import { defaultProcessor } from "../examples/default-processor.ts";
import { roundtripHtmlProcessor } from "./utils/processors.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const FIXTURES_BASE_PATH = path.join(__dirname, "fixtures");

test(`defaultProcessor should work correctly`, async () => {
  const inputMarkdownPath = path.join(FIXTURES_BASE_PATH, "input.md");
  const expectedHtmlPath = path.join(FIXTURES_BASE_PATH, "output.html");

  const inputMarkdown = await read(inputMarkdownPath);
  const expectedHtml = await read(expectedHtmlPath);

  const actualOutput = await defaultProcessor.process(inputMarkdown);
  const expectedOutput = await roundtripHtmlProcessor.process(expectedHtml);

  assert.strictEqual(
    String(actualOutput),
    String(expectedOutput),
    `Output from defaultProcessor does not match expected output.`,
  );
});
