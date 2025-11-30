import { HieutIcon, IeungIcon, SiotIcon } from "@/components/ui/svg";

export function Intro() {
  return (
    <section
      id="intro"
      className=" flex flex-col items-center justify-center w-full gap-4 h-[90vh]"
    >
      <div className="flex items-center justify-center">
        <IeungIcon className="w-32 h-32 intro-icon" />
        <SiotIcon className="w-32 h-32 intro-icon" />
        <HieutIcon className="w-32 h-32 intro-icon" />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <p className="text-2xl ">안녕하세요 프론트엔드 개발자 </p>
        <p className="text-2xl ">이신행입니다</p>
      </div>
    </section>
  );
}
