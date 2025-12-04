"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import dayjs from "dayjs"
import { BlogPost } from "@/features/blog/types"
import { Badge } from "@/components/ui/badge"
import { memo, type ComponentProps } from "react"
import { useRouter } from "next/navigation"

interface PostDetailProps {
  post: BlogPost
  content: string
}

// 코드 블록 컴포넌트
type CodeProps = ComponentProps<"code"> & {
  inline?: boolean
}

function CodeBlock({ inline, className, children, ...props }: CodeProps) {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""
  const codeString = String(children).replace(/\n$/, "")

  if (!inline && language) {
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    )
  }

  // 인라인 코드
  return (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-pink-600 dark:bg-gray-800 dark:text-pink-400"
      {...props}
    >
      {children}
    </code>
  )
}

// 마크다운 렌더러 메모이제이션
const MarkdownContent = memo(function MarkdownContent({
  content,
}: {
  content: string
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  )
})

export function PostDetail({ post, content }: PostDetailProps) {
  const router = useRouter()

  return (
    <article className="mx-auto max-w-3xl">
      <button
        onClick={() => router.back()}
        className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← Back
      </button>

      <header className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          {post.category && <Badge variant="secondary">{post.category}</Badge>}
          <span className="text-sm text-gray-500">
            {dayjs(post.date).format("YYYY년 MM월 DD일")}
          </span>
        </div>
        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        {post.cover && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownContent content={content} />
      </div>
    </article>
  )
}
