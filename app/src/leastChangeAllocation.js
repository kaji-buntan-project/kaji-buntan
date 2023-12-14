import makeTaskRepartiton from "../src/makeTaskRepartiton";
import {SumArray, DeleteFromArray, AddIntoArray, MaxArray, nonReduceDiff, isEFone} from "../src/util";

export default function leastChangeAllocation(aliceBurdenDict, bobBurdenDict, aliceAllocationDict, bobAllocationDict, taskList, currentTaskRepartition) {
    let aliceAllocationIndex = [];
    let bobAllocationIndex = [];
    for (let i=0; i < aliceAllocation.length; i++){
        let indexa = taskList.indexOf(aliceAllocation[i]);
        aliceAllocationIndex.push(indexa);
    }
    for (let i=0; i < bobAllocation.length; i++){
        let indexb = taskList.indexOf(bobAllocation[i]);
        bobAllocationIndex.push(indexb);
    }
    if(isEFone(aliceUtility,bobUtility,aliceAllocationIndex,bobAllocationIndex)){
        return currentTaskRepartition;
    }
    else{
        let AAU=[];
        let BAU=[];
        let ABU=[];
        let BBU=[];
        //console.log(aliceAllocation);
        for (let i=0; i < aliceAllocation.length; i++){
            let indexa = taskList.indexOf(aliceAllocation[i]);
            AAU.push(aliceUtility[indexa]);
            BAU.push(bobUtility[indexa]);
        }
        for (let i=0; i < bobAllocation.length; i++){
            let indexb = taskList.indexOf(bobAllocation[i]);
            ABU.push(aliceUtility[indexb]);
            BBU.push(bobUtility[indexb]);
        }
        if(SumArray(BBU)- MaxArray(BBU) > SumArray(BAU)){
            let alist = [];
            for (let i=0; i < bobAllocation.length; i++){
                let indexb = taskList.indexOf(bobAllocation[i]);
                alist.push([indexb, aliceUtility[indexb]/bobUtility[indexb]]);
            }
            alist.sort((a, b) => (a[1]-b[1]));
            bobAllocation = DeleteFromArray(bobAllocation, taskList[alist[0][0]]);
            aliceAllocation.push(taskList[alist[0][0]]);
        }
        AAU=[];
        BAU=[];
        ABU=[];
        BBU=[];
        for (let i=0; i < aliceAllocation.length; i++){
            let indexa = taskList.indexOf(aliceAllocation[i]);
            AAU.push(aliceUtility[indexa]);
            BAU.push(bobUtility[indexa]);
        }
        for (let i=0; i < bobAllocation.length; i++){
            let indexb = taskList.indexOf(bobAllocation[i]);
            ABU.push(aliceUtility[indexb]);
            BBU.push(bobUtility[indexb]);
        }
        if(SumArray(AAU) - MaxArray(AAU) > SumArray(ABU)){
            let alist = [];
            for (let i=0; i < aliceAllocation.length; i++){
                let indexa = taskList.indexOf(aliceAllocation[i]);
                alist.push([indexa, bobUtility[indexa]/aliceUtility[indexa]]);
            }
            alist.sort((a, b) => (a[1]-b[1]));
            aliceAllocation = DeleteFromArray(aliceAllocation, taskList[alist[0][0]]);
            bobAllocation.push(taskList[alist[0][0]]);
        }
        //console.log(`AliceAllocation: ${aliceAllocation}, BobAllocation: ${bobAllocation}`);
        let myTasks = {};
        let partnerTasks = {};
        [myTasks, partnerTasks] = makeTaskRepartiton(aliceAllocation, bobAllocation, currentTaskRepartition)
        //console.log("Output of the least exchange algorithm", { myTasks: myTasks, partnerTasks: partnerTasks})
      
      return { myTasks: myTasks, partnerTasks: partnerTasks};
    }
}