# GitHub Actions CI 파이프라인 가이드

## 📚 목차

1. [GitHub Actions란?](#github-actions란)
2. [CI 파이프라인이란?](#ci-파이프라인이란)
3. [왜 필요한가?](#왜-필요한가)
4. [워크플로우 구조](#워크플로우-구조)
5. [설정 방법](#설정-방법)
6. [동작 원리](#동작-원리)
7. [문제 해결](#문제-해결)

---

## GitHub Actions란?

GitHub에서 제공하는 CI/CD 플랫폼입니다.

**주요 기능:**
- 코드 푸시, PR 생성 시 자동 실행
- 다양한 환경 지원 (Ubuntu, Windows, macOS)
- 퍼블릭 저장소 무료

**구성 요소:**
- **Workflow**: 자동화된 프로세스 전체
- **Job**: 워크플로우 내의 실행 단위
- **Step**: Job 내의 개별 명령

---

## CI 파이프라인이란?

코드를 통합할 때마다 자동으로 검증하는 프로세스입니다.

**목적:**
- 코드 품질 검증 (타입 체크, 린트, 테스트)
- 빌드 성공 확인
- 조기 버그 발견

**CI vs CD:**
- **CI**: 코드 품질 검증 (타입체크, 린트, 빌드)
- **CD**: 검증된 코드 배포 (Vercel 배포)

---

## 왜 필요한가?

### lefthook vs GitHub Actions

| 구분 | lefthook (로컬) | GitHub Actions (원격) |
|------|----------------|---------------------|
| 실행 위치 | 내 컴퓨터 | GitHub 서버 |
| 실행 시점 | 커밋 전 | 푸시/PR 후 |
| 목적 | 개인 코드 검증 | 팀 전체 코드 검증 |

**둘 다 필요한 이유:**
- lefthook: 빠른 피드백 (커밋 전)
- GitHub Actions: 팀 전체 검증 (푸시 후), 표준화된 환경

### Vercel 배포와의 차이점

**Vercel:**
- 자동 배포, Preview 배포
- ❌ 빌드 실패해도 배포 시도
- ❌ 타입 에러 있어도 배포 가능

**GitHub Actions:**
- 코드 품질 검증
- ✅ 문제 있으면 배포 차단
- ✅ PR에 검증 결과 표시

**함께 사용:**
```
코드 작성 → lefthook (로컬 검증) → git push
→ GitHub Actions (원격 검증) → Vercel 배포
```

---

## 워크플로우 구조

### 기본 구조

```yaml
name: CI                    # 워크플로우 이름

on:                         # 실행 조건
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:                       # 작업들
  quality:                  # 작업 이름
    runs-on: ubuntu-latest  # 실행 환경
    steps:                  # 단계들
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
```

### 주요 키워드

- `name`: 워크플로우 이름
- `on`: 실행 조건 (push, pull_request)
- `jobs`: 작업 정의
- `runs-on`: 실행 환경 (ubuntu-latest, windows-latest 등)
- `steps`: 실행할 단계들
- `uses`: 미리 만들어진 액션 사용
- `run`: 직접 명령 실행

---

## 설정 방법

### 1. 워크플로우 파일 생성

`.github/workflows/ci.yml` 파일 생성:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type Check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
```

### 2. 각 단계 설명

1. **Checkout code**: GitHub 저장소에서 코드 가져오기 (필수)
2. **Setup Node.js**: Node.js 환경 설정, npm 캐시 활성화
3. **Install dependencies**: `npm ci`로 의존성 설치 (빠르고 정확)
4. **Type Check**: `npx tsc --noEmit`로 타입 에러 체크
5. **Lint**: `npm run lint`로 ESLint 검사
6. **Build**: `npm run build`로 프로덕션 빌드 확인

---

## 동작 원리

### 전체 플로우

```
1. 코드 푸시 또는 PR 생성
2. GitHub이 이벤트 감지
3. .github/workflows/ci.yml 파일 읽기
4. GitHub Actions 실행 환경 준비 (Ubuntu)
5. 각 단계 순차 실행:
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Type Check
   - Lint
   - Build
6. 모든 단계 성공 → ✅ CI 통과
   하나라도 실패 → ❌ CI 실패
7. 결과를 GitHub에 표시 (PR에 체크마크 또는 X)
```

### 실행 시점

- **Push**: `git push origin main` → 자동 실행
- **Pull Request**: PR 생성 시 → 자동 실행

---

## 실제 사용 예시

### 정상적인 코드 푸시

```bash
git push origin main
# GitHub Actions 자동 실행
# → 모든 단계 통과 ✅
# → Actions 탭에서 성공 표시
```

### 타입 에러가 있는 코드

```typescript
// ❌ title 속성이 없음
const Button = (props: ButtonProps) => {
  return <button>{props.title}</button>;
};
```

```bash
git push origin main
# → Type Check 단계에서 실패 ❌
# → PR에 빨간색 X 표시
# → Vercel 배포 차단
```

### PR에서 확인하기

1. PR 생성
2. GitHub Actions 자동 실행
3. PR 페이지에서 "All checks have passed" 또는 "Some checks were not successful" 확인
4. "Show all checks" 클릭하여 상세 로그 확인

---

## 문제 해결

### CI가 실패했을 때

1. **로그 확인**
   ```
   GitHub → Actions 탭 → 실패한 워크플로우 → 실패한 Job → 실패한 Step → 로그 확인
   ```

2. **로컬에서 재현**
   ```bash
   npm ci
   npx tsc --noEmit
   npm run lint
   npm run build
   ```

3. **수정 후 다시 푸시**
   ```bash
   git add .
   git commit -m "fix: CI 에러 수정"
   git push
   ```

### 자주 발생하는 문제

**Node.js 버전 불일치**
```yaml
# package.json의 engines와 일치시키기
node-version: '20'
```

**의존성 설치 실패**
```yaml
# npm ci 사용 (npm install 대신)
run: npm ci
```

**CI가 실행되지 않을 때**
- 파일 위치 확인: `.github/workflows/ci.yml`
- YAML 문법 확인 (들여쓰기 스페이스 2개)
- 브랜치 이름 확인

---

## 요약

**핵심 개념:**
- GitHub Actions: CI/CD 플랫폼
- Workflow: 자동화된 프로세스 전체
- Job: 워크플로우 내의 실행 단위
- Step: Job 내의 개별 명령

**설정 완료 체크리스트:**
- [x] `.github/workflows/ci.yml` 파일 생성
- [x] Checkout code 단계 추가
- [x] Node.js 설정 단계 추가
- [x] 의존성 설치 단계 추가
- [x] TypeScript 타입 체크 단계 추가
- [x] ESLint 린트 검사 단계 추가
- [x] Next.js 빌드 단계 추가

**CI 파이프라인 실행 흐름:**
```
코드 푸시/PR 생성 → GitHub Actions 실행
→ 타입 체크 → 린트 → 빌드
→ 검증 성공 ✅ → Vercel 배포
→ 검증 실패 ❌ → 배포 차단
```
