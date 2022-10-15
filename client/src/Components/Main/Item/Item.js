import React from 'react'

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {Card, CardContent, CardMedia, Grid, ThemeProvider, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';


import style from './Item.module.css';

export default function Item({item}) {
    const bodyText = useRef(false);
    return (
        <Grid item xs='12' sm='6' md='4' sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
            <a className={style.link} href={item.link}>
                <Card key={item._id} sx={{
                    display: 'flex', flexDirection: 'column', flex: '1 1 auto', justifyContent: 'space-between', boxShadow: 'none', background: '#FDFDFD'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                        <CardMedia
                            component="img"
                            height="240"
                            image={item.media ? item.media : 'https://cms.qz.com/wp-content/uploads/2016/12/tech_democracy_img.png?quality=75&strip=all&w=1380&h=776'}
                            alt="image of news"
                            sx={{ borderRadius: '8px', mb: '20px', objectFit: 'contain' }}
                        />
                        <CardContent sx={{ padding: '0', m: '0' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                                <Typography sx={{ mb: '24px', textDecoration: "none" }} fontWeight="700" variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                {item.summary.length > 700 ? (
                                    <Box sx={{ mb: '20px' }}>
                                        <Typography lineHeight='180%' fontFamily='Roboto' fontWeight='400' className={style.textTrack} ref={bodyText} variant="body2" color="text.secondary" sx={{ maxHeight: '300px', overflowY: 'scroll', textDecoration: "none" }}>
                                            {item.summary}
                                        </Typography>
                                    </Box>
                                ) : (<Typography ref={bodyText} lineHeight='180%' variant="body2" fontFamily='Roboto' fontWeight='400' color="text.secondary" sx={{ textDecoration: "none" }}>
                                    {item.summary}
                                </Typography>
                                )
                                }
                            </Box>
                        </CardContent>
                    </Box>
                    <Typography sx={{ display: 'flex', justifyContent: 'flex-end', textDecoration: "none" }} variant="span" color="text.secondary.dark">
                        {item.published_date}
                    </Typography>
                </Card>
            </a>
        </Grid>
    )
}
