import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/features/blog/types"

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps): React.ReactElement {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      {post.cover && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          {post.category && (
            <Badge
              variant="destructive"
              className={`text-xs font-medium ${
                post.category === "Skill"
                  ? "bg-blue-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {post.category}
            </Badge>
          )}
          <span className="text-xs text-gray-500">
            {dayjs(post.date).format("YYYY.MM.DD")}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>

        <div className="mt-auto pt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
          Read more →
        </div>
      </div>
    </Link>
  )
}
