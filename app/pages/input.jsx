import styles from '../styles/input.module.css';

import React, { useEffect } from "react";
import TaskCategoryList from "../components/taskCategoryList";
import ResultTabComponent from '../components/resultTabComponent';
import makeBothAllocation from '../components/resultTabComponent';
import InputItem from '../components/inputItem';
import  Tab from '@mui/material/Tab';
import  Tabs from '@mui/material/Tabs';
import NewInputItem from "../components/newInputItem";
import InputBox from "../components/InputBox";
import { Box,Grid,Button,Link } from '@mui/material';
import { useState } from 'react';
import { useRouter } from "next/router";

// import {leastChangeAllocationTaskRepartition,adjustedWinnerTaskRepartition} from '../lib/init.js'
import {setDataToDB} from '../lib/setDataToDB'

import { DateTime } from 'luxon';

import constants from "../src/constants";

//import makeAliceBobUtility from "../src/mainAlgorithm";
//import AllocationList from 'components/allocationList';
//import { improved_adjusted_winner, least_change_allocation } from 'wasm_rust_project/pkg';
import * as wasm from "wasm_rust_project/pkg";

import GuideTalk from 'components/guideTalk';
import { useAtom } from "jotai";
import NextLink from "next/link";
import { currentTaskRepartitionAtom, leastRepartitionAtom, adjustedRepartitionAtom, allTasksAtom,validateErrorAtom } from "../lib/atoms.js";

// TabPanel -> https://mui.com/material-ui/react-tabs/
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            { ...other }
        >
            {
                value === index && (
                    <Box sx={{width: '100%'}}>
                        { children }
                    </Box>
                )
            }
        </div>
    )
}
const allTasks = constants.allTasks



