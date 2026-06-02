import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { fetchPostBySlug } from "@/lib/blog";
import { PostBody } from "@/components/blog/PostBody";

export const Route = createFileRoute("/blog/$slug")({
  component: PostPage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-[var(--brand-orange)] hover:underline">
          ← Back to blog
        </Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-destructive">Couldn't load this post: {error.message}</p>
      </div>
    </Layout>
  ),
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 py-20 text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  if (!post || !post.published) throw notFound();

  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to blog
        </Link>

        {post.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-[var(--brand-orange)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--brand-orange)]">
                {t}
              </span>
            ))}
          </div>
        )}

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        {post.published_at && (
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 aspect-video w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-8">
          <PostBody>{post.body}</PostBody>
        </div>
      </article>
    </Layout>
  );
}
