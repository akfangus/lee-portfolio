import { HieutIcon, IeungIcon, SiotIcon } from "@/components/ui/svg";
import { Resume } from "./intro/resume";
import { CoreCompotency } from "./intro/core-compotency";

export function Intro() {
  return (
    <section
      id="intro"
      className=" flex flex-col items-center justify-center w-full gap-4 min-h-[90vh]"
    >
      <div className="flex items-center justify-center mt-20">
        <IeungIcon className="w-32 h-32 intro-icon" />
        <SiotIcon className="w-32 h-32 intro-icon" />
        <HieutIcon className="w-32 h-32 intro-icon" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center ">
        <p className="text-4xl ">안녕하세요 프론트엔드 개발자 </p>
        <p className="text-4xl ">
          <span className="text-blue-500">이신행</span> 입니다
        </p>
      </div>
      <div className="flex flex-col  items-center justify-center ">
        <p className="text-md text-stone-500">
          React를 중심으로 웹 프론트엔드를 개발합니다.
        </p>
        <p className="text-md text-stone-500">
          사용자 중심의 UI를 구조적으로 개발하려고 노력합니다.
        </p>
      </div>
      <div className="mt-8">
        <Resume />
      </div>
      <CoreCompotency />
    </section>
  );
}
