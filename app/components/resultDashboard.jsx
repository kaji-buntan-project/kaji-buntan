import ScatterPlotComponent from "./scatterPlotComponent";
import ResultTableComponent from "./resultTableComponent";
import MakeBarGraph from "./makeBarGraph";
import MakePieChart from "./makePieChart";
import ErrorDialog from "./errorDialog";
import { Box, Grid } from "@mui/material";

import AllocationList from "./allocationList";

import myillust from '../public/images/myillust.png';
import partnerillust from '../public/images/partnerillust.png';
import Image from 'next/image';

import detectAllocationChange from "src/detectAllocationChange";
import makeAliceBobUtility from "/src/mainAlgorithm";
import { setDataToDB } from "/lib/setDataToDB";
import { sendDataToDB } from "/lib/sendDataToDB";
import { useAtom } from "jotai";
import { currentTaskRepartitionAtom, leastRepartitionAtom, adjustedRepartitionAtom ,isAxiosErrorAtom } from "../lib/atoms.js";


function makeBothAllocation(TaskRepartition, allTasks){
  let aliceAllocation = [];
  let bobAllocation = [];
  for (let category of allTasks){
      for (let task of category.children){
          if (task.checked){
              const myTask1 = TaskRepartition['myTasks'][task.name];
              const partnerTask1 = TaskRepartition['partnerTasks'][task.name];
              if (myTask1 && myTask1.participates){
                  aliceAllocation.push(task.name);
              }else if (partnerTask1 && partnerTask1.participates){
                  bobAllocation.push(task.name);
              }
          }
      }
  }
  return [aliceAllocation,bobAllocation];
}

export default function ResultDashboard(props) {
  const [currentTaskRepartition] = useAtom(currentTaskRepartitionAtom);
  const [adjustedRepartition] = useAtom(adjustedRepartitionAtom);
  const [leastRepartition] = useAtom(leastRepartitionAtom);
  
   //API送信のエラー（初期値はfalse）
  const [isAxiosError, setIsAxiosError] = useAtom(isAxiosErrorAtom)

    if(props.tag){
      setDataToDB(currentTaskRepartition,leastRepartition,adjustedRepartition)
      sendDataToDB(setDataToDB(currentTaskRepartition,leastRepartition,adjustedRepartition),setIsAxiosError,isAxiosError)
      props.setTag(false)
    } 

  let [changeOrUnchage, changedList] = detectAllocationChange(props.currentTaskRepartition, props.value);

    //入力した「私」のデータを抽出
    const myData = props.value.myTasks
    const myInputData = Object.fromEntries(Object.entries(myData).filter(([key, value]) => value.userModified === true));
    
    //入力した「パートナー」のデータを抽出
    const partnerData = props.value.partnerTasks
    const partnerInputData = Object.fromEntries(Object.entries(partnerData).filter(([key, value]) => value.userModified === true));;


    let noInput = false
    
    //「私」・「パートナー」の入力データがない場合
    if(Object.keys(myInputData).length === 0 && Object.keys(partnerInputData).length === 0){
      noInput = true;
    } else {
      noInput = false
    }
    
    //エラー通知（API）
    if(isAxiosError){
      console.log('API送信が正常ではありません');
    }else{
      console.log('API送信でエラーは発生してません');
    }

    //エラー通知（入力項目）
    if(noInput){
      console.log('入力項目がないです');
    }else{
      console.log('入力は正常です');
    }

  return (
    <Box>
      <Grid container spacing={0.5} alignItems="flex-start" justifyContent='center' >

      <ErrorDialog noInput={noInput} isAxiosError={isAxiosError} />  

      <Grid container item xs={6} justifyContent="center" alignItems="baseline">
        <b><font size="3">私</font></b><Image alt="introduction" src={myillust} width={52} height={52}></Image>
      </Grid>
      <Grid container item xs={6} justifyContent="center" alignItems="baseline">
        <b><font size="3">パートナー</font></b><Image alt="introduction" src={partnerillust} width={52} height={52}></Image>
      </Grid>
    <Grid container item xs={6} justifyContent="center">
        <MakePieChart head="私"  value={props.value} changedList={changedList} current={props.current}></MakePieChart>
      <AllocationList 
        head="私" 
        data={props.mydata} 
        changedList={changedList} 
        current={props.current}
        tabtabnumber={props.tabtabnumber}
        repartition={props.repartition}
        taskData={myInputData}
      ></AllocationList>
      </Grid>
    <Grid container item xs={6} justifyContent="center">
          <MakePieChart head="パートナー" value={props.value} changedList={changedList} current={props.current}></MakePieChart>
        <AllocationList 
          head="パートナー" 
          data={props.partnerdata}
          changedList={changedList} 
          current={props.current}
          tabtabnumber={props.tabtabnumber}
          repartition={props.repartition}
          taskData={partnerInputData}
        ></AllocationList>
      </Grid>
    </Grid>
    {/* <ResultTableComponent value={props.value}></ResultTableComponent> */}
      {/* <MakeBarGraph value={props.value}></MakeBarGraph> */}
      {/* <ScatterPlotComponent value={props.value}></ScatterPlotComponent> */}
    </Box>
  )
}
