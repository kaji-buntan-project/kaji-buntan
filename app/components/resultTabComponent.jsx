import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState, useEffect } from "react";
import ResultDashboard from "./resultDashboard";
import AllocationList from "./allocationList";
import GuideTalk from "components/guideTalk";
import detectAllocationChange from "src/detectAllocationChange";
import makeAliceBobUtility from "/src/mainAlgorithm";
import ExplainQForm from "components/explainQForm";

import { setDataToDB } from "../lib/setDataToDB.js";
import { leastRepartitionAtom, adjustedRepartitionAtom } from "../lib/atoms.js";
import { useAtom } from "jotai";

export function makeBothAllocation(TaskRepartition, allTasks) {
  let aliceAllocation = [];
  let bobAllocation = [];
  for (let category of allTasks) {
    for (let task of category.children) {
      if (task.checked) {
        const myTask1 = TaskRepartition["myTasks"][task.name];
        const partnerTask1 = TaskRepartition["partnerTasks"][task.name];
        if (myTask1 && myTask1.participates) {
          aliceAllocation.push(task.name);
          // }else if (partnerTask1 && partnerTask1.participates){
          //     bobAllocation.push(task.name);
          // }
        }
        if (partnerTask1 && partnerTask1.participates) {
          bobAllocation.push(task.name);
        }
      }
    }
  }
  return [aliceAllocation, bobAllocation];
}

