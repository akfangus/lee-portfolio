# CI/CD 가이드

## 📚 목차

1. [CI/CD란?](#cicd란)
2. [프로젝트 현재 상태](#프로젝트-현재-상태)
3. [구현된 CI/CD](#구현된-cicd)
4. [전체 플로우](#전체-플로우)
5. [상세 가이드](#상세-가이드)

---

## CI/CD란?

**CI/CD**는 **Continuous Integration (지속적 통합)**과 **Continuous Deployment (지속적 배포)**의 약자입니다.

### CI (Continuous Integration)

코드를 통합할 때마다 자동으로 검증하는 프로세스입니다.

**하는 일:**
- ✅ 타입 체크
- ✅ 린트 검사
- ✅ 테스트 실행
- ✅ 빌드 확인

**목적:**
- 버그를 빨리 발견
- 코드 품질 유지
- 팀 전체의 일관성 확보

### CD (Continuous Deployment)

검증된 코드를 자동으로 배포하는 프로세스입니다.

**하는 일:**
- ✅ 검증 통과한 코드만 배포
- ✅ 자동 배포 (Vercel)
- ✅ Preview 배포 (PR마다)

**목적:**
- 배포 시간 단축
- 실수 방지
- 빠른 피드백

---

## 프로젝트 현재 상태

### 완료된 작업

1. **Vercel 배포 설정** ✅
   - GitHub 저장소와 Vercel 연동
   - 자동 배포 설정 완료
   - 도메인 연결 (goddddd.dev)

2. **lefthook + lint-staged** ✅
   - 커밋 전 자동 검증
   - 로컬에서 빠른 피드백

3. **GitHub Actions CI** ✅
   - PR/푸시 시 자동 검증
   - 타입 체크, 린트, 빌드 자동화

### 배포 플로우

```
코드 작성
    ↓
lefthook (로컬 검증) ✅
    ↓
git commit
    ↓
git push
    ↓
GitHub Actions (원격 검증) ✅
    ↓
검증 통과
    ↓
Vercel 자동 배포 ✅
    ↓
goddddd.dev 업데이트
```

---

## 구현된 CI/CD

### 1. lefthook + lint-staged (로컬 검증)

**목적**: 커밋 전에 자동으로 코드 품질 검사

**실행 시점**: `git commit` 시도할 때

**검사 항목:**
- ESLint 린트 검사
- 자동 수정 가능한 문제는 자동 수정

**장점:**
- ✅ 빠른 피드백 (커밋 전)
- ✅ 실수 방지
- ✅ 변경된 파일만 검사 (효율적)

**상세 가이드**: [lefthook + lint-staged 가이드](./lefthook-lint-staged.md)

### 2. GitHub Actions CI (원격 검증)

**목적**: PR이나 푸시 시 자동으로 코드 품질 검증

**실행 시점**: 
- `git push` 할 때
- PR 생성할 때

**검사 항목:**
- TypeScript 타입 체크
- ESLint 린트 검사
- Next.js 빌드 확인

**장점:**
- ✅ 팀 전체 검증
- ✅ 표준화된 환경
- ✅ PR에 검증 결과 표시

**상세 가이드**: [GitHub Actions 가이드](./github-actions.md)

### 3. Vercel Auto Deploy (자동 배포)

**목적**: 검증된 코드를 자동으로 배포

**실행 시점**: 
- main 브랜치에 푸시할 때
- PR 생성할 때 (Preview 배포)

**배포 환경:**
- 프로덕션: goddddd.dev
- Preview: PR마다 임시 URL 생성

**장점:**
- ✅ 자동 배포
- ✅ Preview 배포로 변경사항 확인
- ✅ 빠른 배포

---

## 전체 플로우

### 개발자 관점

```
1. 코드 작성
   ↓
2. git add (파일 staged)
   ↓
3. git commit 시도
   ↓
4. lefthook 실행 (로컬 검증)
   → ESLint 검사
   → 문제 있으면 커밋 차단 ❌
   → 문제 없으면 커밋 성공 ✅
   ↓
5. git push
   ↓
6. GitHub Actions 실행 (원격 검증)
   → 타입 체크
   → 린트 검사
   → 빌드 확인
   → 모든 검사 통과 ✅
   ↓
7. Vercel 자동 배포
   → 빌드 실행
   → 배포 완료
   ↓
8. goddddd.dev 업데이트 ✅
```

### PR 생성 시

```
1. feature 브랜치에서 작업
   ↓
2. git push origin feature/new-feature
   ↓
3. GitHub에서 PR 생성
   ↓
4. GitHub Actions 실행
   → 검증 통과 ✅
   → PR에 체크마크 표시
   ↓
5. Vercel Preview 배포
   → 임시 URL 생성
   → PR에 Preview URL 표시
   ↓
6. 팀원 리뷰
   → Preview URL에서 실제 동작 확인
   → 코드 리뷰
   ↓
7. 머지 승인
   ↓
8. main 브랜치로 머지
   ↓
9. Vercel 프로덕션 배포
   → goddddd.dev 업데이트
```

---

## 상세 가이드

### 📖 가이드 문서

1. **[lefthook + lint-staged 가이드](./lefthook-lint-staged.md)**
   - Git Hooks란?
   - lefthook 설정 방법
   - lint-staged 설정 방법
   - 사용 방법 및 문제 해결

2. **[GitHub Actions 가이드](./github-actions.md)**
   - GitHub Actions란?
   - CI 파이프라인 설정 방법
   - 워크플로우 구조 이해
   - 실제 사용 예시

### 🔧 설정 파일

1. **`.lefthook.yml`**
   - lefthook 설정 파일
   - pre-commit 훅 정의

2. **`.github/workflows/ci.yml`**
   - GitHub Actions 워크플로우
   - CI 파이프라인 정의

3. **`package.json`**
   - lint-staged 설정
   - npm 스크립트

---

## 체크리스트

### 설정 완료 확인

- [x] lefthook 설치 및 설정
- [x] lint-staged 설정
- [x] GitHub Actions CI 파이프라인 설정
- [x] Vercel 배포 설정
- [x] 도메인 연결

### 테스트 확인

- [ ] 커밋 시 lefthook 동작 확인
- [ ] 푸시 시 GitHub Actions 동작 확인
- [ ] PR 생성 시 CI 동작 확인
- [ ] Vercel 배포 동작 확인

---

## 다음 단계

### Level 2: 중급 (추후 구현 가능)

1. **테스트 환경 구축**
   - Vitest 설정
   - React Testing Library
   - 컴포넌트 테스트 작성

2. **의존성 관리**
   - Dependabot 설정
   - 보안 취약점 자동 스캔

### Level 3: 고급 (추후 구현 가능)

1. **성능 모니터링**
   - Lighthouse CI
   - Bundle Size Check

2. **에러 모니터링**
   - Sentry 연동
   - 실시간 에러 추적

3. **E2E 테스트**
   - Playwright 설정
   - 사용자 시나리오 테스트

---

## 요약

### 현재 구현된 CI/CD

1. **로컬 검증** (lefthook + lint-staged)
   - 커밋 전 자동 검증
   - 빠른 피드백

2. **원격 검증** (GitHub Actions)
   - PR/푸시 시 자동 검증
   - 팀 전체 코드 품질 보장

3. **자동 배포** (Vercel)
   - 검증 통과한 코드만 배포
   - Preview 배포 지원

### 핵심 가치

- ✅ **빠른 피드백**: 문제를 빨리 발견하고 수정
- ✅ **코드 품질**: 일관된 코드 품질 유지
- ✅ **자동화**: 반복 작업 자동화로 개발에 집중
- ✅ **안전한 배포**: 검증된 코드만 배포

---

## 참고 자료

- [lefthook 공식 문서](https://github.com/evilmartians/lefthook)
- [lint-staged 공식 문서](https://github.com/lint-staged/lint-staged)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Vercel 공식 문서](https://vercel.com/docs)


