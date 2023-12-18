import { useAtom } from "jotai";
import { currentTaskRepartitionAtom, leastRepartitionAtom, adjustedRepartitionAtom, allTasksAtom } from "../lib/atoms.js";

export const setDataToDB = () => {
  //現在の家事分担
  const [currentTaskRepartition] = useAtom(currentTaskRepartitionAtom);

  const myTask = currentTaskRepartition.myTasks;
  const myData = Object.fromEntries(Object.entries(myTask).filter(([key, value]) => value.userModified === true));

  const partnerTask = currentTaskRepartition.partnerTasks;
  const partnerData = Object.fromEntries(Object.entries(partnerTask).filter(([key, value]) => value.userModified === true));

  //少し理想的な分担
  const [leastRepartition] = useAtom(leastRepartitionAtom);

  const leastRepartitionMyTask = leastRepartition.myTasks;
  const leastRepartitionMyData = Object.fromEntries(Object.entries(leastRepartitionMyTask).filter(([key, value]) => value.userModified === true));

  const leastRepartitionPartnerTask = leastRepartition.partnerTasks;
  const leastRepartitionPartnerData = Object.fromEntries(Object.entries(leastRepartitionPartnerTask).filter(([key, value]) => value.userModified === true));

  //理想的な分担
  const [adjustedRepartition] = useAtom(adjustedRepartitionAtom);

  const adjustedRepartitionMyTask = adjustedRepartition.myTasks;
  const adjustedRepartitionMyData = Object.fromEntries(Object.entries(adjustedRepartitionMyTask).filter(([key, value]) => value.userModified === true));

  const adjustedRepartitionPartnerTask = adjustedRepartition.partnerTasks;
  const adjustedRepartitionPartnerData = Object.fromEntries(Object.entries(adjustedRepartitionPartnerTask).filter(([key, value]) => value.userModified === true));

  //送信するデータ
  const data = {};

  for (const houseWorks of Object.keys(myData)) {
    data[houseWorks] = {
      category: myData[houseWorks].category, // 家事の分類
      myEffort: Number(2 - myData[houseWorks].effort), // 「私」のその家事の評価
      myDuration: myData[houseWorks].duration, // 「私」のその家事にかかる時間
      partnerEffort: Number(2 -partnerData[houseWorks].effort), // 「パートナー」のその家事の評価
      partnerDuration: partnerData[houseWorks].duration, // 「パートナー」がその家事にかかる時間
      myNowParticipates: myData[houseWorks].participates, // 今の「私」の分担回数
      PartnerNowParticipates: partnerData[houseWorks].participates, // 今の「パートナー」の分担回数
      myLeastRepartitionParticipates: leastRepartitionMyData[houseWorks].participates, // 「私」の少し理想的な分担回数
      partnerLeastRepartitionParticipates: leastRepartitionPartnerData[houseWorks].participates, // 「パートナー」の少し理想的な分担回数
      myAdjustedRepartitionParticipates: adjustedRepartitionMyData[houseWorks].participates, // 「私」の理想的な分担回数
      partnerAdjustedRepartitionParticipates: adjustedRepartitionPartnerData[houseWorks].participates, // 「パートナー」の理想的な分担回数
    };
  }
  console.log(data);
  return data;
};
