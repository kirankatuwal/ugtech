import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/site/Layout";
import { PostEditor } from "@/components/blog/PostEditor";
import { useIsAdmin } from "@/lib/auth";

export const Route = createFileRoute("/admin/new")({
  component: NewPostPage,
});

function NewPostPage() {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useIsAdmin();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/login" });
  }, [session, loading, navigate]);

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
        <h1 className="mt-2 text-2xl font-bold">New post</h1>
        <div className="mt-6">
          <PostEditor />
        </div>
      </section>
    </Layout>
  );
}
