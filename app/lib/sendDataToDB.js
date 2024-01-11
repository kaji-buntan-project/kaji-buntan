import axios from "axios";
export const sendDataToDB = (data) => {

  //データがない時は送信しない
  if(data.houseworks.length === 0){
    return
  }

  //apiエンドポイント
  const apiUrl = "/api/diagnosis";

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl,
    headers: {
      "Content-Type": "application/json",
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
};
