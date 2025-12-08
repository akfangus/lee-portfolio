import { PostList } from "./components/post-list"
import type { BlogPost } from "./types"

interface BlogMainProps {
  posts: BlogPost[]
}

export function BlogMain({ posts }: BlogMainProps): React.ReactElement {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          My Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          개발하면서 겪은 문제와 해결 과정, 그리고 새로운 기술에 대한 학습
          기록을 공유합니다.
        </p>
      </div>

      <PostList posts={posts} />
    </div>
  )
}
