import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

import { theme } from "../../colors";
import nord from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

SyntaxHighlighter.registerLanguage("tsx", tsx);

export default function MarkdownViewer({ content }: { content: string }) {
  const { codeBg } = theme.light;
  return (
    <Markdown
      className="prose max-w-none mt-8"
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={nord}
              customStyle={{ background: codeBg }}
              ref={null}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              style={{ padding: 2, borderRadius: 3 }}
              className={className}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
