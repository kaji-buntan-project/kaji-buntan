export default function makeTaskRepartiton(aliceTask, bobTask, currentTaskRepartition){
    let myTasks = {};
    let partnerTasks = {};

    for (let c of allTasks){
        for (let task of c.children){
            //アリス役のタスクを「私」へ
            if (aliceTask.includes(task.name)){
                myTasks[task.name] = {
                    // 割り振られた家事については２人分の回数を１人で担当する（私：2回、パートナー3回の場合、私5回になる）
                    participates:  Number(currentTaskRepartition.myTasks[task.name].participates + currentTaskRepartition.partnerTasks[task.name].participates),
                    effort: currentTaskRepartition.myTasks[task.name].effort,
                    duration : currentTaskRepartition.myTasks[task.name].duration,
                    category : currentTaskRepartition.myTasks[task.name].category,
                    userModified:currentTaskRepartition.myTasks[task.name].userModified,
                };
            }
            else{
                myTasks[task.name] = {
                    participates: 0,
                    effort: currentTaskRepartition.myTasks[task.name].effort,
                    duration : currentTaskRepartition.myTasks[task.name].duration,
                    category : currentTaskRepartition.myTasks[task.name].category,
                    userModified:currentTaskRepartition.myTasks[task.name].userModified,
                };
            }
        }
    }
    for (let c of allTasks){
        for (let task of c.children){
            //ボブ役のタスクを「パートナー」へ
            if (bobTask.includes(task.name)){
                partnerTasks[task.name] = {
                    // 割り振られた１つの家事については、２人分の回数を１人で担当する（私：2回、パートナー3回の場合、私5回）
                    participates: Number(currentTaskRepartition.partnerTasks[task.name].participates + currentTaskRepartition.myTasks[task.name].participates),
                    effort: currentTaskRepartition.partnerTasks[task.name].effort,
                    duration : currentTaskRepartition.partnerTasks[task.name].duration,
                    category : currentTaskRepartition.partnerTasks[task.name].category,
                    userModified:currentTaskRepartition.partnerTasks[task.name].userModified,
                };
            }
            else{
                partnerTasks[task.name] = {
                    participates: 0,
                    effort: currentTaskRepartition.partnerTasks[task.name].effort,
                    duration : currentTaskRepartition.partnerTasks[task.name].duration,
                    category : currentTaskRepartition.partnerTasks[task.name].category,
                    userModified:currentTaskRepartition.partnerTasks[task.name].userModified,
                };
            }
        }
    }
    return [myTasks, partnerTasks]
}