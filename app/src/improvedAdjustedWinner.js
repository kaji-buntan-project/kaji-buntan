import makeTaskRepartiton from "../src/makeTaskRepartiton";
import {SumArray, DeleteFromArray, AddIntoArray, MaxArray, nonReduceDiff, isEFone} from "../src/util";

// 現在利用していない
// function adjustedWinner(aliceUtility,bobUtility,taskList,currentTaskRepartition){
//     let AliceAllocation = Array.from(Array(aliceUtility.length), (v, k) => k);
//     let BobAllocation = [];
//     let alist = [];
//     for (let i=0; i < AliceAllocation.length; i++){
//         //console.log(isString(key));
//         alist.push([AliceAllocation[i], bobUtility[AliceAllocation[i]]/aliceUtility[AliceAllocation[i]]]);
//     }
//     alist.sort((a, b) => (a[1]-b[1]));
//     let t = 0;
//     for (let i=0; i < alist.length; i++){
//         if(isEFone(aliceUtility,bobUtility,AliceAllocation,BobAllocation)==true){
//             break;
//         }
//         if(t < alist.length){
//             AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
//             BobAllocation.push(alist[t][0]);
//             //console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
//             t++;
//         }
//     }

//     const aliceTask = [];
//     for (let i of AliceAllocation) {
//         aliceTask.push(taskList[i]);
//     }
//     const bobTask = [];
//     for (let i of BobAllocation) {
//         bobTask.push(taskList[i]);
//     }

//     let myTasks = {};
//     let partnerTasks = {};
//     [myTasks, partnerTasks] = makeTaskRepartiton(aliceTask, bobTask, currentTaskRepartition)
//     //console.log("Output of the AW algorithm",{ myTasks: myTasks, partnerTasks: partnerTasks})
//     return { myTasks: myTasks, partnerTasks: partnerTasks};
// }



export default function improvedAdjustedWinner(aliceBurdenDict, bobBurdenDict, taskDict, currentTaskRepartition) {
    // currentTaskRepartition: {'me': {participates: number, effort: number, duration: number, category: categoryObject.name, userModified: boolean}, 'partner':{participates: boolean, effort: number, duration: number, category: categoryObject.name, userModified: boolean}}
    
    // aliceBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    // bobBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    // let aliceAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    // let bobAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    // let taskDict = {}; // dict {'task.name': number}  task.checked==true になっている家事の総回数

    let ranNum = Math.random();
    let AliceAllocation = [];
    let BobAllocation = [];
    if (ranNum >= 0.5){
        AliceAllocation = Array.from(Array(aliceUtility.length), (v, k) => k);
        BobAllocation = [];
        let alist = [];
        for (let i=0; i < AliceAllocation.length; i++){
            //console.log(isString(key));
            alist.push([AliceAllocation[i], bobUtility[AliceAllocation[i]]/aliceUtility[AliceAllocation[i]]]);
        }
        alist.sort((a, b) => (a[1]-b[1]));
        let t = 0;
        for (let i=0; i < alist.length; i++){
            if(isEFone(aliceUtility,bobUtility,AliceAllocation,BobAllocation)==true){
                break;
            }
            if(t < alist.length){
                AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
                BobAllocation.push(alist[t][0]);
                //console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
                t++;
            }
        }
        for (let i = t+1; i < alist.length; i++){
            const BAU=[];
            const BBU=[];
            let aAllocation = DeleteFromArray(AliceAllocation, alist[i][0]);
            let bAllocation = AddIntoArray(BobAllocation, alist[i][0]);
            for (let j=0; j < aAllocation.length; j++){
                BAU.push(bobUtility[aAllocation[j]]);
            }
            for (let k=0; k < bAllocation.length; k++){
                BBU.push(bobUtility[bAllocation[k]]);
            }
            if(SumArray(BBU) > SumArray(BAU) || nonReduceDiff(aAllocation,bAllocation,AliceAllocation,BobAllocation,aliceUtility,bobUtility)){
                break;
            }
            
            AliceAllocation = DeleteFromArray(AliceAllocation, alist[i][0]);
            BobAllocation.push(alist[i][0]);
            //console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
        }
    }else{
        AliceAllocation = [];
        BobAllocation = Array.from(Array(bobUtility.length), (v, k) => k);
        let blist = [];
        for (let i=0; i < BobAllocation.length; i++){
            //console.log(isString(key));
            blist.push([BobAllocation[i], aliceUtility[BobAllocation[i]]/bobUtility[BobAllocation[i]]]);
        }
        blist.sort((a, b) => (a[1]-b[1]));
        let t = 0;
        for (let i=0; i < blist.length; i++){
            if(isEFone(aliceUtility,bobUtility,AliceAllocation,BobAllocation)==true){
                break;
            }
            if(t < blist.length){
                BobAllocation = DeleteFromArray(BobAllocation, blist[t][0]);
                AliceAllocation.push(blist[t][0]);
                //console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
                t++;
            }
        }
        for (let i = t+1; i < blist.length; i++){
            const ABU=[];
            const AAU=[];
            let aAllocation = AddIntoArray(AliceAllocation, blist[i][0]);
            let bAllocation = DeleteFromArray(BobAllocation, blist[i][0]);
            for (let j=0; j < bAllocation.length; j++){
                ABU.push(aliceUtility[bAllocation[j]]);
            }
            for (let k=0; k < aAllocation.length; k++){
                AAU.push(aliceUtility[aAllocation[k]]);
            }
            if(SumArray(AAU) > SumArray(ABU) || nonReduceDiff(aAllocation,bAllocation,AliceAllocation,BobAllocation,aliceUtility,bobUtility)){
                break;
            }
            BobAllocation = DeleteFromArray(BobAllocation, blist[i][0]);
            AliceAllocation.push(blist[i][0]);
            //console.log(`AliceAllocation: ${AliceAllocation}, BobAllocation: ${BobAllocation}`);
        }
    }
    const aliceTask = [];
    for (let i of AliceAllocation) {
        aliceTask.push(taskList[i]);
    }
    const bobTask = [];
    for (let i of BobAllocation) {
        bobTask.push(taskList[i]);
    }
    let myTasks = {};
    let partnerTasks = {};
    [myTasks, partnerTasks] = makeTaskRepartiton(aliceTask, bobTask, currentTaskRepartition)
    //console.log("Output of the AW algorithm",{ myTasks: myTasks, partnerTasks: partnerTasks})
    return { myTasks: myTasks, partnerTasks: partnerTasks};
}