<script lang="ts">
  let { data } = $props();
  let { posts } = $derived(data);
</script>

<section>
  <ul>
    {#each posts as post (post.slug)}
      <li>
        <a href={post.slug} class="title">{post.title}</a>
        <p class="date">{post.date}</p>
        <p class="description">{post.description}</p>
      </li>
    {/each}
  </ul>
</section>
