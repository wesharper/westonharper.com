import { error } from "@sveltejs/kit";

export async function load({ parent, params }) {
  const { posts } = await parent();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    error(404);
  }
  return {
    post,
  };
}
