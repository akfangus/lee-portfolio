"use client";

import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SkillItem, CATEGORIES } from "@/features/consts";
import { useQueryState } from "nuqs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// API 호출 함수
const fetchSkills = async (): Promise<SkillItem[]> => {
  const response = await fetch("/api/images");
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return response.json();
};

// 카테고리 순서 인덱스 맵핑 (정렬용)
const categoryOrder = CATEGORIES.reduce((acc, cat, index) => {
  acc[cat.id] = index;
  return acc;
}, {} as Record<string, number>);

export function SkillList() {
  const [category] = useQueryState("category");

  const {
    data: skills = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 60,
    select: (data) => {
      // 데이터 페칭 후 카테고리 순서대로 정렬
      return [...data].sort((a, b) => {
        const orderA = categoryOrder[a.category] ?? 999;
        const orderB = categoryOrder[b.category] ?? 999;
        return orderA - orderB;
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 px-2 w-full max-w-xl mt-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-stone-800 shadow-sm animate-pulse w-16 h-16 mx-auto"
          >
            <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-20 flex justify-center">
        <p className="text-red-500">스킬 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-4 px-2 w-full max-w-xl mt-12">
        {skills.map((skill) => {
          // 카테고리가 선택되어 있고, 해당 스킬의 카테고리와 다르면 블러 처리
          const isBlur = category && skill.category !== category;

          return (
            <Tooltip key={skill.id} delayDuration={200}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-stone-800 shadow-sm transition-all duration-500 cursor-default w-16 h-16 mx-auto",
                    isBlur
                      ? "opacity-30 blur-[2px] scale-95 grayscale pointer-events-none"
                      : "opacity-100 scale-100 hover:shadow-md hover:-translate-y-1"
                  )}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={skill.iconSrc}
                      alt={skill.name}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                  {/* 기존 텍스트는 숨김 처리 */}
                  <span className="sr-only">{skill.name}</span>
                </div>
              </TooltipTrigger>
              {/* 블러 처리된 상태에서는 툴팁 내용 렌더링 안 함 */}
              {!isBlur && (
                <TooltipContent side="bottom" className="font-medium">
                  <p>{skill.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
