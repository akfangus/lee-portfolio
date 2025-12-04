"use client"

import { PostCard } from "@/components/ui/card"
import type { BlogPost } from "@/features/blog/types"

interface PostListProps {
  posts: BlogPost[]
}

export function PostList({ posts }: PostListProps): React.ReactElement {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p>아직 작성된 글이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
