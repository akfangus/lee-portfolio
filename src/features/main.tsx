import { GNB, Intro } from "./components";

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Intro />
      <GNB />

      <section id="skills" className="w-full h-[1000px] bg-amber-300">
        test
      </section>
      <section id="experience" className="w-full h-[1000px] bg-emerald-400">
        test
      </section>
      <section id="projects" className="w-full h-[1000px] bg-blue-500">
        test
      </section>
      <section id="blog" className="w-full h-[1000px] bg-purple-500">
        test
      </section>
    </div>
  );
}
