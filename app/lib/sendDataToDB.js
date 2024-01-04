import axios from "axios";
export const sendDataToDB = (data) => {
  console.log(data);
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
