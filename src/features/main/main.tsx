import { GNB, Intro, Skills, Blog } from "./components";
import { Experience } from "./components/experience";

export default function Main(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center">
      <Intro />
      <GNB />
      <Skills />
      <Experience />
      <Blog />
    </div>
  );
}
