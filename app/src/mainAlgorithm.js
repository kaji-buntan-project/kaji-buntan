
import constants from "../src/constants";
const allTasks = constants.allTasks

import calculateBurden from "../src/calculateBurden";
import improvedAdjustedWinner from "../src/improvedAdjustedWinner";
import leastChangeAllocation from "../src/leastChangeAllocation";


export default function makeAliceBobUtility(allTasks, currentTaskRepartition){
    let aliceBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    let bobBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    let aliceAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    let bobAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    let taskList = []; // string[] // task.checked==true の家事リスト

    for (let category of allTasks){
        for (let task of category.children){
            if (task.checked){
                const myTask1 = currentTaskRepartition['myTasks'][task.name];
                aliceBurdenDict[task.name] = calculateBurden(myTask1.effort, myTask1.duration);
                aliceAllocationDict[task.name] = myTask1.participates;
                // 0回も辞書に加える.

                const partnerTask1 = currentTaskRepartition['partnerTasks'][task.name];
                bobBurdenDict[task.name] = calculateBurden(partnerTask1.effort, partnerTask1.duration);
                bobAllocationDict[task.name] = partnerTask1.participates;
                // 0回も辞書に加える.

                taskList.push(task.name);
            }
        }
    }

    let adjustedWinnerTaskRepartition = improvedAdjustedWinner(aliceBurdenDict,bobBurdenDict,taskList,currentTaskRepartition);
    let leastChangeAllocationTaskRepartition = leastChangeAllocation(aliceBurdenDict, bobBurdenDict, aliceAllocationDict, bobAllocationDict, taskList, currentTaskRepartition);
    
    return [adjustedWinnerTaskRepartition, leastChangeAllocationTaskRepartition];
}

