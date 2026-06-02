import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function PostBody({ children }: { children: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-[var(--brand-orange)] prose-strong:text-foreground prose-li:text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
