import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { useIsAdmin } from "@/lib/auth";
import { fetchAllPostsAdmin } from "@/lib/blog";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session, isAdmin, loading } = useIsAdmin();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/login" });
  }, [session, loading, navigate]);

  const { data: posts, refetch } = useQuery({
    queryKey: ["posts", "admin"],
    queryFn: fetchAllPostsAdmin,
    enabled: !!isAdmin,
  });

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-5xl px-4 py-12 text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <Layout>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="text-xl font-semibold">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have admin access.
          </p>
          <button
            onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/login" }))}
            className="mt-4 rounded-md border border-input px-3 py-1.5 text-sm"
          >
            Sign out
          </button>
        </div>
      </Layout>
    );
  }

  async function del(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert(error.message);
    else {
      await refetch();
      qc.invalidateQueries({ queryKey: ["posts"] });
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blog admin</h1>
            <p className="text-sm text-muted-foreground">Manage posts and drafts.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/admin/new"
              className="rounded-md bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              + New post
            </Link>
            <button
              onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
              className="rounded-md border border-input px-3 py-2 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Updated</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-2">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-4 py-2">
                    {p.published ? (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">Published</span>
                    ) : (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Link to="/admin/$id" params={{ id: p.id }} className="text-[var(--brand-orange)] hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => del(p.id)} className="ml-3 text-destructive hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts && posts.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
