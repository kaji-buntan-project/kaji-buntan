import constants from "./constants";
const allTasks = constants.allTasks



export default function detectAllocationChange(currentTaskRepartition, changedTaskRepartition){
  let changedTaskList = [];
  let taskList = Object.keys(changedTaskRepartition.myTasks);

  for(let task of taskList){
      changedTaskList.push(task);
  }
  if (changedTaskList.length == 0){
    return ['unchanged',changedTaskList];
  }else{
    return ['changed',changedTaskList];
  }
}