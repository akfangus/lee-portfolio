import { GNB, Intro, Skills } from "./components";
import { Experience } from "./components/experience";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Intro />
      <GNB />
      <Skills />
      <Experience />

      <section id="blog" className="w-full h-[1000px] bg-purple-500">
        test
      </section>
    </div>
  );
}
