//家事分担回数のエラーハンドリング
export const validateCount = (errorMessage,taskCount) => {
  //200以上の数字が入力された場合
  if (taskCount > 200) {
    errorMessage.current.innerHTML = "上限値200を超えています。";
  } else {
    errorMessage.current.innerHTML = "";
  }

  //バリデーションの設定
  const naturalNumberRegex = /^[0-9]+$/;

  if (!naturalNumberRegex.test(taskCount) || taskCount === "") {
    errorMessage.current.innerHTML = "半角数字を正しく入力してください。";
  }
};
