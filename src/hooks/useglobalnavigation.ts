"use client"

import { useEffect, useState } from "react"

export const NAV_ITEMS = [
  { id: "skills", label: "기술" },
  { id: "experience", label: "경험" },
  { id: "blog", label: "블로그" },
] as const

export type SectionId = (typeof NAV_ITEMS)[number]["id"]

export function useGlobalNavigation() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    // 1. 현재 보고 있는 섹션 감지 (네비게이션 하이라이팅용)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-64px 0px -50% 0px",
        threshold: 0,
      }
    )

    // 2. Sticky 모드 감지 (Intro 섹션 기준)
    // scroll 이벤트 대신 IntersectionObserver를 사용하여 성능 최적화
    const stickyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Intro 섹션의 bottom이 뷰포트 상단보다 위로 올라갔거나(안보임),
          // 교차하지 않으면서 뷰포트 위에 있을 때 Sticky 처리

          // isIntersecting이 false일 때: 화면에 안 보임
          // boundingClientRect.top < 0: 화면 위쪽으로 사라짐 (아래쪽 아님)
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setIsSticky(true)
          } else {
            setIsSticky(false)
          }
        })
      },
      {
        // GNB 높이만큼의 여유를 두고 감지
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0,
      }
    )

    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id))
    const introSection = document.getElementById("intro")

    sections.forEach((section) => {
      if (section) sectionObserver.observe(section)
    })

    if (introSection) {
      stickyObserver.observe(introSection)
    }

    return () => {
      sectionObserver.disconnect()
      stickyObserver.disconnect()
    }
  }, [])

  return {
    activeSection,
    navItems: NAV_ITEMS,
    isSticky,
  }
}
