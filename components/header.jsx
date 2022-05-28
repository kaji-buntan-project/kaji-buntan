import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import logoHorizon from '../public/images/logo_horizontal.png';
import logoSmall from '../public/images/logo_small.png';
import Image from 'next/image';

export default function ButtonAppBar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const logo = matches ? logoHorizon : logoSmall;
    return (
        <header>
            <Image src={logo} alt="Application Logo" height={'100px'} layout='fixed' objectFit='contain'></Image>
        </header>
        /*<Box>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: 'white' }}>
                </Toolbar>
            </AppBar>
        </Box>*/
    );
}
