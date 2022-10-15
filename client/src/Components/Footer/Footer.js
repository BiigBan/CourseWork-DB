import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react'
import Filter from './Filter/Filter';

export default function Footer() {

    const [open, setOpen] = useState(false);

    const arrow = useRef();

    const openLang = () => {
        setOpen(current => !current)
    }

    useEffect(() => {
        arrow.current.style.transition = '0.3s';
        if(open){
            arrow.current.style.transform = 'rotate(180deg)'
        } else {
            arrow.current.style.transform = 'rotate(0deg)'
        }
    }, [open])

    return (
        <Box position='relative'>
                <Filter open={open}/>
            <Box sx={{ background: '#F8F8F8', minHeight: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box onClick={openLang} sx={{
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            "&:hover": { filter: 'drop-shadow(2px 1px 3px rgb(193, 193, 193))' }
                        }}>
                            
                            <ExpandLessIcon ref={arrow} />
                            <Typography fontWeight='500' fontFamily='Roboto'>News country</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
