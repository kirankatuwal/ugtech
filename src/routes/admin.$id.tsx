import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { PostEditor } from "@/components/blog/PostEditor";
import { useIsAdmin } from "@/lib/auth";
import { fetchPostById } from "@/lib/blog";

export const Route = createFileRoute("/admin/$id")({
  component: EditPostPage,
});

function EditPostPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useIsAdmin();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/login" });
  }, [session, loading, navigate]);

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", "admin", id],
    queryFn: () => fetchPostById(id),
    enabled: !!isAdmin,
  });

  if (loading || !session) {
    return <Layout><div className="mx-auto max-w-3xl px-4 py-12 text-muted-foreground">Loading…</div></Layout>;
  }
  if (!isAdmin) {
    return <Layout><div className="mx-auto max-w-3xl px-4 py-12">Not authorized.</div></Layout>;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">← Back to admin</Link>
        <h1 className="mt-2 text-2xl font-bold">Edit post</h1>
        <div className="mt-6">
          {isLoading && <p className="text-muted-foreground">Loading…</p>}
          {!isLoading && post === null && <p className="text-destructive">Post not found.</p>}
          {post && <PostEditor existing={post} />}
        </div>
      </section>
    </Layout>
  );
}
