import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/features/blog/types"

interface BlogPreviewCardProps {
  post: BlogPost
}

/**
 * 카테고리별 일러스트 아이콘 SVG
 */
function CategoryIllustration({
  category,
}: {
  category: "Skill" | "Trouble Shooting"
}): React.ReactElement {
  if (category === "Skill") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
        {/* 코드 아이콘 */}
        <svg
          className="h-16 w-16 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        {/* 배경 장식 */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-rose-600">
      {/* 버그 아이콘 */}
      <svg
        className="h-16 w-16 text-white/80"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
      {/* 배경 장식 */}
      <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-white/5" />
    </div>
  )
}

export function BlogPreviewCard({
  post,
}: BlogPreviewCardProps): React.ReactElement {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* 일러스트 영역 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <CategoryIllustration category={post.category} />
        )}
        {/* 카테고리 배지 (이미지 위) */}
        <div className="absolute left-3 top-3">
          <Badge
            variant="secondary"
            className={`text-xs font-semibold shadow-lg ${
              post.category === "Skill"
                ? "bg-blue-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {post.category}
          </Badge>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="mt-auto text-sm text-gray-500 dark:text-gray-400">
          {dayjs(post.date).format("YYYY.MM.DD")}
        </p>
      </div>
    </Link>
  )
}
