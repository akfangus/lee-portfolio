import { PostList } from "@/features/blog/components/post-list";
import { getBlogPosts } from "@/lib/notion";

// 페이지 메타데이터 설정
export const metadata = {
  title: "Blog | Lee Portfolio",
  description: "개발 관련 생각과 배운 점들을 기록하는 공간입니다.",
};

// ISR 설정 (1시간마다 갱신)
export const revalidate = 3600;

export default async function BlogPage(): Promise<React.ReactElement> {
  // Server Component에서 직접 노션 API 호출
  const posts = await getBlogPosts();

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
  );
}
