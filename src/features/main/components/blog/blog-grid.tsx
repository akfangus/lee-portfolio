import { BlogPreviewCard } from "@/components/ui/card"
import type { BlogPost } from "@/features/blog/types"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps): React.ReactElement {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-stone-400">아직 작성된 글이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <BlogPreviewCard key={post.id} post={post} />
      ))}
    </div>
  )
}
