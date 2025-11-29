"use client";

import { useEffect, useState } from "react";

export const NAV_ITEMS = [
  { id: "skills", label: "기술" },
  { id: "experience", label: "경험" },
  { id: "projects", label: "프로젝트" },
  { id: "blog", label: "블로그" },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"];

export function useGlobalNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 뷰포트의 상단 부분에 섹션이 들어왔을 때 활성화
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // 헤더 높이만큼 제외하고, 화면의 중간 정도까지를 감지 영역으로 설정
        rootMargin: "-64px 0px -50% 0px",
        threshold: 0,
      }
    );

    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id));

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return {
    activeSection,
    navItems: NAV_ITEMS,
  };
}
