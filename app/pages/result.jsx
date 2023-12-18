import ResultTabComponent from "../components/resultTabComponent";
import { useAtom } from "jotai";

import { currentTaskRepartitionAtom, leastepartitionAtom, adjustedRepartitionAtom, allTasksAtom, setAdjustedRepartition } from "../lib/atoms.js";

export default function Result() {
  const [allTasks] = useAtom(allTasksAtom);

  return (
    <>
      <ResultTabComponent
        currentTaskRepartition={currentTaskRepartitionAtom.init}
        // leastRepartition={leastRepartitionAtom.init}
        // adjustedRepartition={adjustedRepartitionAtom.init}
        setAdjustedRepartition={setAdjustedRepartition}
        allTasks={allTasks}
      ></ResultTabComponent>
    </>
  );
}