# CI/CD 가이드

## 📚 목차

1. [CI/CD란?](#cicd란)
2. [프로젝트 현재 상태](#프로젝트-현재-상태)
3. [구현된 CI/CD](#구현된-cicd)
4. [전체 플로우](#전체-플로우)
5. [상세 가이드](#상세-가이드)

---

## CI/CD란?

**CI (Continuous Integration)**: 코드 통합 시 자동 검증 (타입 체크, 린트, 빌드)  
**CD (Continuous Deployment)**: 검증된 코드 자동 배포

---

## 프로젝트 현재 상태

### 완료된 작업

1. **Vercel 배포** ✅ - GitHub 연동, 자동 배포, 도메인 연결 (goddddd.dev)
2. **lefthook + lint-staged** ✅ - 커밋 전 자동 검증
3. **GitHub Actions CI** ✅ - PR/푸시 시 자동 검증

### 배포 플로우

```
코드 작성 → lefthook (로컬 검증) → git commit → git push 
→ GitHub Actions (원격 검증) → Vercel 배포 → goddddd.dev 업데이트
```

---

## 구현된 CI/CD

### 1. lefthook + lint-staged (로컬 검증)

- **실행 시점**: `git commit` 시도할 때
- **검사 항목**: ESLint 린트 검사, 자동 수정
- **장점**: 빠른 피드백, 실수 방지, 변경된 파일만 검사

[상세 가이드](./lefthook-lint-staged.md)

### 2. GitHub Actions CI (원격 검증)

- **실행 시점**: `git push`, PR 생성 시
- **검사 항목**: TypeScript 타입 체크, ESLint, Next.js 빌드
- **장점**: 팀 전체 검증, 표준화된 환경, PR에 검증 결과 표시

[상세 가이드](./github-actions.md)

### 3. Vercel Auto Deploy (자동 배포)

- **실행 시점**: main 브랜치 푸시, PR 생성 (Preview)
- **배포 환경**: 프로덕션 (goddddd.dev), Preview (PR마다 임시 URL)

---

## 전체 플로우

### 개발자 관점

```
1. 코드 작성
2. git add (staged)
3. git commit → lefthook 실행 (ESLint 검사)
4. git push
5. GitHub Actions 실행 (타입 체크 → 린트 → 빌드)
6. Vercel 자동 배포
7. goddddd.dev 업데이트
```

### PR 생성 시

```
feature 브랜치 → git push → PR 생성 
→ GitHub Actions 실행 → Vercel Preview 배포 
→ 팀원 리뷰 → 머지 → 프로덕션 배포
```

---

## 상세 가이드

- [lefthook + lint-staged 가이드](./lefthook-lint-staged.md)
- [GitHub Actions 가이드](./github-actions.md)

### 설정 파일

- `.lefthook.yml` - lefthook 설정
- `.github/workflows/ci.yml` - GitHub Actions 워크플로우
- `package.json` - lint-staged 설정

---

## 체크리스트

- [x] lefthook 설치 및 설정
- [x] lint-staged 설정
- [x] GitHub Actions CI 파이프라인 설정
- [x] Vercel 배포 설정
- [x] 도메인 연결

---

## 다음 단계

### Level 2 (추후 구현)
- 테스트 환경 구축 (Vitest, React Testing Library)
- 의존성 관리 (Dependabot)

### Level 3 (추후 구현)
- 성능 모니터링 (Lighthouse CI)
- 에러 모니터링 (Sentry)
- E2E 테스트 (Playwright)
