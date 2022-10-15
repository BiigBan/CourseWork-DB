import { Search } from '@mui/icons-material'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Container } from '@mui/system';
import logo from './../../assets/header/logo.svg';
import style from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchNews } from '../../store/newsSlice';

export default function Header() {

    const dispatch = useDispatch();

    const [text, setText] = useState('');


    const textFieldChanged = (event) => {
        setText(event.target.value);
    }

    const EnterFun = (event) => {
        if(event.key === "Enter") {
            dispatch(searchNews({ q: text, lang: 'en', media: 'True' }))
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar sx={{ boxShadow: 'none' }} position="static">
                <Container>
                    <Toolbar sx={{ padding: '0' }}>
                        <Box sx={{ flexGrow: 1, margin: '00px 10px -20px 0' }}>
                            <a className={style.logo} href="/"><img src={logo} alt="logo image" /></a>
                        </Box>
                        <Box position='relative' sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField onKeyUp={EnterFun} onChange={textFieldChanged} value={text}  id="standard-basic" label="Search news" variant="standard" />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    )
}
