import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MarkdownEditor } from "@/components/blog/MarkdownEditor";
import { supabase } from "@/integrations/supabase/client";
import { slugify, type Post, COMMON_CATEGORIES } from "@/lib/blog";

type Props = {
  existing?: Post | null;
};

export function PostEditor({ existing }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!existing);
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [tagsInput, setTagsInput] = useState((existing?.tags ?? []).join(", "));
  const [coverUrl, setCoverUrl] = useState(existing?.cover_image_url ?? "");
  const [published, setPublished] = useState(existing?.published ?? false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  async function uploadCover(file: File) {
    setUploading(true);
    setError(null);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setCoverUrl(data.publicUrl);
    setUploading(false);
  }

  async function save(nextPublished?: boolean) {
    setError(null);
    setSaving(true);
    const finalPublished = nextPublished ?? published;
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const { data: userData } = await supabase.auth.getUser();
    const author_id = userData.user?.id ?? null;

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      excerpt: excerpt.trim() || null,
      body,
      cover_image_url: coverUrl || null,
      tags,
      published: finalPublished,
      published_at:
        finalPublished && !existing?.published_at ? new Date().toISOString() : existing?.published_at ?? null,
      author_id,
    };

    let result;
    if (existing) {
      result = await supabase.from("posts").update(payload).eq("id", existing.id).select().single();
    } else {
      result = await supabase.from("posts").insert(payload).select().single();
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setPublished(finalPublished);
    navigate({ to: "/admin" });
  }

  return (
    <div className="space-y-6">
      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
          placeholder="My new post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Slug (URL)</label>
        <div className="mt-1 flex rounded-md border border-input bg-background">
          <span className="border-r border-input px-3 py-2 text-sm text-muted-foreground">/blog/</span>
          <input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            className="w-full bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Cover image</label>
        {coverUrl && <img src={coverUrl} alt="" className="mt-2 aspect-video w-full max-w-md rounded object-cover" />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); }}
          className="mt-2 block text-sm"
          disabled={uploading}
        />
        {uploading && <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>}
        {coverUrl && (
          <button type="button" onClick={() => setCoverUrl("")} className="mt-1 text-xs text-destructive hover:underline">
            Remove cover
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          rows={2}
          placeholder="Short summary shown on the blog list."
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tags / Categories</label>
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Installations, New Devices, News"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          {COMMON_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                const parts = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
                if (parts.includes(c)) return;
                setTagsInput([...parts, c].join(", "));
              }}
              className="rounded-full border border-input bg-background px-2 py-0.5 text-xs hover:bg-accent"
            >
              + {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Body</label>
        <div className="mt-1">
          <MarkdownEditor value={body} onChange={setBody} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => save(false)}
          disabled={saving || !title.trim()}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          Save as draft
        </button>
        <button
          type="button"
          onClick={() => save(true)}
          disabled={saving || !title.trim()}
          className="rounded-md bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50"
        >
          {existing?.published ? "Update published" : "Publish"}
        </button>
      </div>
    </div>
  );
}
