// Simple Landing Page component which will contain just enough controls to log in
// This page is used as a fallback when users are not logged

//import Image from 'next/image';
//import mainImage from 'public/undraw_positive_attitude_re_wu7d.svg';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import IntroImageStepper from './introImageStepper';
import { text } from 'd3';
import styles from '../styles/landingPage.module.css';


export default function LandingPage() {
    
    return (
        <main style={{textAlign: "center"}}>
            <IntroImageStepper></IntroImageStepper>
            <Link href="/input" passHref={true} ><Button variant="contained" color="secondary" sx={{m: 2, px: 6, py:2}}><Typography className={styles.button_to_use} variant="h3">使ってみる</Typography></Button></Link>
        </main>
    );
}