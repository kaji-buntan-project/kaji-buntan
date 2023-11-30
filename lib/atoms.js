import { atom } from "jotai";
import { getInitialTaskRepartition } from "./getInitialTaskRepartition";
import constants from "../src/constants";

export const currentTaskRepartitionAtom = atom(getInitialTaskRepartition());
export const allTasksAtom = atom(constants.allTasks);
