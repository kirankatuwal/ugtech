import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { fetchPublishedPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — UG Technology Store" },
      { name: "description", content: "Latest installations, new devices, and news from UG Technology Store." },
      { property: "og:title", content: "Blog — UG Technology Store" },
      { property: "og:description", content: "Installations, new devices, and news." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: fetchPublishedPosts,
  });

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-2 text-muted-foreground">Installations, new devices, and updates.</p>
        </header>

        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive">Couldn't load posts.</p>}
        {posts && posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-lg"
            >
              {p.cover_image_url ? (
                <img src={p.cover_image_url} alt={p.title} className="aspect-video w-full object-cover" />
              ) : (
                <div className="aspect-video w-full bg-muted" />
              )}
              <div className="p-4">
                {p.tags?.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-[var(--brand-orange)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--brand-orange)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-lg font-semibold text-foreground group-hover:text-[var(--brand-orange)]">
                  {p.title}
                </h2>
                {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
                {p.published_at && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(p.published_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
