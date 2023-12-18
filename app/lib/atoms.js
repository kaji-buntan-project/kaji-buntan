import { atom } from "jotai";
import { getInitialTaskRepartition } from "./getInitialTaskRepartition";
import constants from "../src/constants";
import makeAliceBobUtility from "src/mainAlgorithm";

export const currentTaskRepartitionAtom = atom(getInitialTaskRepartition());
export const allTasksAtom = atom(constants.allTasks);

export const leastRepartitionAtom = atom(getInitialTaskRepartition());

export const adjustedRepartitionAtom = atom(getInitialTaskRepartition());
