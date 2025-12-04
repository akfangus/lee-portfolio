import { Suspense } from "react"
import { BlogSkeleton } from "./blog/blog-skeleton"
import { getPostsPreview } from "@/lib/notion"
import { BlogHeader } from "./blog/blog-header"
import { BlogGrid } from "./blog/blog-grid"
import { BlogViewAllButton } from "./blog/blog-view-all-button"
import { BlogSection } from "./blog/blog-section"

/**
 * 블로그 컴포넌트 (Suspense 포함)
 * - main.tsx에서 단순히 <Blog />로 사용
 */
export async function Blog() {
  const posts = await getPostsPreview(4)
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogSection>
        <div className="mx-auto max-w-6xl px-6">
          <BlogHeader />
          <BlogGrid posts={posts} />
          <BlogViewAllButton />
        </div>
      </BlogSection>
    </Suspense>
  )
}
