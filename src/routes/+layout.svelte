<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<ModeWatcher />

<div class="h-dvh">
  <div class="size-full">
    {@render children()}
  </div>
</div>
