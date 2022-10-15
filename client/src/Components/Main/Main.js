import React from 'react'

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardMedia, CircularProgress, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import Item from './Item/Item';
import Paginator from './Paginator/Paginator';
import { Countertops } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, getNews } from '../../store/newsSlice';
import { logDOM } from '@testing-library/react';
import User from './User/User';

export default function Main() {

    const news = useSelector(state => state.news);
    const [currentPage, setCurrentPage] = useState(1);
    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNews({ lang: 'en', media: 'True' }))
    }, [])

    if (news.articles.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column', flex: '1 1 auto' }}>
                <CircularProgress />
            </Box>
        )
    } else {
        let items = [];
        for (let i = 0; i < news.articles.length; i++) {
            if (i >= ((currentPage * 6) - 1) && i < ((currentPage * 6) - 1 + 6)) {
                items.push(<Item currentPage={currentPage} key={news.articles[i]._id} item={news.articles[i]} />)
            }
        }
        return (
            <Container >

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontFamily='Roboto' fontWeight='700' fontSize='36px' variant="h2" component="div" sx={{ mb: '24px' }}>
                        Latest News
                    </Typography>
                    <Box>
                        <User/>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    {items}
                </Grid>
                <Paginator allArticles={news.allArticles} setCurrentPage={setCurrentPage} />
            </Container>
        );
    }
}
