import { getPost, getPostContent, getPosts } from "@/lib/notion"
import { PostDetail } from "@/features/blog/components/post-detail"
import { notFound } from "next/navigation"

// ISR 설정
export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

// 정적 경로 생성 (빌드 시점에 미리 페이지 생성)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<{
  title: string
}> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: "Blog Post | Lee Portfolio" }
  }

  return {
    title: `${post.title} | Lee Portfolio`,
  }
}

export default async function BlogPostPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  const { slug } = await params

  // 병렬로 데이터 가져오기
  const [post, content] = await Promise.all([
    getPost(slug),
    getPostContent(slug),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 font-noto-sans-kr">
      <PostDetail post={post} content={content ?? ""} />
    </div>
  )
}
