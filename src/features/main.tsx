import { HieutIcon, IeungIcon, SiotIcon } from "@/components/ui/svg";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <IeungIcon className="w-10 h-10" />
        <SiotIcon className="w-10 h-10" />
        <HieutIcon className="w-10 h-10" />
      </div>
      <div>
        <p>안녕하세요 프론트엔드 개발자 </p>
        <p>이신행입니다</p>
      </div>
    </div>
  );
}
