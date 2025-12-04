# GitHub Actions CI 파이프라인 가이드

## 📚 목차

1. [GitHub Actions란?](#github-actions란)
2. [CI 파이프라인이란?](#ci-파이프라인이란)
3. [왜 필요한가?](#왜-필요한가)
4. [Vercel 배포와의 차이점](#vercel-배포와의-차이점)
5. [워크플로우 구조 이해하기](#워크플로우-구조-이해하기)
6. [설정 방법](#설정-방법)
7. [동작 원리](#동작-원리)
8. [실제 사용 예시](#실제-사용-예시)
9. [문제 해결](#문제-해결)

---

## GitHub Actions란?

**GitHub Actions**는 GitHub 저장소에서 코드를 빌드, 테스트, 배포할 수 있게 해주는 CI/CD 플랫폼입니다.

### 주요 기능

- ✅ **자동화된 워크플로우**: 코드 푸시, PR 생성 등 이벤트에 자동 반응
- ✅ **다양한 환경 지원**: Ubuntu, Windows, macOS 등
- ✅ **무료 사용량**: 퍼블릭 저장소는 무료
- ✅ **다양한 액션**: 수천 개의 미리 만들어진 액션 사용 가능

### GitHub Actions의 구성 요소

1. **Workflow (워크플로우)**: 자동화된 프로세스 전체
2. **Job (작업)**: 워크플로우 내의 실행 단위
3. **Step (단계)**: Job 내의 개별 명령
4. **Action (액션)**: 재사용 가능한 코드 단위

---

## CI 파이프라인이란?

**CI (Continuous Integration, 지속적 통합)**는 코드를 통합할 때마다 자동으로 검증하는 프로세스입니다.

### CI 파이프라인의 목적

1. **코드 품질 검증**: 타입 체크, 린트, 테스트
2. **빌드 성공 확인**: 프로덕션 빌드가 정상적으로 되는지 확인
3. **조기 버그 발견**: 배포 전에 문제 발견
4. **팀 협업 향상**: PR 머지 전 자동 검증

### CI vs CD

| 구분 | CI (Continuous Integration) | CD (Continuous Deployment) |
|------|----------------------------|---------------------------|
| **목적** | 코드 품질 검증 | 검증된 코드 배포 |
| **실행 시점** | PR 생성, 코드 푸시 | CI 통과 후 |
| **결과** | 검증 성공/실패 | 실제 배포 |
| **예시** | 타입체크, 린트, 빌드 | Vercel 배포 |

---

## 왜 필요한가?

### lefthook과의 차이점

| 구분 | lefthook (로컬) | GitHub Actions (원격) |
|------|----------------|---------------------|
| **실행 위치** | 내 컴퓨터 | GitHub 서버 |
| **실행 시점** | 커밋 전 | 푸시/PR 후 |
| **목적** | 개인 코드 검증 | 팀 전체 코드 검증 |
| **환경** | 내 환경 | 표준화된 환경 |

### 왜 둘 다 필요한가?

1. **lefthook**: 빠른 피드백 (커밋 전)
   - 내가 실수한 것을 즉시 발견
   - 커밋 전에 수정 가능

2. **GitHub Actions**: 팀 전체 검증 (푸시 후)
   - 다른 사람의 코드도 검증
   - 표준화된 환경에서 검증
   - PR 머지 전 최종 검증

### 실제 시나리오

```
개발자 A: 코드 작성
    ↓
lefthook: 로컬에서 검증 ✅
    ↓
git commit: 커밋 성공
    ↓
git push: GitHub에 푸시
    ↓
GitHub Actions: 원격에서 검증 ✅
    ↓
PR 생성: 검증 통과한 코드만 PR에 표시
    ↓
팀원 리뷰: 검증된 코드만 리뷰
    ↓
머지: 안전하게 머지
```

---

## Vercel 배포와의 차이점

### Vercel Auto Deploy

```
GitHub Push
    ↓
Vercel이 자동 감지
    ↓
빌드 실행
    ↓
배포 (goddddd.dev)
```

**특징:**
- ✅ 자동 배포
- ✅ Preview 배포 (PR마다)
- ❌ 빌드 실패해도 배포 시도
- ❌ 타입 에러 있어도 배포 가능

### GitHub Actions CI

```
GitHub Push
    ↓
GitHub Actions 실행
    ↓
타입 체크 → 린트 → 빌드
    ↓
검증 성공 ✅ / 실패 ❌
    ↓
검증 통과한 코드만 Vercel 배포
```

**특징:**
- ✅ 코드 품질 검증
- ✅ 빌드 전 타입 체크
- ✅ 문제 있으면 배포 차단
- ✅ PR에 검증 결과 표시

### 함께 사용하면?

```
코드 작성
    ↓
lefthook (로컬 검증) ✅
    ↓
git push
    ↓
GitHub Actions (원격 검증) ✅
    ↓
검증 통과
    ↓
Vercel 배포 (자동) ✅
```

**결과:**
- ✅ 빠른 피드백 (lefthook)
- ✅ 팀 전체 검증 (GitHub Actions)
- ✅ 안전한 배포 (Vercel)

---

## 워크플로우 구조 이해하기

### 기본 구조

```yaml
name: CI                    # 워크플로우 이름

on:                         # 실행 조건
  push:
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

### 주요 키워드 설명

#### 1. `name`
워크플로우의 이름입니다. GitHub UI에서 표시됩니다.

```yaml
name: CI
```

#### 2. `on`
워크플로우가 실행되는 조건입니다.

```yaml
on:
  push:                    # 푸시할 때
    branches: [main]       # main 브랜치에
  pull_request:            # PR 생성할 때
    branches: [main]       # main 브랜치로
```

#### 3. `jobs`
여러 작업을 정의할 수 있습니다. 병렬로 실행됩니다.

```yaml
jobs:
  quality:                 # 작업 이름
    runs-on: ubuntu-latest # 실행 환경
    steps:                 # 실행할 단계들
      - ...
```

#### 4. `runs-on`
작업이 실행될 환경입니다.

```yaml
runs-on: ubuntu-latest    # Ubuntu 최신 버전
# 또는
runs-on: windows-latest   # Windows
runs-on: macos-latest     # macOS
```

#### 5. `steps`
작업 내에서 실행할 단계들입니다. 순차적으로 실행됩니다.

```yaml
steps:
  - name: Step 1          # 단계 이름
    uses: actions/checkout@v4  # 액션 사용
  - name: Step 2
    run: npm install      # 명령 실행
```

#### 6. `uses` vs `run`

- **`uses`**: 미리 만들어진 액션 사용
  ```yaml
  uses: actions/checkout@v4
  ```

- **`run`**: 직접 명령 실행
  ```yaml
  run: npm install
  ```

---

## 설정 방법

### 1. 워크플로우 파일 생성

`.github/workflows/ci.yml` 파일을 생성합니다.

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

#### Step 1: Checkout code
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```
**목적**: GitHub 저장소에서 코드를 가져옵니다.  
**필수**: 모든 워크플로우의 첫 단계로 필요합니다.

#### Step 2: Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```
**목적**: Node.js 환경을 설정하고 npm 캐시를 활성화합니다.  
**효과**: `npm install` 속도가 빨라집니다.

#### Step 3: Install dependencies
```yaml
- name: Install dependencies
  run: npm ci
```
**목적**: 의존성을 설치합니다.  
**`npm ci` vs `npm install`**:
- `npm ci`: package-lock.json 기반, 빠르고 정확
- `npm install`: 느리고 버전이 달라질 수 있음

#### Step 4: Type Check
```yaml
- name: Type Check
  run: npx tsc --noEmit
```
**목적**: TypeScript 타입 에러를 체크합니다.  
**`--noEmit`**: 타입 체크만 하고 파일은 생성하지 않습니다.

#### Step 5: Lint
```yaml
- name: Lint
  run: npm run lint
```
**목적**: ESLint로 코드 스타일을 검사합니다.

#### Step 6: Build
```yaml
- name: Build
  run: npm run build
```
**목적**: 프로덕션 빌드가 성공하는지 확인합니다.  
**중요**: 빌드 실패 시 배포도 실패하므로 필수입니다.

### 3. 파일 구조

```
프로젝트 루트/
  .github/
    workflows/
      ci.yml          # CI 워크플로우 파일
```

---

## 동작 원리

### 전체 플로우

```
1. 개발자가 코드 푸시 또는 PR 생성
   ↓
2. GitHub이 이벤트 감지
   ↓
3. .github/workflows/ci.yml 파일 읽기
   ↓
4. GitHub Actions 실행 환경 준비 (Ubuntu)
   ↓
5. 각 단계 순차 실행:
   - Checkout code (코드 가져오기)
   - Setup Node.js (환경 설정)
   - Install dependencies (의존성 설치)
   - Type Check (타입 체크)
   - Lint (린트 검사)
   - Build (빌드)
   ↓
6. 모든 단계 성공 → ✅ CI 통과
   하나라도 실패 → ❌ CI 실패
   ↓
7. 결과를 GitHub에 표시
   - PR에 체크마크 또는 X 표시
   - 상세 로그 확인 가능
```

### 실행 시점

#### Push 이벤트
```bash
git push origin main
```
→ GitHub Actions 자동 실행

#### Pull Request 이벤트
```bash
# PR 생성 시
GitHub UI에서 "Create Pull Request" 클릭
```
→ GitHub Actions 자동 실행

---

## 실제 사용 예시

### 시나리오 1: 정상적인 코드 푸시

```bash
# 1. 코드 작성 및 커밋
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main

# 2. GitHub Actions 자동 실행
# → 모든 단계 통과 ✅

# 3. GitHub에서 확인
# → Actions 탭에서 "CI" 워크플로우 성공 표시
# → 초록색 체크마크 ✅
```

### 시나리오 2: 타입 에러가 있는 코드

```typescript
// src/components/Button.tsx
const Button = (props: ButtonProps) => {
  return <button>{props.title}</button>;  // ❌ title 속성이 없음
};
```

```bash
git push origin main

# GitHub Actions 실행
# → Type Check 단계에서 실패 ❌
# → 에러: Property 'title' does not exist on type 'ButtonProps'

# 결과:
# → PR에 빨간색 X 표시 ❌
# → 상세 에러 메시지 확인 가능
# → Vercel 배포 차단 (CI 실패)
```

### 시나리오 3: 린트 에러가 있는 코드

```typescript
// 세미콜론 누락
const name = "John"  // ❌ 세미콜론 없음
```

```bash
git push origin main

# GitHub Actions 실행
# → Lint 단계에서 실패 ❌
# → 에러: Missing semicolon

# 결과:
# → PR에 빨간색 X 표시 ❌
# → 수정 후 다시 푸시 필요
```

### 시나리오 4: PR에서 확인하기

1. **PR 생성**
   ```
   브랜치: feature/new-button
   → main 브랜치로 PR 생성
   ```

2. **GitHub Actions 자동 실행**
   ```
   PR 페이지에서 확인:
   - "All checks have passed" ✅
   - 또는 "Some checks were not successful" ❌
   ```

3. **상세 로그 확인**
   ```
   "Show all checks" 클릭
   → 각 단계별 실행 결과 확인
   → 실패한 단계의 로그 확인
   ```

---

## 문제 해결

### CI가 실패했을 때

#### 1. 로그 확인
```
GitHub → Actions 탭
→ 실패한 워크플로우 클릭
→ 실패한 Job 클릭
→ 실패한 Step 클릭
→ 로그 확인
```

#### 2. 로컬에서 재현
```bash
# CI와 동일한 환경에서 실행
npm ci
npx tsc --noEmit
npm run lint
npm run build
```

#### 3. 수정 후 다시 푸시
```bash
# 문제 수정
# ...

# 다시 푸시
git add .
git commit -m "fix: CI 에러 수정"
git push
```

### 자주 발생하는 문제

#### 문제 1: Node.js 버전 불일치
```yaml
# 해결: package.json의 engines와 일치시키기
node-version: '20'  # package.json의 engines.node와 일치
```

#### 문제 2: 캐시 문제
```bash
# 해결: GitHub Actions에서 캐시 삭제
# 또는 로컬에서 npm ci 실행
```

#### 문제 3: 의존성 설치 실패
```yaml
# 해결: npm ci 사용 (npm install 대신)
run: npm ci
```

### CI가 실행되지 않을 때

1. **파일 위치 확인**
   ```
   .github/workflows/ci.yml
   ```

2. **YAML 문법 확인**
   ```yaml
   # 들여쓰기는 스페이스 2개
   # 탭 사용 금지
   ```

3. **브랜치 이름 확인**
   ```yaml
   on:
     push:
       branches: [main]  # 실제 브랜치 이름과 일치하는지 확인
   ```

---

## 요약

### 핵심 개념

1. **GitHub Actions**: GitHub에서 제공하는 CI/CD 플랫폼
2. **Workflow**: 자동화된 프로세스 전체
3. **Job**: 워크플로우 내의 실행 단위
4. **Step**: Job 내의 개별 명령

### 설정 완료 체크리스트

- [x] `.github/workflows/ci.yml` 파일 생성
- [x] Checkout code 단계 추가
- [x] Node.js 설정 단계 추가
- [x] 의존성 설치 단계 추가
- [x] TypeScript 타입 체크 단계 추가
- [x] ESLint 린트 검사 단계 추가
- [x] Next.js 빌드 단계 추가

### CI 파이프라인 실행 흐름

```
코드 푸시/PR 생성
    ↓
GitHub Actions 실행
    ↓
타입 체크 → 린트 → 빌드
    ↓
검증 성공 ✅ → Vercel 배포
검증 실패 ❌ → 배포 차단
```

### 다음 단계

이제 PR이나 푸시할 때마다 자동으로 코드 품질이 검증됩니다!  
[CI/CD 개요 문서](./index.md)에서 전체 흐름을 확인해보세요.


