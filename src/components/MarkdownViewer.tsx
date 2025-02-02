"use client";

import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

import useThemeColor from "@/hooks/ThemeColor";
import nord from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

SyntaxHighlighter.registerLanguage("tsx", tsx);

export default function MarkdownViewer({ content }: { content: string }) {
  const { codeBg, text } = useThemeColor();

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="prose max-w-none mt-8"
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
        img: image => {
          const isGif = image.src?.endsWith(".gif");

          return (
            <Image
              className="w-full max-h-90 object-cover"
              src={image.src || ""}
              alt={image.alt || ""}
              width={900}
              height={450}
              style={image.style}
              unoptimized={isGif}
            />
          );
        },
        h2(props) {
          const { node, ...rest } = props;
          return <h2 style={{ letterSpacing: "0.5px" }} {...rest} />;
        },
        th(props) {
          const { node, ...rest } = props;
          return <th style={{ color: text }} {...rest} />;
        },
      }}
    >
      {content}
    </Markdown>
  );
}
