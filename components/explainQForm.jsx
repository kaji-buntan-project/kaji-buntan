import sensei from '../public/images/sensei.png';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function ExplainQForm() {
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
                <b className='text'><font size="4">{ "For those who want to know more\n" }</font></b>
                <b className='text'><font size="3" color="#9c27b0"><a href="https://drive.google.com/file/d/1dgzbjmEIKiERdxmgEyhW-dsbI2lYDX1d/view?usp=sharing">{ "→ Detail\n" }</a></font></b>
                <b className='text'><font size="4">{ "Please give us your feedback\n" }</font></b>
                <b className='text'><font size="3" color="#9c27b0"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfWWxo2zFc7KV0_xCCDe5qp608Ir_ZOfAuXaf4X7q7sIexlkw/viewform?usp=sf_link">{ "→ Google Form\n" }</a></font></b>
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
        </Box>
    );
}