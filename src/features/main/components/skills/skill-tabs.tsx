"use client";

import { CATEGORIES } from "@/features/main/consts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab/tab";
import { useQueryState } from "nuqs";

export function SkillTabs() {
  const [category, setCategory] = useQueryState("category", {
    shallow: false, // URL 변경 시 스크롤 유지 및 서버 요청 여부 제어
  });

  const handleTabClick = (value: string) => {
    if (category === value) {
      setCategory(null); // 이미 선택된 탭을 다시 클릭하면 선택 해제
    } else {
      setCategory(value); // 새로운 탭 선택
    }
  };

  return (
    <Tabs value={category || ""} className="w-full flex justify-center ">
      <TabsList className="h-auto p-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full gap-2">
        {CATEGORIES.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            onClick={() => handleTabClick(cat.id)} // Radix의 onValueChange 대신 직접 제어
            className=" cursor-pointer rounded-full px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
