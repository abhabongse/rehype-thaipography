# Thai Typography for Rehype

[![JSR][jsr:package/badge]][jsr:package/overview]

A [rehype][] plugin to apply sensible Thai typographic conventions to HTML content.
Enhance readability and visual appeal of Thai texts on the web.


## What is this?

This [unified][] ([rehype][]) plugin applies Thai typographic conventions
to improve the readability and visual appeal of text content.
It automatically handles things like space adjustments and character substitutions.

For example, the [Maiyamok Spacing](#maiyamok-spacing) rule
adjusts the space before the Maiyamok character
to align with both official government guidelines and modern typographic practices.
Similarly, the [Spacing Between the Year and Era](#year-and-era-spacing) rule
applies a similar logic to a different context.

For a full list of rules and customization options,
see the [Typographic Rules](#typographic-rules) section.


## When should I use this?

This plugin is for anyone who wants to ensure that their web content
is consistently and beautifully formatted without manual effort.
While the subtle changes it makes may not be consciously noticed by most readers,
they contribute to a more professional and visually pleasing reading experience.


## Example Usage

Suppose that you have the following HTML content:

```html
<p>เมื่อปี พ.ศ.2563 มีเหตุการณ์เกิดขึ้นต่างๆ มากมาย</p>
```

With the plugin in the Rehype pipeline, the HTML output is the following
(`&#x202f;` is substituted for `\u202f` for illustrative purpose):

```html
<p>เมื่อปี พ.ศ.&#x202f;2563 มีเหตุการณ์เกิดขึ้นต่าง&#x202f;ๆ มากมาย</p>
```


## Installation

Head over to the [package home page on JSR][jsr:package/overview]
on how to install the plugin package.

```sh
# Install with npm 
npx jsr add @abhabongse/rehype-thaipography

# Install with pnpm 10.9+
pnpm i jsr:@abhabongse/rehype-thaipography

# Install with pnpm (older versions)
pnpm dlx jsr add @abhabongse/rehype-thaipography

# Install with yarn 4.9+
yarn add jsr:@abhabongse/rehype-thaipography

# Install with yarn (older versions)
yarn dlx jsr add @abhabongse/rehype-thaipography

# Install with deno
deno add jsr:@abhabongse/rehype-thaipography

# Install with bun
bunx jsr add @abhabongse/rehype-thaipography
```

To use the plugin in your pipeline,
consult the relevant documentation with the keyword [rehype][].

- [Astro](https://docs.astro.build/en/guides/markdown-content/#adding-remark-and-rehype-plugins)
- [MDX](https://mdxjs.com/docs/extending-mdx/#using-plugins)
- [Next.js](https://nextjs.org/docs/app/guides/mdx#remark-and-rehype-plugins)
- [Nuxt Content](https://content.nuxt.com/docs/getting-started/configuration#rehypeplugins)


## Typographic Rules

### Maiyamok Spacing

Governmental guidelines for Thai official documents
require a [U+0020 space](https://www.compart.com/en/unicode/U+0020)
around the [U+0E46 Thai Character Maiyamok (ๆ)](https://www.compart.com/en/unicode/U+0E46).
This restriction is both unpopular (due to the required manual labor)
and is considered a poor typographic practice.
Not only that the introduction of space may create awkward line breaks
that disrupt the flow and comprehension of the text,
its full-width also dissociates the semantics of Maiyamok away from the preceding text.

This rule solves the above issue by automatically applying space character of
varying widths as provided by the Unicode standard.
By default, it uses [U+202F Narrow No-Break Space](https://www.compart.com/en/unicode/U+202F)
as a good middle ground solution because:

1. It appeals to the official guideline by retaining the usage of some spaces.
2. It prevents accidental line breaks in responsive web content.
3. It is smaller than the full-width space.

For more details and customization options,
see [API reference on Maiyamok][docs:option/maiyamok].

### Year and Era Spacing

This typographic rule is similar to [Maiyamok Spacing](#maiyamok-spacing) rule,
but considers the space between the year and the era such as "พ.ศ. 2563" and "ค.ศ. 2020".

For more details and customization options,
see [API reference on Year and Era][docs:option/yearAndEra].

### Not Yet Implemented Rules

This plugin does *not* yet support the following typographic rules.
Please put in a request in a [discussion thread][github:package/discussion],
or wait until when I need it (like the saying *à Pâques ou à la Trinité*).

- Space between prefix (including titles or honorifics) and the entity name, including:
  - Normal individual: "นาย", "นาง", "นางสาว", "ด.ช.", "ด.ญ."
  - Decorated titles: "ร.ต.อ.", "ร.ศ.", "ดร.", "พญ."
  - Companies and partnerships: "บจก.", "หจก.", "บมจ.", "บลจ."
  - Legislations: "พ.ร.บ.", "พ.ร.ก.", "พ.ร.ฎ."
- Character cluster substitution such as:
  - "แ" from "เ" + "เ"
  - "อำ" from "อํ" + "า"
  - "ฤๅ" from "ฤ" + "า"


## API Reference

Head over to the [JSR package documentation][jsr:package/api-reference] for the full API documentation.


## Help, Support, and Contribute

If you are a user of this package, I would like to hear from you!
I also welcome suggestions on new typographic rules
that you think should be added to this plugin.
[Create a discussion thread][github:package/discussion]
or send me a direct message if you have feedback or suggestions.


## License

[Apache-2.0](./LICENSE) © Abhabongse Janthong

<!-- Definitions -->

[docs:option/maiyamok]: https://jsr.io/@abhabongse/rehype-thaipography/doc/types/~/Options#property_maiyamok

[docs:option/yearAndEra]: https://jsr.io/@abhabongse/rehype-thaipography/doc/types/~/Options#property_yearandera

[docs:options]: https://jsr.io/@abhabongse/rehype-thaipography/doc/types/~/Options

[github:package/discussion]: https://github.com/abhabongse/rehype-thaipography/discussions

[jsr:package/api-reference]: https://jsr.io/@abhabongse/rehype-thaipography/doc

[jsr:package/badge]: https://jsr.io/badges/@abhabongse/rehype-thaipography

[jsr:package/overview]: https://jsr.io/@abhabongse/rehype-thaipography

[rehype]: https://github.com/rehypejs/rehype

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[unified]: https://github.com/unifiedjs/unified
