import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

export default function User() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth);


    if (!isAuth) {
        return <Typography><NavLink style={{color: 'black' }} to='/login'>Login/Registration</NavLink></Typography>
    } 
    return (
        <Box sx={{ display: 'flex' }}>
            <NavLink style={{display: 'flex', color: 'black'}} to='profile'>
            <Box sx={{width: '20px', height: '20px', borderRadius: '50%'}}>
            <img style={{width: '100%'}} src={user.image} alt="user image" />
            </Box>
            <Box ml='10px'>
                {user.name}
            </Box>
            </NavLink>
        </Box>
    )
}
