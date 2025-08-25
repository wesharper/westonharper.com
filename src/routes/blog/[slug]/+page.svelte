<script lang="ts">
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { post } = $derived(data);
</script>

{JSON.stringify(post)}
