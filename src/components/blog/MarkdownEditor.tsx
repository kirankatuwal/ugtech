import { useRef } from "react";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Heading2 } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function MarkdownEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = before, placeholder = "text") {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  }

  function prefixLines(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = value.slice(0, start);
    const sel = value.slice(start, end) || "item";
    const after = value.slice(end);
    const lines = sel.split("\n").map((l, i) => (prefix === "1. " ? `${i + 1}. ${l}` : `${prefix}${l}`));
    onChange(before + lines.join("\n") + after);
  }

  function insertLink() {
    const url = prompt("Link URL");
    if (!url) return;
    wrap("[", `](${url})`, "link text");
  }

  const btn =
    "inline-flex items-center gap-1 rounded border border-input bg-background px-2 py-1 text-xs hover:bg-accent";

  return (
    <div className="rounded-md border border-input">
      <div className="flex flex-wrap gap-1 border-b border-input bg-muted/40 p-2">
        <button type="button" className={btn} onClick={() => wrap("**")} title="Bold"><Bold className="h-3.5 w-3.5" /></button>
        <button type="button" className={btn} onClick={() => wrap("*")} title="Italic"><Italic className="h-3.5 w-3.5" /></button>
        <button type="button" className={btn} onClick={() => wrap("## ", "", "Heading")} title="Heading"><Heading2 className="h-3.5 w-3.5" /></button>
        <button type="button" className={btn} onClick={() => prefixLines("- ")} title="Bullet list"><List className="h-3.5 w-3.5" /></button>
        <button type="button" className={btn} onClick={() => prefixLines("1. ")} title="Numbered list"><ListOrdered className="h-3.5 w-3.5" /></button>
        <button type="button" className={btn} onClick={insertLink} title="Link"><LinkIcon className="h-3.5 w-3.5" /></button>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block min-h-[320px] w-full resize-y bg-background p-3 font-mono text-sm outline-none"
        placeholder="Write your post in markdown..."
      />
    </div>
  );
}
