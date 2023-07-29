import React, { useState } from 'react';

import { Button } from '@mui/material';

// import 'firebase/firestore';

// import * as firebase from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
  

    

const app = firebase.initializeApp(firebaseConfig);


//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();

const firestore = firebase.firestore();

export default function DataCollect(props) {

    const mdata = props.mydata;
    const pdata = props.partnerdata;
/// resultDashboard内のpropsとそれに対する評価を保存する.


    const saveData_good = () => {
        // Firebaseにデータを保存します。
        firestore.collection('data').add({
            mdata: mdata,
            pdata: pdata,
            evaluate: "good"
        }
        );
    }
    const saveData_bad = () => {
        // Firebaseにデータを保存します。
        firestore.collection('data').add({
            mdata: mdata,
            pdata: pdata,
            evaluate: "bad"
        }
        );
    }
    const s="Save Data"
    return (
        <div>
            <table>
            <tr>
            <td><Button onClick = {saveData_good}>
                    結果を良い分配として保存
                </Button></td>
            <td><Button onClick = {saveData_bad}>
                    結果を悪い分配として保存
                </Button></td>
            </tr>
            </table>
    </div>
    );
}