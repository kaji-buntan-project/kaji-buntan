import sensei from '../public/images/sensei.png';
import { Box, Button, Container, Grid, Tooltip } from '@mui/material';
import Image from 'next/image';

export default function ExplainQForm() {
    const questinForm = "https://forms.gle/kjHo2mRW1PpJEBE59"
    const explainURL = "https://drive.google.com/file/d/1VF6hrktuFPq-ggrXRL_iqQeUCKxWCzVk/view?usp=sharing"

    const sayingForQuestion = "アプリ概要，専門的なことは次を見てね\n  https://drive.google.com/file/d/1VF6hrktuFPq-ggrXRL_iqQeUCKxWCzVk/view?usp=sharing\n アンケートにご協力ください\n  https://forms.gle/kjHo2mRW1PpJEBE59"
 



    return (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'start', marginBottom: '1.5em'}}>
            <Image alt="introduction" src={sensei} width={102} height={102}></Image>
            <Box sx={{
                backgroundColor: 'rgba(211,211,211,0.5)',
                borderRadius: '5px',
                marginLeft: '1.5em',
                paddingY: '0.5em',
                paddingX: '1em',
                position: 'relative',
            }}>
                <b className='text'><font size="5">{ "アプリ概要，専門的なことは次を見てね\n" }</font></b>
                <b className='text'><font size="5" color="#9c27b0"><a href="https://drive.google.com/file/d/1VF6hrktuFPq-ggrXRL_iqQeUCKxWCzVk/view?usp=sharing">{ " https://drive.google.com/file/d/1VF6hrktuFPq-ggrXRL_iqQeUCKxWCzVk/view?usp=sharing\n" }</a></font></b>
                <b className='text'><font size="5">{ "アンケートにご協力ください\n" }</font></b>
                <b className='text'><font size="5" color="#9c27b0"><a href="https://forms.gle/kjHo2mRW1PpJEBE59">{ " https://forms.gle/kjHo2mRW1PpJEBE59\n" }</a></font></b>
                <Box sx={{
                    boxSizing: 'content-box',
                    backgroundColor: 'transparent',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderRight: '10px solid rgba(211,211,211,0.5)',
                    position: 'absolute',
                    left: '-10px',
                    top: '15px',
                    height: '0px',
                    width: '0px'
                }}></Box>
            </Box>
            <h1></h1>
        </Box>
    );
}
