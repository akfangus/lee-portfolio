import { IntroCard } from "@/components/ui/card/intro-card";
import { COMPETENCY_DATA } from "@/features/main/consts";

export function CoreCompotency() {
  return (
    <div className="w-full px-4 my-8">
      <div className="grid grid-cols-1 min-[720px]:grid-cols-3 gap-4 md:gap-6">
        {COMPETENCY_DATA.map((item) => (
          <IntroCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
