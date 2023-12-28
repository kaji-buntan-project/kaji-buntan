
// import constants from "../src/constants";
//const allTasks = constants.allTasks

import calculateBurden from "../src/calculateBurden";
// import improvedAdjustedWinner from "../src/improvedAdjustedWinner";
// import leastChangeAllocation from "../src/leastChangeAllocation";

import React, { useState, useEffect } from 'react';
//import { improved_adjusted_winner, least_change_allocation } from 'wasm_rust_project/pkg';
import * as wasm from "wasm_rust_project/pkg";

function getIndex(taskName, taskList) {
    return taskList[taskName]
}


export default function makeAliceBobUtility(allTasks, currentTaskRepartition){

    // currentTaskRepartition: {'me': {participates: number, effort: number, duration: number, category: categoryObject.name, userModified: boolean}, 'partner':{participates: boolean, effort: number, duration: number, category: categoryObject.name, userModified: boolean}}


    // task_total_num_list: Vec<i32>, alice_burden_list: Vec<i32>, bob_burden_list: Vec<i32>, current_alice_allocation: Vec<i32>, current_bob_allocation:Vec<i32> を作成


    let task_total_num_list = [];
    let alice_burden_list = [];
    let bob_burden_list = [];
    let current_alice_allocation = [];
    let current_bob_allocation = [];

    let taskList = {};
    let counter0 = 0

    console.log("currentTaskRepartition:", currentTaskRepartition);

    for (let category of allTasks){
        for (let task of category.children){
            if (task.checked){
                task_total_num_list.push(task.myDefault + task.partnerDefault);
                alice_burden_list.push(calculateBurden(currentTaskRepartition.myTasks[task.name].effort, currentTaskRepartition.myTasks[task.name].duration));
                bob_burden_list.push(calculateBurden(currentTaskRepartition.partnerTasks[task.name].effort, currentTaskRepartition.partnerTasks[task.name].duration));
                current_alice_allocation.push(currentTaskRepartition.myTasks[task.name].participates);
                current_bob_allocation.push(currentTaskRepartition.partnerTasks[task.name].participates);

                taskList[task.name] = counter0;
                counter0 += 1;
            }
        }
    }

    ////// wasm improved_adjusted_winner 

    //console.log(task_total_num_list, alice_burden_list, bob_burden_list, current_alice_allocation, current_bob_allocation);
    // その後、WebAssemblyの機能を利用する
    let adjustedWinnerAllocation = wasm.improved_adjusted_winner(task_total_num_list, alice_burden_list, bob_burden_list); 
    console.log("adjustedWinner_alliceAllocation: ", adjustedWinnerAllocation[0]);
    console.log("adjustedWinner_bobAllocation: ", adjustedWinnerAllocation[1]);
    
    let leastChangeAllocation = wasm.least_change_allocation(task_total_num_list, alice_burden_list, bob_burden_list, current_alice_allocation, current_bob_allocation);
    console.log("leastChange_alliceAllocation: ", leastChangeAllocation[0]);
    console.log("leastChange_bobAllocation: ", leastChangeAllocation[1]);

    let awCurrentTaskRepartition = {'myTasks': {}, 'partnerTasks': {}};
    let lcCurrentTaskRepartition = {'myTasks': {}, 'partnerTasks': {}};

    for (let category of allTasks){
        for (let task of category.children){
            if (task.checked){
                let i = getIndex(task.name, taskList);
                
                awCurrentTaskRepartition['myTasks'][task.name] = {
                    participates: adjustedWinnerAllocation[0][i],
                    effort: currentTaskRepartition.myTasks[task.name].effort,
                    duration : currentTaskRepartition.myTasks[task.name].duration,
                    category : currentTaskRepartition.myTasks[task.name].category,
                    userModified:currentTaskRepartition.myTasks[task.name].userModified,
                };
                awCurrentTaskRepartition['partnerTasks'][task.name] = {
                    participates: adjustedWinnerAllocation[1][i],
                    effort: currentTaskRepartition.partnerTasks[task.name].effort,
                    duration : currentTaskRepartition.partnerTasks[task.name].duration,
                    category : currentTaskRepartition.partnerTasks[task.name].category,
                    userModified:currentTaskRepartition.partnerTasks[task.name].userModified,
                };

                lcCurrentTaskRepartition['myTasks'][task.name] = {
                    participates: leastChangeAllocation[0][i],
                    effort: currentTaskRepartition.myTasks[task.name].effort,
                    duration : currentTaskRepartition.myTasks[task.name].duration,
                    category : currentTaskRepartition.myTasks[task.name].category,
                    userModified:currentTaskRepartition.myTasks[task.name].userModified,
                };
                lcCurrentTaskRepartition['partnerTasks'][task.name] = {
                    participates: leastChangeAllocation[1][i],
                    effort: currentTaskRepartition.partnerTasks[task.name].effort,
                    duration : currentTaskRepartition.partnerTasks[task.name].duration,
                    category : currentTaskRepartition.partnerTasks[task.name].category,
                    userModified:currentTaskRepartition.partnerTasks[task.name].userModified,
                };
            }
        }
    }
    return [awCurrentTaskRepartition, lcCurrentTaskRepartition];
}

