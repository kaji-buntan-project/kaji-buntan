import ResultTabComponent from "../components/resultTabComponent";
import { useAtom } from "jotai";

import { currentTaskRepartitionAtom, allTasksAtom } from "../lib/atoms.js";

export default function Result() {
  const [allTasks] = useAtom(allTasksAtom);

  return (
    <>
      <ResultTabComponent currentTaskRepartition={currentTaskRepartitionAtom.init} allTasks={allTasks}></ResultTabComponent>
    </>
  );
}
