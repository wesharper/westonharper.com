<script lang="ts">
  import { Button } from "$ui/button";
</script>

<div class="size-full pb-14 @md/layout:px-4 @xl/layout:px-10">
  <main
    class="relative flex size-full min-h-fit flex-col justify-between gap-4 p-4"
  >
    <div
      class="absolute inset-0 -z-10 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-gradient-to-tr from-rose-400 via-amber-400 to-rose-400 dark:from-fuchsia-600 dark:via-violet-600 dark:to-fuchsia-600"
    ></div>
    <h1
      class="max-w-6xl text-2xl leading-relaxed font-extrabold sm:text-3xl md:text-4xl lg:text-5xl"
    >
      Hi, I'm Wes. I'm a software engineer, <Button
        variant="link"
        size="link"
        href="/blog">infrequent blogger</Button
      >, and serial idea-haver.
    </h1>
    <Button
      href="mailto:hello@westonharper.com"
      variant="link"
      size="link"
      class="sm:text-lg md:text-xl">Slide into my DMs</Button
    >
  </main>
</div>

<style>
  :global(body) {
    background-color: var(--color-amber-400);
  }
  :global(.dark > body) {
    background-color: var(--color-violet-600);
  }
</style>
