export function DeleteFromArray(Array1,item){
    const Array2 = []
    for (let i=0; i < Array1.length; i++){
      if(Array1[i] !== item){
        Array2.push(Array1[i]);
        //console.log(Array1[i]);
      }
    }
    return Array2;
}

export function AddIntoArray(Array1,item){
    const Array2 = []
    for (let i=0; i < Array1.length; i++){
        Array2.push(Array1[i]);
    }
    Array2.push(item);
    return Array2;
}
  
export function SumArray(Array1){
    return Array1.reduce((prev, cur) => cur + prev, 0);
}
  
export function MaxArray(Array1){
    return Array1.reduce((prev, cur) => Math.max(prev, cur),0);
}
  
  
export function isEFone(AliceUtility,BobUtility,AliceAllocation,BobAllocation){
    const AAU=[];
    const BAU=[];
    const ABU=[];
    const BBU=[];
    for (let i=0; i < AliceAllocation.length; i++){
      AAU.push(AliceUtility[AliceAllocation[i]]);
      BAU.push(BobUtility[AliceAllocation[i]]);
    }
    for (let i=0; i < BobAllocation.length; i++){
      ABU.push(AliceUtility[BobAllocation[i]]);
      BBU.push(BobUtility[BobAllocation[i]]);
    }
    return (SumArray(AAU) - MaxArray(AAU) <= SumArray(ABU) && SumArray(BBU) - MaxArray(BBU) <= SumArray(BAU));

}

export function isEF(AliceUtility,BobUtility,AliceAllocation,BobAllocation){
    const AAU=[];
    const BAU=[];
    const ABU=[];
    const BBU=[];
    for (let i=0; i < AliceAllocation.length; i++){
      AAU.push(AliceUtility[AliceAllocation[i]]);
      BAU.push(BobUtility[AliceAllocation[i]]);
    }
    for (let i=0; i < BobAllocation.length; i++){
      ABU.push(AliceUtility[BobAllocation[i]]);
      BBU.push(BobUtility[BobAllocation[i]]);
    }
    return (SumArray(AAU) <= SumArray(ABU) && SumArray(BBU) <= SumArray(BAU));
}


export function nonReduceDiff(aAllocation,bAllocation,AliceAllocation,BobAllocation,aliceUtility,bobUtility){
    const BBUChanged=[];
    for (let k=0; k < bAllocation.length; k++){
        BBUChanged.push(bobUtility[bAllocation[k]]);
    }
    const AAUChanged=[];
    for (let k=0; k < aAllocation.length; k++){
        AAUChanged.push(aliceUtility[aAllocation[k]]);
    }
    const BBU=[];
    for (let k=0; k < BobAllocation.length; k++){
        BBU.push(bobUtility[BobAllocation[k]]);
    }
    const AAU=[];
    for (let k=0; k < AliceAllocation.length; k++){
        AAU.push(aliceUtility[AliceAllocation[k]]);
    }
    const sumAliceUtility = SumArray(aliceUtility);
    const sumBobUtility = SumArray(bobUtility);
    return Math.abs(SumArray(BBUChanged)/sumBobUtility - SumArray(AAUChanged)/sumAliceUtility) >= Math.abs(SumArray(BBU)/sumBobUtility - SumArray(AAU)/sumAliceUtility);
}


export function categoryShow(task){
    let category;
    for (let categoryObject of allTasks) {
        for (let taskObject of categoryObject.children) {
            if (taskObject.name == task){
                category = categoryObject.name;
            }
        }
    }
    return category;
}