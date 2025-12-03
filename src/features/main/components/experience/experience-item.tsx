"use client";

import { useState } from "react";
import { ExperienceItem as IExperienceItem } from "@/features/main/consts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ToggleButton } from "@/features/main/components/experience/toggle-button";

interface ExperienceItemProps {
  data: IExperienceItem;
}

export function ExperienceItem({ data }: ExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors">
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
            {data.company}
          </h3>
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full w-fit">
            {data.period}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-medium text-lg">
            <span>{data.department}</span>
            <span className="w-1 h-1 bg-stone-300 dark:bg-stone-600 rounded-full" />
            <span>{data.position}</span>
          </div>
        </div>

        <ToggleButton
          isOpen={isOpen}
          onClick={toggleOpen}
          labelOpen="업무 내용 접기"
          labelClose="업무 내용 자세히보기"
        />
      </div>

      {/* Detail Section (Collapsible with CSS Grid) */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out bg-stone-50/50 dark:bg-stone-800/30",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "p-6 md:p-8 pt-0 border-t border-stone-100 dark:border-stone-800 transition-opacity duration-300 delay-75",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex flex-col gap-10 mt-8">
              {data.projects.map((project, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h4 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                      {project.title}
                    </h4>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      {project.period}
                    </span>
                  </div>

                  {project.description && (
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-1">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 my-1">
                    {project.techStack.map((tech, tIdx) => (
                      <Badge key={tIdx} variant="destructive">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="list-disc list-outside pl-4 space-y-1.5 mt-2">
                    {project.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
