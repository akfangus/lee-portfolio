import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/features/blog/types"
import { CategoryIllustration } from "./category-illustration"

interface BlogPreviewCardProps {
  post: BlogPost
}

function getCategoryBadgeStyle(category: BlogPost["category"]): string {
  if (category === "Skill") {
    return "bg-blue-500/90 text-white"
  }
  if (category === "Issue") {
    return "bg-purple-500/90 text-white"
  }
  return "bg-red-500/90 text-white"
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
            className={`text-xs font-semibold shadow-lg ${getCategoryBadgeStyle(post.category)}`}
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
