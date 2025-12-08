# lefthook + lint-staged 설정 가이드

## 📚 목차

1. [Git Hooks란?](#git-hooks란)
2. [lefthook이란?](#lefthook이란)
3. [lint-staged란?](#lint-staged란)
4. [설정 방법](#설정-방법)
5. [동작 원리](#동작-원리)
6. [문제 해결](#문제-해결)

---

## Git Hooks란?

Git이 특정 이벤트(커밋, 푸시 등) 전후에 자동 실행하는 스크립트입니다.

**주요 Hooks:**
- `pre-commit`: 커밋 전 실행
- `pre-push`: 푸시 전 실행

**왜 필요한가?**
- 타입/린트 에러가 있는 코드 커밋 방지
- 코드 품질 일관성 유지

---

## lefthook이란?

Git Hooks를 쉽게 관리하는 도구입니다. (Husky 대안)

**장점:**
- 빠른 실행 (병렬 처리)
- 간단한 설정 (YAML 하나)
- TypeScript 지원

---

## lint-staged란?

**staged된 파일만** 선택적으로 린트/포맷팅을 실행하는 도구입니다.

**왜 필요한가?**
- 전체 파일 검사는 느림
- 변경된 파일만 검사하면 빠름

---

## 설정 방법

### 1. 패키지 설치

```bash
npm install -D lefthook lint-staged
```

### 2. lefthook 초기화

```bash
npx lefthook install
```

### 3. `.lefthook.yml` 파일 생성

```yaml
pre-commit:
  parallel: true
  commands:
    lint-staged:
      run: npx lint-staged
      stage_fixed: true
```

### 4. `package.json` 설정

```json
{
  "scripts": {
    "prepare": "lefthook install"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix"
    ]
  }
}
```

---

## 동작 원리

```
코드 수정 → git add → git commit 시도
→ lefthook 실행 → lint-staged 실행
→ staged 파일만 ESLint 검사
→ 문제 없으면 커밋 성공 ✅
→ 문제 있으면 커밋 차단 ❌
```

---

## 사용 방법

### 정상적인 사용

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
# lefthook이 자동 실행, 문제 없으면 커밋 성공
```

### 문제가 있을 때

```bash
git commit -m "feat: 새로운 기능 추가"
# ❌ 커밋 실패
# 에러: ESLint found problems
# 해결: 에러 수정 후 다시 커밋
```

### 건너뛰기 (비추천)

```bash
git commit --no-verify -m "feat: 새로운 기능 추가"
# ⚠️ 코드 품질 검사 건너뜀
```

---

## 문제 해결

### lefthook이 실행되지 않을 때

```bash
npx lefthook install
# 또는
npm run prepare
```

### lint-staged가 실행되지 않을 때

```bash
# package.json의 lint-staged 설정 확인
# 수동 실행 테스트
npx lint-staged
```

### ESLint 에러가 계속 발생할 때

```bash
# 수동으로 ESLint 실행
npx eslint src/components/Button.tsx --fix
```

---

## 요약

**핵심 개념:**
- Git Hooks: Git 이벤트 전후 자동 실행 스크립트
- lefthook: Git Hooks 관리 도구
- lint-staged: staged 파일만 검사하는 도구

**설정 완료 체크리스트:**
- [x] lefthook 설치
- [x] lint-staged 설치
- [x] lefthook 초기화
- [x] `.lefthook.yml` 파일 생성
- [x] `package.json`에 lint-staged 설정 추가
