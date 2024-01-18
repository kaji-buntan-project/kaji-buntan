import axios from "axios";
import { getCookie } from 'cookies-next';

  export const sendDataToDB = (data,setIsAxiosError,isAxiosError) => {
  
    //データがない時は送信しない
    if(data.houseworks.length === 0){
      console.log('データがないので送信しません');
      return
    }

    //cookieにidがない場合はAPI送信しない。エラー画面は表示せずに結果を表示（エラーはバックエンドで検知）
    const cookie = getCookie('cookie_id');

    if(cookie == undefined || cookie == ''){
      console.log('cookie_idがないので送信しません');
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
      //isAxiosErrorをfalseにする(異常なし)
      setIsAxiosError(false)
      return isAxiosError
    })
    .catch((error) => {
      console.log(error);
      //isAxiosErrorをtrueにする(異常あり)
      setIsAxiosError(true)
      return isAxiosError
    });
};
