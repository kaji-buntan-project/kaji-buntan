import { useAtom } from "jotai";
import { currentTaskRepartitionAtom, leastRepartitionAtom, adjustedRepartitionAtom } from "../lib/atoms.js";

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

  //送信するデータ（例）
  // data = {
  //     houseworks: [
  //         {
  //             name: ”朝ごはん用意”,
  //             category: ”朝の準備”,
  //             myEffort: 3,
  //             myDuration: 30,
  //             partnerEffort: 1,
  //             partnerDuration: 20,
  //             myNowParticipates: 4,
  //             partnerNowParticipates: 2,
  //             myLeastRepartitionParticipates: 3,
  //             partnerLeastRepartitionParticipates: 3,
  //             myAdjustedRepartitionParticipates: 3,
  //             partnerAdjustedRepartitionParticipates: 3
  //         },
  //         {
  //             name: ”新聞をとる”,
  //             category: ”朝の準備”,
  //             myEffort: 3,
  //             myDuration: 30,
  //             partnerEffort: 1,
  //             partnerDuration: 20,
  //             myNowParticipates: 4,
  //             partnerNowParticipates: 2,
  //             myLeastRepartitionParticipates: 3,
  //             partnerLeastRepartitionParticipates: 3,
  //             myAdjustedRepartitionParticipates: 3,
  //             partnerAdjustedRepartitionParticipates: 3
  //         }
  //     ]
  // }

  let data = {};
  let houseWorks = [];

  for (const houseWork of Object.keys(myData)) {
    houseWorks[houseWork] = {
      name: [houseWork][0], //家事の名前
      category: myData[houseWork].category, // 家事の分類
      myEffort: Number(2 - myData[houseWork].effort), // 「私」のその家事の評価
      myDuration: myData[houseWork].duration, // 「私」のその家事にかかる時間
      partnerEffort: Number(2 - partnerData[houseWork].effort), // 「パートナー」のその家事の評価
      partnerDuration: partnerData[houseWork].duration, // 「パートナー」がその家事にかかる時間
      myNowParticipates: myData[houseWork].participates, // 今の「私」の分担回数
      PartnerNowParticipates: partnerData[houseWork].participates, // 今の「パートナー」の分担回数
      myLeastRepartitionParticipates: leastRepartitionMyData[houseWork].participates, // 「私」の少し理想的な分担回数
      partnerLeastRepartitionParticipates: leastRepartitionPartnerData[houseWork].participates, // 「パートナー」の少し理想的な分担回数
      myAdjustedRepartitionParticipates: adjustedRepartitionMyData[houseWork].participates, // 「私」の理想的な分担回数
      partnerAdjustedRepartitionParticipates: adjustedRepartitionPartnerData[houseWork].participates, // 「パートナー」の理想的な分担回数
    };
  }
  //keyを外す
  const newData = Object.values(houseWorks);
  //送信するデータ（例）になるように挿入
  data.houseWorks = [...newData];
  return data;
};
