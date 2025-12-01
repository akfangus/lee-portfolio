interface CompetencyItem {
  title: string;
  id: number;
  description: string;
  imageSrc: string;
}

// SVG 아이콘 데이터 인터페이스
export interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "library" | "environment" | "design"; // 탭 카테고리
  iconSrc: string; // SVG 파일 경로 또는 컴포넌트
}

// 탭 카테고리 정의
export const CATEGORIES = [
  { id: "frontend", label: "프론트엔드" },
  { id: "library", label: "라이브러리" },
  { id: "environment", label: "환경 및 배포" },
  { id: "design", label: "디자인" },
] as const;

export type CategoryType = (typeof CATEGORIES)[number]["id"];

export const COMPETENCY_DATA: CompetencyItem[] = [
  {
    id: 1,
    title: "모바일 사용자 경험을 극대화하는 프론트엔드 개발자 ",
    description: `React.js와 Next.js를 활용한 모던 웹 애플리케이션 개발에 능숙하며, TypeScript의 깊은 이해를 바탕으로 안정적인 코드를 작성합니다.
       특히 네이티브 앱 내 웹뷰(WebView) 환경에서의 하이브리드 페이지 구축에 강점이 있습니다.
        네이티브 기능과의 유기적인 연동(Bridge 통신)과 모바일 디바이스에 최적화된 UX/UI를 구현하는 데 주력해 왔습니다.`,
    imageSrc:
      "https://fqne1e1vih055r1l.public.blob.vercel-storage.com/core-compotency1.jpg", // 예시 이미지
  },
  {
    id: 2,
    title: "성능 최적화",
    description: `웹사이트를 개발하고 유지보수하면서, 웹사이트의 성능을 측정하고 개선합니다.
사용자에게 더 나은 환경을 제공하기 위해 CSS 런타임 오버헤드 제거 및 아키텍처 경량화를 통해 초기 렌더링 속도(FCP)를 30% 이상 단축했습니다.`,
    imageSrc:
      "https://fqne1e1vih055r1l.public.blob.vercel-storage.com/core-tempotency2.jpg", // 예시 이미지
  },
  {
    id: 3,
    title: "협업 & 커뮤니케이션",
    description: `팀원과의 효과적인 커뮤니케이션을 위해, Jira 기반 Task 관리, 코드 리뷰, Notion 문서 정리를 하였고 2
년 동안 팀원들과 스터디를 주도적으로 진행하여 프로젝트에 적용하였습니다.`,
    imageSrc:
      "https://fqne1e1vih055r1l.public.blob.vercel-storage.com/core-tempotancy3.jpg", // 예시 이미지
  },
];
