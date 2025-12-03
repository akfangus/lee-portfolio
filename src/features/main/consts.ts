export interface CompetencyItem {
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

export interface ProjectItem {
  title: string;
  period: string;
  description?: string;
  techStack: string[];
  details: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  department: string;
  period: string;
  projects: ProjectItem[];
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

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "avatye",
    company: "AVATYE, 구루컴퍼니",
    period: "2023. 06. 01 ~ 2025. 12. 14",
    department: "개발 팀",
    position: "Front-end Engineer",
    projects: [
      {
        title: "홈페이지 개발 및 유지보수 (상시업무)",
        period: "2023. 06. 01 ~ 2025. 12. 14",
        techStack: ["Next.js (Page Router)", "Typescript"],
        details: [
          "웹툰, 웹소설, 숏드라마 컨텐츠를 다양한 디바이스 환경(Mobile, PC)을 지원하는 반응형 UI 기반 웹페이지 개발",
          "하이브리드 앱 생태계 확장을 위한 양방향 통신 브릿지를 설계하여 외부 앱채널의 WebView와 사내 제품과 연동될 수 있는 가이드 제작 및 개발",
        ],
      },
      {
        title: "프론트엔드 아키텍처 레거시 시스템 마이그레이션",
        period: "2025. 01. 01 ~ 2025. 10. 30",
        techStack: [
          "Chakra-ui → tailwindcss",
          "Recoil → zustand",
          "Custom API hooks → tanstackquery",
        ],
        details: [
          "CSS-in-JS의 런타임 한계와 좁은 생태계를 극복하고자 Chakra UI를 Tailwind CSS로 전환하여 렌더링 성능을 최적화",
          "Recoil의 정식 버전 미출시로 인한 불확실성을 해소하기 위해 Zustand로 마이그레이션하여, 장기적으로 안정적인 상태 관리 아키텍처를 구축",
          "사내 레거시 라이브러리 의존성을 제거함에 따라 TanStack Query를 도입하여, 비동기 로직을 표준화하고 데이터 캐싱 효율을 극대화",
        ],
      },
      {
        title: "비디오 기반 숏드라마 컨텐츠 제작",
        period: "2025. 10. 01 ~ 2025. 10. 30",
        description:
          "BytePlus(VePlayer) 기반의 고성능 숏폼 플레이어를 구축하여, 대용량 비디오 스트리밍의 초기 버퍼링을 최소화하고 재생 안정성을 확보",
        techStack: [
          "Intersection Observer API",
          "swiper/react",
          "VePlayer SDK",
        ],
        details: [
          "VePlayer SDK 의 캐싱 전략을 사용하여 비디오 프리로딩을 사용하여 재생 버퍼링 최적화",
          "React 생명주기에 맞춰 플레이어 인스턴스를 관리, 가상화된 Swiper와 연동하여 메모리 누수 차단",
        ],
      },
      {
        title: "테스팅 전략 시스템 구축",
        period: "2025. 07. 01 ~ 2025. 12. 14",
        techStack: ["Playwright", "Storybook", "Vitest"],
        details: [
          "기기, 브라우저 환경별 사용자 시나리오(E2E)를 구축하여 Playwright를 활용하여 테스트 검증",
          "Radix UI 기반의 디자인 공통 컴포넌트를 직접 설계하여 Storybook으로 시작적 테스트 구축",
          "vitest를 활용하여 로직 단위의 유틸리티함수에 TDD 환경을 조성",
        ],
      },
    ],
  },
];
