"use client"

import { Suspense } from "react"
import { useInView } from "react-intersection-observer"
import { SkillTabs } from "./skills/skill-tabs"
import { SkillList } from "./skills/skill-list"

export function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      id="skills"
      className={`w-full py-20 flex flex-col items-center gap-12 ${
        inView ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <h2 className="text-4xl font-bold text-stone-900 dark:text-white">
        아래 기술들을 사용할 수 있습니다.
      </h2>

      <Suspense
        fallback={
          <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-pulse text-stone-400">Loading...</div>
          </div>
        }
      >
        <SkillTabs />
        <SkillList />
      </Suspense>
    </section>
  )
}
