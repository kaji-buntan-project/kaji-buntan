import axios from "axios";

export const sendDataToDB = (data) => {
   console.log(data);
  //apiエンドポイント
  const apiUrl = "http://localhost:8080/api/diagnosis";

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl,
    headers: {
      "Content-Type": "application/json",
      "Cookie": "cookie_id=851ecdd2-6b54-421c-aa64-7594e10306da",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  //   // console.log(data);
  //   const sendData = JSON.stringify(data);
  //   // console.log(sendData);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Cookie': 'cookie_id=6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
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
};
