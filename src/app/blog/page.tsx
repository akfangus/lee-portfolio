import { BlogMain } from "@/features/blog/main";
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

  return <BlogMain posts={posts} />;
}
