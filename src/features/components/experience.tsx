import { EXPERIENCE_DATA } from "@/features/consts";
import { ExperienceItem } from "@/features/components/experience/experience-item";

export function Experience() {
  return (
    <section
      id="experience"
      className="w-full py-20 flex flex-col items-center gap-12"
    >
      <h2 className="text-4xl font-bold text-stone-900 dark:text-white">
        경력사항
      </h2>

      <div className="flex gap-4 items-center w-full md:max-w-[768px] mx-auto mt-8 mb-8">
        <div className="flex-1 h-[1px] bg-gradient-to-l from-stone-900/15 dark:from-white/15 to-transparent"></div>
        <p className="flex-shrink-0 text-xs md:text-sm text-stone-900/50 dark:text-white/50">
          업무 경험
        </p>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-stone-900/15 dark:from-white/15 to-transparent"></div>
      </div>

      <div className="w-full md:max-w-[768px] flex flex-col gap-6 px-4 md:px-0">
        {EXPERIENCE_DATA.map((item) => (
          <ExperienceItem key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}
