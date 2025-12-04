# 이신행 포트폴리오

프론트엔드 개발자 이신행의 포트폴리오 웹사이트입니다. Next.js를 기반으로 구축되었으며, Notion API를 통해 블로그 컨텐츠를 연동하여 관리합니다.

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [주요 디렉토리 설명](#주요-디렉토리-설명)
- [코드 스타일 가이드](#코드-스타일-가이드)
- [배포](#배포)

## 🎯 프로젝트 소개

이 프로젝트는 프론트엔드 개발자 이신행의 포트폴리오 웹사이트로, 다음과 같은 특징을 가지고 있습니다:

- **모던 웹 기술**: Next.js 16과 React 19를 활용한 최신 웹 애플리케이션
- **Notion 블로그 연동**: Notion API를 통해 블로그 컨텐츠를 동적으로 가져옴
- **반응형 디자인**: 모바일과 데스크톱 환경을 모두 지원
- **성능 최적화**: React Query를 통한 효율적인 데이터 캐싱 및 관리
- **타입 안정성**: TypeScript를 통한 엄격한 타입 체크

## ✨ 주요 기능

### 1. 인트로 섹션
- 한글 자모 아이콘을 활용한 브랜드 표현
- 인사말 및 프로필 정보
- 이력서 다운로드
- 핵심 역량 소개

### 2. 기술 스택 섹션
- 프론트엔드, 라이브러리, 환경 및 배포, 디자인 카테고리별 기술 스택 표시
- 탭 기반 UI로 카테고리 전환

### 3. 경력사항 섹션
- 회사별 업무 경험 정리
- 프로젝트별 기술 스택 및 상세 내용 표시
- 스크롤 애니메이션 적용

### 4. 블로그 섹션
- Notion API를 통한 블로그 포스트 동적 로딩
- 카테고리별 필터링 (Skill, Trouble Shooting)
- 블로그 상세 페이지 지원
- 마크다운 렌더링 및 코드 하이라이팅

### 5. 전역 네비게이션
- 섹션별 스크롤 네비게이션
- 스크롤 위치에 따른 활성화 상태 표시

## 🛠 기술 스택

### Core
- **Next.js** 16.0.3 (Page Router)
- **React** 19.2.0
- **TypeScript** 5.x

### 스타일링
- **Tailwind CSS** 4.x
- **@tailwindcss/typography** (마크다운 스타일링)
- **Lucide React** (아이콘)

### 상태 관리 & 데이터 페칭
- **@tanstack/react-query** 5.x (서버 상태 관리)
- **nuqs** 2.x (URL 쿼리 스트링 관리)

### UI 컴포넌트
- **Radix UI**
  - `@radix-ui/react-tabs` (탭 컴포넌트)
  - `@radix-ui/react-tooltip` (툴팁)

### 컨텐츠 관리
- **Notion API** (`@notionhq/client`)
- **react-markdown** (마크다운 렌더링)
- **react-syntax-highlighter** (코드 하이라이팅)
- **remark-gfm** (GitHub Flavored Markdown)
- **rehype-highlight** (코드 하이라이팅)
- **rehype-raw** (HTML 렌더링)

### 유틸리티
- **lodash** (유틸리티 함수)
- **dayjs** (날짜 처리)
- **react-intersection-observer** (스크롤 감지)
- **class-variance-authority** & **clsx** & **tailwind-merge** (조건부 클래스 관리)

### 배포
- **Vercel** (호스팅)
- **@vercel/blob** (이미지 저장)

## 📁 프로젝트 구조

```
lee-portfolio/
├── docs/                          # 문서
│   └── troubleshooting/          # 트러블슈팅 가이드
├── public/                        # 정적 파일
│   └── portfolio.svg
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── api/                   # API 라우트
│   │   ├── blog/                  # 블로그 페이지
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── page.tsx               # 메인 페이지
│   │   ├── providers.tsx          # 전역 프로바이더
│   │   └── globals.css            # 전역 스타일
│   ├── components/                # 재사용 가능한 컴포넌트
│   │   ├── header/                # 헤더 컴포넌트
│   │   └── ui/                    # UI 컴포넌트
│   │       ├── card/              # 카드 컴포넌트
│   │       ├── svg/               # SVG 아이콘
│   │       ├── tab/               # 탭 컴포넌트
│   │       └── tooltip/           # 툴팁 컴포넌트
│   ├── features/                  # 기능별 모듈
│   │   ├── blog/                  # 블로그 기능
│   │   └── main/                  # 메인 페이지 기능
│   │       ├── components/        # 메인 페이지 컴포넌트
│   │       ├── consts.ts          # 상수 데이터
│   │       └── main.tsx           # 메인 컴포넌트
│   ├── hooks/                     # 커스텀 훅
│   │   └── useglobalnavigation.ts
│   └── lib/                       # 유틸리티 함수
│       ├── notion.ts              # Notion API 클라이언트
│       └── utils.ts               # 공통 유틸리티
├── next.config.ts                 # Next.js 설정
├── tailwind.config.js             # Tailwind CSS 설정
├── tsconfig.json                  # TypeScript 설정
└── package.json
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.x 이상
- npm, yarn, pnpm, 또는 bun

### 설치 및 실행

1. 저장소 클론
```bash
git clone <repository-url>
cd lee-portfolio
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

3. 환경 변수 설정

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다. 자세한 내용은 [환경 변수 설정](#환경-변수-설정) 섹션을 참고하세요.

4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:8084](http://localhost:8084)를 열어 확인할 수 있습니다.

### 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

로컬에서 프로덕션 빌드를 실행하려면:

```bash
npm run start
```

### 린트

코드 린트를 실행하려면:

```bash
npm run lint
```

## 🔐 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정해야 합니다:

```env
# Notion API 설정
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

### Notion API 설정 방법

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Integration에 필요한 권한 부여 (Read 권한 필요)
3. 블로그 데이터베이스에 Integration 연결
4. Integration Token과 Database ID를 환경 변수에 설정

**주의**: `.env.local` 파일은 Git에 커밋하지 마세요. `.gitignore`에 포함되어 있습니다.

## 📚 주요 디렉토리 설명

### `/src/app`
Next.js App Router를 사용하는 페이지 및 레이아웃을 포함합니다.

- `layout.tsx`: 루트 레이아웃, 메타데이터 설정
- `page.tsx`: 메인 페이지
- `providers.tsx`: React Query 및 기타 전역 프로바이더 설정
- `blog/[slug]/`: 동적 라우팅을 통한 블로그 상세 페이지

### `/src/components`
재사용 가능한 UI 컴포넌트를 포함합니다.

- `header/`: 전역 헤더 컴포넌트
- `ui/`: 공통 UI 컴포넌트 (카드, 탭, 툴팁 등)

### `/src/features`
기능별로 모듈화된 컴포넌트와 로직을 포함합니다.

- `blog/`: 블로그 관련 컴포넌트 및 타입
- `main/`: 메인 페이지의 각 섹션 컴포넌트
  - `intro/`: 인트로 섹션
  - `skills/`: 기술 스택 섹션
  - `experience/`: 경력사항 섹션
  - `blog/`: 블로그 프리뷰 섹션

### `/src/lib`
유틸리티 함수 및 외부 서비스 클라이언트를 포함합니다.

- `notion.ts`: Notion API 클라이언트 및 블로그 데이터 페칭 로직
- `utils.ts`: 공통 유틸리티 함수

## 📝 코드 스타일 가이드

### 네이밍 규칙

- **디렉토리**: 소문자와 대시 사용 (예: `form-wizard`)
- **컴포넌트 파일**: kebab-case 사용 (예: `blog-card.tsx`)
- **컴포넌트**: PascalCase 사용 (예: `BlogCard`)
- **함수/변수**: camelCase 사용
- **상수**: UPPER_SNAKE_CASE 또는 객체로 그룹화

### 컴포넌트 구조

- **컴포넌트**: 최소한의 로직만 포함, UI 렌더링에 집중
- **훅**: 최대한의 로직을 포함, 상태 관리 및 부수 효과 처리
- **타입/인터페이스**: TypeScript 인터페이스 선호, 열거형 지양

### 함수형 프로그래밍

- 클래스 컴포넌트 대신 함수형 컴포넌트 사용
- 순수 함수에는 `function` 키워드 사용
- 불필요한 중괄호 지양

### 성능 최적화

- React Query를 통한 서버 상태 캐싱
- `React.memo` 및 `useMemo`, `useCallback`을 통한 메모이제이션
- 코드 스플리팅 및 동적 임포트 활용
- 이미지 최적화 (WebP 형식, 지연 로딩)

### 스타일링

- Tailwind CSS를 통한 유틸리티 기반 스타일링
- 반응형 디자인: 모바일 퍼스트 접근
- 다크 모드 지원

### 에러 처리

- 적절한 오류 경계 구현
- 사용자 친화적인 오류 메시지
- 디버깅을 위한 적절한 로깅

## 🚢 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

### Vercel 배포 방법

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. 환경 변수 설정 (Vercel 대시보드에서)
3. 자동 배포 설정 (Git 연결 시 자동)

### 환경 변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경 변수를 설정해야 합니다:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

### 빌드 설정

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 📖 추가 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React Query 문서](https://tanstack.com/query/latest)

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 프로젝트입니다.

## 👤 작성자

**이신행**

- Front-end Engineer
- 포트폴리오: 이 웹사이트
- 이메일: (문의는 포트폴리오를 통해)

---

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 연락주세요! 🙏
