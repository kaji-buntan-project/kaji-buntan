
// import constants from "../src/constants";
//const allTasks = constants.allTasks

// import calculateBurden from "../src/calculateBurden";
// import improvedAdjustedWinner from "../src/improvedAdjustedWinner";
// import leastChangeAllocation from "../src/leastChangeAllocation";

import React, { useState, useEffect } from 'react';
import { improved_adjusted_winner } from 'wasm_rust_project/pkg';

export default function makeAliceBobUtility(allTasks, currentTaskRepartition){

    // currentTaskRepartition: {'me': {participates: number, effort: number, duration: number, category: categoryObject.name, userModified: boolean}, 'partner':{participates: boolean, effort: number, duration: number, category: categoryObject.name, userModified: boolean}}
    
    // let aliceBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    // let bobBurdenDict = {}; // dict {'task.name': number} 各家事に対する負担度(1単位)
    // let aliceAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    // let bobAllocationDict = {}; // dict {'task.name': number} 各家事の回数
    // let taskDict = {}; // dict {'task.name': number}  task.checked==true になっている家事の総回数

    // task_total_num_list: Vec<i32>, alice_burden_list: Vec<i32>, bob_burden_list: Vec<i32>, を作成

    let task_total_num_list = [];
    let alice_burden_list = [];
    let bob_burden_list = [];

    for (let category of allTasks){
        for (let task of category.children){
            if (task.checked){
                task_total_num_list.push(task.myDefault + task.partnerDefault);
                alice_burden_list.push(calculateBurden(currentTaskRepartition.myTasks[task.name].effort, currentTaskRepartition.myTasks[task.name].duration));
                bob_burden_list.push(calculateBurden(currentTaskRepartition.partnerTask1[task.name].effort, currentTaskRepartition.partnerTask1[task.name].duration));
            }
        }
    }
    useEffect(() => {
        // ここで wasm モジュールの関数を呼び出す
        let alliceAllocation, bobAllocation = improved_adjusted_winner(task_total_num_list, alice_burden_list, bob_burden_list);
        console.log(alliceAllocation);
        console.log(bobAllocation);
    }, []);

    // let adjustedWinnerTaskRepartition = improvedAdjustedWinner(aliceBurdenDict, bobBurdenDict, taskDict, currentTaskRepartition);
    // let leastChangeAllocationTaskRepartition = leastChangeAllocation(aliceBurdenDict, bobBurdenDict, aliceAllocationDict, bobAllocationDict, taskDict, currentTaskRepartition);
    
    return (alliceAllocation, bobAllocation);
}

