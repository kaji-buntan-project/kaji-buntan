//家事分担回数のエラーハンドリング
export const validateCount = (taskCount,setErrorMessage) => {
  //200以上の数字が入力された場合
  if (taskCount > 200) {
    setErrorMessage("上限値200を超えています。");
  } else {
    setErrorMessage("");
  }

  //バリデーションの設定
  const naturalNumberRegex = /^[0-9]+$/;

  if (!naturalNumberRegex.test(taskCount) || taskCount === "") {
    setErrorMessage("半角数字を正しく入力してください。");
  }
};
