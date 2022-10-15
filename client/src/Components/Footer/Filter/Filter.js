import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { changeLang } from '../../../store/authSlice';
import { getNews } from '../../../store/newsSlice';

export default function Filter({ open }) {

  const dispatch = useDispatch();

  const openRef = useRef(undefined);

  useEffect(() => {
    openRef.current.style.transition = '0.3s';
  }, [])

  useEffect(()=> {
    open ? openRef.current.style.height = '30px' : openRef.current.style.height = '0px';
  }, [open])

  let key = localStorage.getItem('email')

  const changeCountry = (e) => {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
      case 'ENGLISH':
        dispatch(getNews({lang: 'en', media: 'True'}));
        if(key != '') {
          dispatch(changeLang({email: key, lang: 'en'}))
        }
        break;
      case 'UKRAINIAN':
        dispatch(getNews({lang: 'uk', media: 'True'}));
        if(key != '') {
          dispatch(changeLang({email: key, lang: 'uk'}))
        }
        break;
        case 'RUSSIAN':
        dispatch(getNews({lang: 'ru', media: 'True'}))
        if(key != '') {
          dispatch(changeLang({email: key, lang: 'ru'}))
        }
        break;
      default:
        break;
    }
    dispatch(getNews(e.target.value))
  }

  return (
    <Box ref={openRef}  sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', background: '#f0f0f0', boxShadow: "0 1px 3px #f0f0f0", height: '0px', overflow: 'hidden' }}>
      <Typography onClick={changeCountry} fontSize='18px' sx={{
        cursor: 'pointer', transition: '0.3s',
        '&:hover': { color: 'rgb(88, 88, 88)' }
      }}>ENGLISH</Typography>
      <Typography onClick={changeCountry} fontSize='18px' sx={{
        cursor: 'pointer', transition: '0.3s',
        '&:hover': { color: 'rgb(88, 88, 88)' }
      }}>UKRAINIAN</Typography>
      <Typography onClick={changeCountry} fontSize='18px' sx={{
        cursor: 'pointer', transition: '0.3s',
        '&:hover': { color: 'rgb(88, 88, 88)' }
      }}>RUSSIAN</Typography>
    </Box>
  )
}
