import LandingPage from 'components/landingPage';
import React from 'react';
import { getCookies, getCookie, setCookie } from 'cookies-next';
//https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  return ( <LandingPage /> );
}

export const getServerSideProps = ({req, res}) =>{

  const cookie = getCookie('cookie_id', { req, res });
  console.log('cookie',cookie);

  if(cookie){
    console.log('2回目以降のアクセス');
    return { props: {} };

  } else {
    console.log('1回目のアクセス');
    const newCookie = uuidv4();
    setCookie('cookie_id', newCookie, { req, res, maxAge: 60 * 60 * 24 * 365 });
  }

  getCookies({ req, res });
  
  return { props: {} };
}
