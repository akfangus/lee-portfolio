import { HieutIcon, IeungIcon, SiotIcon } from "@/components/ui/svg";

export function Intro() {
  return (
    <section id="intro" className="w-full h-[90vh]">
      <div className="flex items-center justify-center">
        <IeungIcon className="w-10 h-10" />
        <SiotIcon className="w-10 h-10" />
        <HieutIcon className="w-10 h-10" />
      </div>
      <div>
        <p>안녕하세요 프론트엔드 개발자 </p>
        <p>이신행입니다</p>
      </div>
    </section>
  );
}
