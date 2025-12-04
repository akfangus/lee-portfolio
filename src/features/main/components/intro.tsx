import { HieutIcon, IeungIcon, SiotIcon } from "@/components/ui/svg"
import { Resume } from "./intro/resume"
import { CoreCompotency } from "./intro/core-compotency"
import { Profile } from "./intro/profile"
import { Greet } from "./intro/greet"

export function Intro() {
  return (
    <section
      id="intro"
      className=" flex flex-col items-center justify-center w-full gap-4 min-h-[90vh]"
    >
      <div className="flex items-center justify-center mt-20 mb-10">
        <IeungIcon className="w-32 h-32 intro-icon" />
        <SiotIcon className="w-32 h-32 intro-icon" />
        <HieutIcon className="w-32 h-32 intro-icon" />
      </div>
      <Greet />
      <Profile />
      <Resume />
      <CoreCompotency />
    </section>
  )
}
