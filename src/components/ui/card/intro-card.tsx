import Image from "next/image";
import { memo } from "react";

interface IntroCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

function IntroCardBase({ title, description, imageSrc }: IntroCardProps) {
  return (
    <div className="flex flex-col items-center  bg-white dark:bg-stone-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 dark:border-stone-800 h-full">
      <div className="relative w-full aspect-square  overflow-hidden rounded-t-2xl bg-stone-100 dark:bg-stone-800">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 720px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-3 text-stone-900 dark:text-stone-100 text-center">
          {title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 text-center leading-relaxed word-keep-all line-clamp-8">
          {description}
        </p>
      </div>
    </div>
  );
}

export const IntroCard = memo(IntroCardBase);
