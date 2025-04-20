<script lang="ts">
  import { cn } from "$lib/utils";
  import type { SvelteHTMLElements } from "svelte/elements";

  const {
    class: className,
    children,
    ...restProps
  }: SvelteHTMLElements["header"] = $props();
</script>

<header class={cn("", className)} {...restProps}>
  {@render children?.()}
</header>
