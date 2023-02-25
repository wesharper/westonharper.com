---
title: "Rebuilding my personal website with Astro"
description: "I just finished rebuilding my personal website with Astro. The experience was a breeze and it's starting to feel like I might be becoming an Astro fanboy for the long-haul."
pubDate: "Feb 24 2023"
---

I heard about Astro via [Fireship's YouTube channel](https://www.youtube.com/@Fireship) and I was skeptical at first. No one needs yet another JS meta-framework. But after using it for a few content-heavy sites I can attest that this thing is the real deal. Integrating with modern tools like Tailwind or Svelte is trivial, Typescript is supported out of the box, and the overall developer experience is a breeze. Plus, I get to write my blog in markdown, which is a huge plus for me.

### A Few Highlights

#### Framework Agnostic Performance

Astro doesn't have the overhead of a JS runtime and its component islands architecture makes any pages with JS components super snappy. Not to mention, you get full control over how the JS components are hydrated into the page. Plus, Basically any modern, component-based JS framework has a first-party integration with Astro.

You can build interactive components in Svelte or React but glean all the rendering performance benefits of a fully static MPA with limited JS.

#### Meta-framework Conveniences

Meta-frameworks are great because they make config and deployment easy. A CLI installation command and a few lines in a config file and you're all set up, batteries included. Here's my site config that configures MDX, Tailwind, and Prefetch:

```javascript
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), tailwind(), prefetch()],
});
```

Plus, I can validate all of my blog pages' frontmatter using Zod and grab all of it as typesafe data in Astro components. Here's a snippet from my blog index page:

```jsx
{
  posts.map((post) => (
    <li>
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="text-xs">
          <FormattedDate date={post.data.pubDate} />
        </div>
        <div class="group relative">
          <h3 class="mt-3 text-lg font-bold leading-6">
            <a href={`/blog/${post.slug}/`}>
              <span class="absolute inset-0" />
              {post.data.title}
            </a>
          </h3>
        </div>
        <p class="line-clamp-3 mt-5 text-sm leading-6 dark:text-slate-400">
          {post.data.description}
        </p>
      </article>
    </li>
  ));
}
```

Add on the tried and true meta-framework benefit of file-based routing and we get an experience where dynamically rendering all of the blog posts at `/blog` is as easy as it would be in SvelteKit or NextJS, but with the performance overhead of a fully-static HTML site.

### Conclusion

Honestly, Astro is a no-brainer for me at this point. It has the perfect balance of customization, performance, and developer experience. This is my second Astro-powered site and I'm confident there will be more. In fact, I'm looking forward to rebuilding [like-now.app](https://like-now.app) in Astro very soon!
