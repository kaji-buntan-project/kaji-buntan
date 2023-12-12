import NewInputItem from "../components/newInputItem";
import { useState } from "react";

export default function InputBox(props) {
  const { taskObject, index, getTaskRepartition, setTaskRepartition } = props;

  // 家事分担の合計値（初期値：7）
  const [ourTaskCount, setOurTaskCount] = useState(7);

  // 「私」の家事回数（初期値：3）
  const [myTaskCount, setMyTaskCount] = useState(3);

  // 「パートナー」の家事回数（初期値：4）
  const [partnerTaskCount, setPartnerTaskCount] = useState(4);

  //  合計値を計算する
  const countOurTask = () => {
    setOurTaskCount(parseInt(myTaskCount) + parseInt(partnerTaskCount))
    return ourTaskCount
  }

  return (
    <>
      {taskObject.name}
      <NewInputItem label={taskObject.name} key={`${taskObject.name}${index}`} person={"me"} taskCount={myTaskCount} setTaskCount={setMyTaskCount} countOurTask={countOurTask} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition("me", taskObject.name)} />
      {ourTaskCount}回
      <NewInputItem label={taskObject.name} key={`${taskObject.name}${index}`} person={"partner"} taskCount={partnerTaskCount} setTaskCount={setPartnerTaskCount} countOurTask={countOurTask} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition("partner", taskObject.name)} />
      {taskObject.name}
      <br />
    </>
  );
}