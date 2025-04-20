<script lang="ts">
  import WhLogo from "$lib/components/assets/wh-logo.svelte";
  import { Header } from "$lib/components/header";
  import { Sun, Moon } from "@lucide/svelte";
  import "../app.css";
  import { ModeWatcher, toggleMode } from "mode-watcher";

  let { children } = $props();
</script>

<ModeWatcher />

<div class="@container/layout size-full px-4 pt-20 pb-10">
  <Header
    class="bg-background/30 fixed top-4 right-4 left-4 mx-auto flex h-10 items-center justify-between rounded-lg px-3 py-2"
  >
    <a
      class="hover:text-foreground/60 rounded-md p-1 transition-colors duration-100 ease-linear"
      href="/"
    >
      <WhLogo />
      <span class="sr-only">Go to home page</span>
    </a>
    <button
      onclick={toggleMode}
      class="hover:text-foreground/60 cursor-pointer rounded-md p-1 transition-colors duration-100 ease-linear"
    >
      <Sun class="hidden size-6 dark:block" />
      <Moon class="size-6 dark:hidden" />
      <span class="sr-only">Toggle theme</span>
    </button>
  </Header>
  {@render children()}
</div>
