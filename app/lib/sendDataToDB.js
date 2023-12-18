// export const sendDataToDB = (data) => {
//   //apiエンドポイント
//   const apiUrl = "http://localhost/api/diagnosis";

//   console.log(data);
//   const sendData = JSON.stringify(data);
//   console.log(sendData);

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       //json形式
//       "Content-Type": "application/json",
//       //セキュリティ対策
//       // 'X-CSRF-TOKEN': window.csrfToken,
//     },
//     //オブジェクトをJSON文字列に変換
//     body: JSON.stringify(data),
//   };

//   fetch(apiUrl, requestOptions)
//     .then(function (response) {
//       return response.json();
//     })
//     .then((data) => {
//       console.log("送信完了", data);
//     })
//     .catch((error) => {
//       console.log("エラー", error);
//     });
// };
