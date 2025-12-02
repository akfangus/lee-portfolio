import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { SkillItem } from "@/features/consts";

export const runtime = "edge";

// 파일명을 기반으로 카테고리를 매핑하는 테이블
const CATEGORY_MAP: Record<string, SkillItem["category"]> = {
  javascript: "frontend",
  typescript: "frontend",
  react: "frontend",
  "next.js": "frontend",
  "tailwind css": "library",
  "vite.js": "environment",
  recoil: "library",
  "icons8-chakra-ui-logo": "library",
  bitbucket: "environment",
  figma: "design",
  jira: "environment",
  playwrite: "library",
  storybook: "library",
  vercel: "environment",
  zustand: "library",
  vitest: "library",
  axios: "library",
  reactquery: "library",
};

// 화면에 표시될 이름 매핑 (파일명 -> 표시 이름)
const DISPLAY_NAME_MAP: Record<string, string> = {
  "icons8-chakra-ui-logo": "Chakra UI",
  playwrite: "Playwright",
  "tailwind css": "Tailwind CSS",
  "next.js": "Next.js",
  "vite.js": "Vite",
};

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "svg/" });

    const skills: SkillItem[] = blobs
      .map((blob) => {
        const fileName = blob.pathname.split("/").pop() || "";
        // .svg 확장자 제거
        const nameWithoutExt = fileName.replace(/\.svg$/i, "");
        // 소문자로 변환하여 매핑 키로 사용
        const lowerName = nameWithoutExt.toLowerCase();

        // 로고 등 제외하고 싶은 파일 필터링을 위해 category 확인
        const category = CATEGORY_MAP[lowerName];

        // 매핑되지 않은 파일(예: logo-black)은 스킵하기 위해 null 반환 가능하게 처리
        if (!category) {
          return null;
        }

        // 표시 이름 결정: 매핑 테이블에 있으면 사용, 없으면 파일명 첫 글자 대문자화
        const displayName =
          DISPLAY_NAME_MAP[lowerName] ||
          nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);

        return {
          id: lowerName,
          name: displayName,
          category: category,
          iconSrc: blob.url,
        };
      })
      .filter((item): item is SkillItem => item !== null); // null 제거

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Blob list error:", error);
    return NextResponse.json(
      { error: "이미지를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
