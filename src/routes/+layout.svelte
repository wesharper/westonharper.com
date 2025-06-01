<script lang="ts">
  import WhLogo from "$lib/components/assets/wh-logo.svelte";
  import { Header } from "$lib/components/header";
  import { Sun, Moon } from "@lucide/svelte";
  import "../app.css";
  import { ModeWatcher, toggleMode } from "mode-watcher";
  import { Button } from "$ui/button";

  let { children } = $props();
</script>

<ModeWatcher />

<div class="@container/layout size-full px-4 pt-20 pb-10">
  <Header
    class="bg-background/30 fixed top-4 right-4 left-4 mx-auto flex h-10 items-center justify-between rounded-lg px-3 py-2"
  >
    <Button size="icon" variant="ghost" href="/">
      <WhLogo class="!size-7" />
      <span class="sr-only">Home</span>
    </Button>

    <div
      class="flex items-center justify-center gap-3 text-sm sm:text-base lg:text-lg"
    >
      <Button variant="link" size="link" href="/about">about</Button>

      <Button variant="link" size="link" href="/blog">blog</Button>

      <Button variant="link" size="link" href="/work">work</Button>
    </div>

    <Button onclick={toggleMode} variant="ghost" size="icon">
      <Sun class="hidden !size-6 dark:block" />
      <Moon class="!size-6 dark:hidden" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </Header>
  {@render children()}
</div>
