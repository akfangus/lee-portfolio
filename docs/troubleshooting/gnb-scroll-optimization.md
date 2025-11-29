# GNB 스크롤 성능 최적화 및 애니메이션 구현 트러블슈팅

## 1. 개요

**Global Navigation Bar (GNB)**가 스크롤 시 상단에 고정(Sticky)되면서 형태가 변하는 애니메이션을 구현하는 과정에서 발생한 성능 이슈와 이를 해결하기 위한 최적화 과정을 기록합니다.

---

## 2. 문제 인식 (Initial Challenge)

### 초기 접근 방식

처음에는 가장 직관적인 방법인 `window.scroll` 이벤트를 사용하여 스크롤 위치를 감지했습니다.

```typescript
// ❌ 초기 접근 (의사 코드)
useEffect(() => {
  const handleScroll = () => {
    // 1. 스크롤 이벤트는 픽셀 단위로 발생 (매우 빈번함)
    // 2. getBoundingClientRect() 호출은 강제 리플로우(Reflow)를 유발할 수 있음
    const introBottom = document
      .getElementById("intro")
      ?.getBoundingClientRect().bottom;

    if (introBottom <= 0) setIsSticky(true);
    else setIsSticky(false);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### 발견된 문제점

1.  **메인 스레드 부하**: 스크롤 이벤트는 초당 수십~수백 번 발생합니다. 매번 DOM의 위치를 계산하는 로직이 메인 스레드를 점유하여, 복잡한 페이지에서는 스크롤 버벅임(Jank) 현상을 유발할 수 있습니다.
2.  **Layout Thrashing**: 반복적인 DOM 읽기 작업은 브라우저가 스타일과 레이아웃을 계속 다시 계산하게 만듭니다.

---

## 3. 해결 과정 및 최적화 (Optimization)

### 1단계: Throttle/Debounce 고려

일반적으로 `lodash/throttle`을 사용하여 이벤트 발생 빈도를 제어(예: 100ms마다 실행)하는 방법이 있습니다.

- **장점**: 이벤트 실행 횟수가 현저히 줄어듦.
- **한계**: 여전히 스크롤을 "감시(Polling)"하는 방식이며, 정확한 타이밍에 UI를 변경하기 어려워 시각적인 딜레이가 발생할 수 있습니다.

### 2단계: IntersectionObserver 도입 (최종 해결책)

브라우저의 Native API인 `IntersectionObserver`를 사용하여 "위치 계산"이 아닌 "상태 변화"를 감지하도록 변경했습니다.

**왜 더 좋은가?**

- **비동기 실행**: 메인 스레드를 차단하지 않고 브라우저 내부(C++ 레벨)에서 교차 영역을 감시합니다.
- **Zero Polling**: 스크롤할 때마다 계산하는 것이 아니라, 요소가 화면에서 사라지는 **"딱 그 순간"**에만 콜백을 실행합니다.

```typescript
// ✅ 최적화된 코드
const stickyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // !isIntersecting: 화면에서 사라짐
      // boundingClientRect.top < 0: 위쪽으로 사라짐 (스크롤 다운)
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  },
  { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
);
```

---

## 4. 성능 비교 (Performance Metrics)

사용자가 높이 2000px 페이지를 스크롤하여 GNB를 고정시키는 시나리오를 가정했을 때의 비교입니다.

| 구분                 |        scroll 이벤트         | scroll + Throttle(100ms) |  IntersectionObserver   |
| :------------------- | :--------------------------: | :----------------------: | :---------------------: |
| **이벤트 발생 횟수** |        약 **200회+**         |         약 20회          |   **1회** (교차 시점)   |
| **DOM 접근 횟수**    |            200회+            |           20회           |    0회 (엔진이 처리)    |
| **CPU 점유율**       |     높음 (스크립트 실행)     |           중간           |      **매우 낮음**      |
| **UX 반응성**        | 즉시 반응하나 버벅일 수 있음 |    약간의 딜레이 발생    | **즉시 반응, 부드러움** |

> **결론**: `IntersectionObserver`를 사용함으로써 이벤트 처리 비용을 **약 99% 이상 절감**했습니다.

---

## 5. 애니메이션 구현 원리 (CSS Transition)

Javascript로 `width`나 `border-radius`를 1프레임씩 계산해서 변경하는 방식 대신, **CSS Transition**을 활용한 선언적 애니메이션을 구현했습니다.

### 구현 방식

1.  **State 기반 클래스 스위칭**: React는 단순히 `className`만 변경합니다.
2.  **브라우저 보간(Interpolation)**: `transition-all duration-300`을 통해 브라우저가 시작 상태와 끝 상태 사이를 자동으로 부드럽게 연결합니다.

```tsx
<nav
  className={`transition-all duration-300 ease-in-out ${
    isSticky
      ? "w-fit rounded-full mt-4" // Sticky 상태 (알약 모양)
      : "w-full rounded-none"     // 일반 상태 (직각)
  }`}
>
```

### 이점

- **GPU 가속 활용**: CSS Transition은 브라우저의 컴포지터 스레드(Compositor Thread)에서 처리될 확률이 높아 메인 스레드 부하 없이 부드러운 60fps 애니메이션이 가능합니다.
- **코드 복잡도 감소**: JS로 애니메이션 프레임을 계산하는 복잡한 로직이 필요 없습니다.
