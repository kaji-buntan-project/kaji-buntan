import NewInputItem from "../components/newInputItem";
import { useState } from "react";
import styles from 'styles/InputBox.module.css';

export default function InputBox(props) {
  const { taskObject, index, getTaskRepartition, setTaskRepartition , currentTaskRepartition } = props;

  const myTask = currentTaskRepartition.myTasks[taskObject.name]
  const partnerTask = currentTaskRepartition.partnerTasks[taskObject.name]

  // 家事分担の合計値（初期値：7）
  const [ourTaskCount, setOurTaskCount] = useState();

  // 「私」の家事回数
  const [myTaskCount, setMyTaskCount] = useState(myTask.participates);

  // 「パートナー」の家事回数
  const [partnerTaskCount, setPartnerTaskCount] = useState(partnerTask.participates);

  //  合計値を計算する
  const countOurTask = () => {
    setOurTaskCount(Number(myTaskCount) + Number(partnerTaskCount))
    return ourTaskCount
  }

  return (
    <>
      <div className={styles.inputBox_wrapper}>
      <p className={styles.inputBox_taskName}>{taskObject.name}</p>
      <NewInputItem label={taskObject.name} key={`my_${taskObject.name}${index}`} person={"me"} taskCount={myTaskCount} setTaskCount={setMyTaskCount} countOurTask={countOurTask} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition("me", taskObject.name)} />
      <p className={styles.inputBox_count}>{ourTaskCount}回</p>
      <NewInputItem label={taskObject.name} key={`partner_${taskObject.name}${index}`} person={"partner"} taskCount={partnerTaskCount} setTaskCount={setPartnerTaskCount} countOurTask={countOurTask} onTaskChange={setTaskRepartition} initialValue={getTaskRepartition("partner", taskObject.name)} />
      </div>
    </>
  );
}