export default function ResultTabComponent(props) {
  const [tabNum, setTabNum] = useState("1");
  const handleChangeTab = (_, newValue) => {
    setTabNum(newValue);
  };
  
  const { currentTaskRepartition, allTasks } = props;
  const [currentAliceAllocation, currentBobAllocation] = makeBothAllocation(currentTaskRepartition, allTasks);

  // ALGORITHM
  let result = makeAliceBobUtility(allTasks, currentTaskRepartition);
  let adjustedWinnerTaskRepartition = result[0];
  let leastChangeAllocationTaskRepartition = result[1];
  console.log("aw_Allocation: ", adjustedWinnerTaskRepartition);
  console.log("lc_Allocation: ", leastChangeAllocationTaskRepartition);


  const [adjustedWinnerAliceAllocation, adjustedWinnerBobAllocation] = makeBothAllocation(adjustedWinnerTaskRepartition, allTasks);
  const [leastChangeAliceAllocation, leastChangeBobAllocation] = makeBothAllocation(leastChangeAllocationTaskRepartition, allTasks);

  const [adjustedRepartition, setAdjustedRepartition] = useAtom(adjustedRepartitionAtom);
  const [leastRepartition, setLeastRepartition] = useAtom(leastRepartitionAtom);
  const [tag, setTag] = useState(false);

  useEffect(() => {
    setAdjustedRepartition(adjustedWinnerTaskRepartition);
    setLeastRepartition(leastChangeAllocationTaskRepartition);
    setTag(true);
  }, []);

  // const [adjustedRepartition, setAdjustedRepartition] = useState(adjustedWinnerTaskRepartition);
  // const [leastRepartition, setLeastRepartition] = useState(leastChangeAllocationTaskRepartition);
  const [adjustedAliceAllocation, setAdjustedAliceAllocation] = useState(adjustedWinnerAliceAllocation);
  const [adjustedBobAllocation, setAdjustedBobAllocation] = useState(adjustedWinnerBobAllocation);
  const [leastAliceAllocation, setLeastAliceAllocation] = useState(leastChangeAliceAllocation);
  const [leastBobAllocation, setLeastBobAllocation] = useState(leastChangeBobAllocation);

  const [hoge, setHoge] = useState(0);
  useEffect(() => {
    const [adjustedWinnerAliceAllocation, adjustedWinnerBobAllocation] = makeBothAllocation(adjustedRepartition, allTasks);
    const [leastChangeAliceAllocation, leastChangeBobAllocation] = makeBothAllocation(leastRepartition, allTasks);
    setAdjustedAliceAllocation(adjustedWinnerAliceAllocation);
    setAdjustedBobAllocation(adjustedWinnerBobAllocation);
    setLeastAliceAllocation(leastChangeAliceAllocation);
    setLeastBobAllocation(leastChangeBobAllocation);
  }, [adjustedRepartition, leastRepartition, hoge,,allTasks]);

  


  const changeRepartition = (person, taskName, tabtabnumber) => {
    let TaskRepartition = {}
    let setRepartition = null
    // console.log(tabtabnumber)
    // if (tabtabnumber == "1") {
    //   TaskRepartition = leastRepartition 
    //   setRepartition = setLeastRepartition
    // } else 
    if (tabtabnumber == "2") {
      TaskRepartition = adjustedRepartition
      setRepartition = setAdjustedRepartition
    } else {
      return
    }
    const selectedPerson = person == "私" ? "myTasks" : "partnerTasks";
    const anotherPerson = person != "私" ? "myTasks" : "partnerTasks";
    // exchange task participate
    let selectedParticipate = TaskRepartition[selectedPerson][taskName]["participates"];
    let anotherPersonParticipate = TaskRepartition[anotherPerson][taskName]["participates"];
    
    TaskRepartition[selectedPerson][taskName]["participates"] = selectedParticipate - 1
    TaskRepartition[anotherPerson][taskName]["participates"] =  anotherPersonParticipate + 1;  
   
    setRepartition(TaskRepartition);
    setHoge(hoge + 1);
  };

  let [changeOrUnchageLeast, changedListLeast] = detectAllocationChange(currentTaskRepartition, leastChangeAllocationTaskRepartition);
  let [changeOrUnchageAW, changedListAW] = detectAllocationChange(currentTaskRepartition, adjustedWinnerTaskRepartition);

  return (
    <TabContext value={tabNum}>
      <TabList onChange={handleChangeTab}
        xs={6}
        centered
        variant="fullWidth"
        scrollButtons="auto"
        sx={{margin:"0 auto", maxWidth:'750px',}}
      >
        <Tab label="今の家事分担" value="1" />
        <Tab label="少し理想的な分担" value="2" />
        <Tab label="理想的な分担" value="3" />
      </TabList>
      <TabPanel value="1" sx={{ width: 1 }}>
        <GuideTalk tabnumber={3} tabtabnumber={0} changeOrUnchageLeast={changeOrUnchageLeast}></GuideTalk>
        <ResultDashboard
          value={currentTaskRepartition}
          mydata={currentAliceAllocation}
          partnerdata={currentBobAllocation}
          current={"current"}
          tabtabnumber={"0"}
          repartition={changeRepartition}
          currentTaskRepartition={currentTaskRepartition}
          allTasks={allTasks}
          tag={tag}
          setTag={setTag}
        ></ResultDashboard>
        <h1></h1>
        <br></br>
        <h1></h1>
        <ExplainQForm></ExplainQForm>
        {/* <AllocationList head="私" data={props.currentAliceAllocation}></AllocationList>
        <AllocationList head="パートナー" data={props.currentBobAllocation}></AllocationList> */}
      </TabPanel>
      <TabPanel value="2" sx={{ width: 1 }}>
        <GuideTalk tabnumber={3} tabtabnumber={1} changeOrUnchageLeast={changeOrUnchageLeast} changedListLeast={changedListLeast}></GuideTalk>
        <ResultDashboard
          value={leastRepartition}
          mydata={leastAliceAllocation}
          partnerdata={leastBobAllocation}
          changedList={changedListLeast}
          current={"not current"}
          tabtabnumber={"1"}
          repartition={changeRepartition}
          currentTaskRepartition={currentTaskRepartition}
          allTasks={allTasks}
        ></ResultDashboard>
        <h1></h1>
        <br></br>
        <h1></h1>
        <ExplainQForm></ExplainQForm>
        {/* <AllocationList head="私" data={props.leastChangeAliceAllocation}></AllocationList>
        <AllocationList head="パートナー" data={props.leastChangeBobAllocation}></AllocationList> */}
      </TabPanel>
      <TabPanel value="3" sx={{ width: 1 }}>
        <GuideTalk tabnumber={3} tabtabnumber={2} changeOrUnchageLeast={changeOrUnchageLeast} changeOrUnchageAW={changeOrUnchageAW}></GuideTalk>
        <ResultDashboard
          value={adjustedRepartition}
          mydata={adjustedAliceAllocation}
          partnerdata={adjustedBobAllocation}
          changedList={changedListAW}
          current={"not current"}
          tabtabnumber={"2"}
          repartition={changeRepartition}
          currentTaskRepartition={currentTaskRepartition}
          allTasks={allTasks}
        ></ResultDashboard>
        <h1></h1>
        <br></br>
        <h1></h1>
        <ExplainQForm></ExplainQForm>
        {/* <AllocationList head="私" data={props.adjustedWinnerAliceAllocation}></AllocationList>
        <AllocationList head="パートナー" data={props.adjustedWinnerBobAllocation}></AllocationList> */}
      </TabPanel>
    </TabContext>
  );
}