export default function InputPage() {

    async function initWasm() {
        await wasm.default();
        // その後、WebAssemblyの機能を利用する
        let awAllocation = wasm.improved_adjusted_winner([7,7,7,7,7], [5,10,5,10,15], [1,2,3,4,5]);
        console.log("aw_alliceAllocation: ", awAllocation[0]);
        console.log("aw_bobAllocation: ", awAllocation[1]);
        let lcAllocation =  wasm.least_change_allocation([7,7,7,7,7], [5,10,5,10,15], [1,2,3,4,5], [3,3,3,3,3], [4,4,4,4,4]);
        console.log("lc_alliceAllocation: ", lcAllocation[0]);
        console.log("lc_bobAllocation: ", lcAllocation[1]);
    }
    
    initWasm();
    ////// wasm improved_adjusted_winner のテスト. 後で消す
    useEffect(() => {
        // ここで wasm モジュールの関数を呼び出す
        let Allocation = wasm.improved_adjusted_winner([7,7,7,7,7], [5,10,5,10,15], [1,2,3,4,5]);
        console.log("alliceAllocation: ", Allocation[0]);
        console.log("bobAllocation: ", Allocation[1]);
    }, []);
    // //////
    // ////// wasm least_change_allocation のテスト. 後で消す
    useEffect(() => {
        // ここで wasm モジュールの関数を呼び出す
        let Allocation =  wasm.least_change_allocation([7,7,7,7,7], [5,10,5,10,15], [1,2,3,4,5], [3,3,3,3,3], [4,4,4,4,4]);
        console.log("alliceAllocation: ", Allocation[0]);
        console.log("bobAllocation: ", Allocation[1]);
    }, []);
    // //////
    
    const router = useRouter();
    const [allTasks, setAllTasks] = useAtom(allTasksAtom);

    const [ currentTab, setCurrentTab ] = useState(0);

    //バリデーションのエラーがあるか
    const [ validateError, setValidateError] = useAtom(validateErrorAtom)
    
    //現在の家事分担データ
    const [ currentTaskRepartition, setAllTaskRepartition ] = useAtom(currentTaskRepartitionAtom);

    const handleValidateError = (errorMessage)=>{
        // errorMessageが指定されたref
        const spanElement = errorMessage.current;

        // spanの中のテキストコンテンツを取得
        const textContent = spanElement.innerText || spanElement.textContent;

        // 文字列が空でないかを判定
        if (textContent.trim() !== '') {
        // 文字列がある場合の処理
        setValidateError((prevErrors)=> [...prevErrors,errorMessage])
        return
    } else {
        // 文字列がない場合の処理
        setValidateError(validateError.filter((prevErrors) => prevErrors !== errorMessage))
        return
    }
    }

    //toDo:別ファイルに分割
    const getAllInputComponents = (taskArray) => {
      const returnArray = [];
      const person = ['me','partner']

        for (let category of taskArray) {
            let activeTasks = category.children.filter(task => task.checked).map((taskObject, index) => 
            <InputBox key={`${taskObject.name}${index}`} taskObject={taskObject} index={index} setTaskRepartition={setTaskRepartition} getTaskRepartition={getTaskRepartition} currentTaskRepartition={currentTaskRepartition} setValidateError={setValidateError} validateError={validateError} handleValidateError={handleValidateError}>
            {/* {taskObject.name}
            <NewInputItem label={taskObject.name} key={`${taskObject.name}${index}`} person={'me'} calculateTotal={calculateTotal} myTaskTimes={myTaskTimes} setTaskTimes={setMyTaskTimes} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition(person[0], taskObject.name)} />
            {ourTaskTimes}回
            <NewInputItem label={taskObject.name} key={`${taskObject.name}${index}`} person={'partner'} calculateTotal={calculateTotal} partnerTaskTimes={partnerTaskTimes} setTaskTimes={setPartnerTaskTimes} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition(person[1], taskObject.name)} />
            {taskObject.name}
            <br /> */}
            </InputBox>
            );
            if (activeTasks.length > 0) {
                returnArray.push(
                    <div className={styles.categorySection} key={person[0] + category.name}>
                        <h2 className={ styles.categoryHeader } style={{ color: 'white' }}>{ category.name }</h2>
                        { activeTasks }
                    </div>
                );
            }
        }

        return returnArray;
    }

    function getTaskRepartition(person, taskName) {
        const personKey = (person == 'me' ? 'myTasks' : 'partnerTasks');
        return currentTaskRepartition[personKey][taskName];
    }
    
    //todo:useEffect
    function setTaskRepartition(person, taskName, taskRepartitionItem) {
        const personKey = (person == 'me' ? 'myTasks' : 'partnerTasks');           
        
        currentTaskRepartition[personKey][taskName] = taskRepartitionItem;
        currentTaskRepartition[personKey][taskName].userModified = true;

        // "私の評価”を変更すれば、パートナーの評価も自動的に設定します（ユーザーから変更がなかった場合のみ）
        // if (person == 'me' && !currentTaskRepartition['partnerTasks'][taskName].userModified) {
        //     currentTaskRepartition['partnerTasks'][taskName].participates = !taskRepartitionItem.participates;
        // }
        // if (person == 'me') {
        //     currentTaskRepartition['partnerTasks'][taskName].participates = !taskRepartitionItem.participates;
        // }
        // if (person == 'partner') {
        //     currentTaskRepartition['myTasks'][taskName].participates = !taskRepartitionItem.participates;
        // }

        setAllTaskRepartition(currentTaskRepartition);

    }
    
    const handleChangeTasks = (event) => {
        allTasks[event.index].children[event.child.index].checked = event.child.checked;
        setAllTasks(allTasks);
    }

    
    //console.log(allTasks, currentTaskRepartition);
    //let [adjustedWinnerTaskRepartition, leastChangeAllocationTaskRepartition] = makeAliceBobUtility(allTasks, currentTaskRepartition);
    //console.log(adjustedWinnerTaskRepartition);
    //console.log(leastChangeAllocationTaskRepartition);
    
    // let [currentAliceAllocation, currentBobAllocation] = makeBothAllocation(currentTaskRepartition);
    // let [adjustedWinnerAliceAllocation, adjustedWinnerBobAllocation] = makeBothAllocation(adjustedWinnerTaskRepartition);
    // let [leastChangeAliceAllocation, leastChangeBobAllocation] = makeBothAllocation(leastChangeAllocationTaskRepartition);

    // 上までスクロール
    const scrollToTop = () => {
        // 単純なTopは固定されているので、内部をスクロールさせる。
        document.getElementById("input-panel").scrollIntoView();
    };

    return (
        <div className={styles.inputPanel} id="input-panel">
            <Tabs value={currentTab} 
            sx={{margin:"0 auto", maxWidth:'500px', position: 'sticky', top: '10px', backgroundColor: 'whitesmoke', zIndex: 50000, borderRadius: '5px' }} 
            onChange={ (_, newValue) => {
                setCurrentTab(newValue);
                scrollToTop();
             }}
            centered
            variant="fullWidth"
            scrollButtons="auto"
            >
                <Tab label="家事選択" sx={{ backgroundColor: 'white'}} />
                <Tab label="私とパートナーの評価" sx={{ backgroundColor: "white" }} />
                {/* <Tab label="私の評価" sx={{ backgroundColor: "white" }} /> */}
                {/* <Tab label="パートナーの評価" sx={{ backgroundColor: "white" }} /> */}
                {/* <Tab label="コンシェルジュの提案" sx={{ backgroundColor: 'white'}}/> */}
            </Tabs>
            <TabPanel value={ currentTab } index={0} sx={{ width: 1}} className={styles.taskWrapper}>
                <br/>
                <GuideTalk tabnumber={0} ></GuideTalk>
                <TaskCategoryList taskTree={allTasks} onChange={handleChangeTasks}></TaskCategoryList>
            </TabPanel>
            <TabPanel value={ currentTab } index={1} sx={{ width: 1 }} >
                <br />
                <GuideTalk tabnumber={1} ></GuideTalk>
                {getAllInputComponents(allTasks)}
            </TabPanel>
        {/* <TabPanel value={currentTab} index={1} sx={{ width: 1 }}>
            </TabPanel>
            {/* <TabPanel value={ currentTab } index={3} sx={{ width: 1}}>
              <ResultTabComponent
                currentTaskRepartition={ currentTaskRepartition }
                allTasks={ allTasks }
              >
              </ResultTabComponent>
            </TabPanel> */}
            <Grid container spacing={3} justifyContent="center">
                <Grid container item xs={6} justifyContent="flex-end">
                    <Link href="/" passhref={true}><Button variant="outlined" color="secondary">キャンセル</Button></Link>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-start">
                {currentTab === 1 ? (
                // 「私とパートナーの評価」タブでは
                <NextLink href={{ pathname: "/result", currentTaskRepartitionAtom: currentTaskRepartitionAtom}} as="/result">
                    <a className={validateError.length === 0 ?  styles.toResultLink : styles.disAbleLink}>この内容で診断する</a>
                </NextLink>
                ): 
                // 「家事選択」タブでは
                <Button variant="contained" color="primary" disabled={currentTab === 3} onClick={() => {
                    setCurrentTab(currentTab + 1);
                    scrollToTop();
                }}>次へ</Button>
                }
                </Grid>
            </Grid>
        </div>
    );
}
