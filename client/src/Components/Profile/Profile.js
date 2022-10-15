import { Box,Typography } from '@mui/material';
import { Form, ErrorMessage, Formik, Field } from 'formik';
import React, { useState } from 'react'
import style from './Profile.module.css'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRed, profileChange } from '../../store/authSlice';
import { Navigate, NavLink } from 'react-router-dom';

export default function Profile() {

    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);

    let schema = yup.object().shape({
        name: yup.string().required(),
        image: yup.string().required()
    });

    const LogOut = () => {
        dispatch(logOutRed());
        localStorage.setItem("email", JSON.stringify(''));
        setChanged(true);
    }
    if(changed){
        return <Navigate to='/'/>
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '150px' }}>
            <Typography mb='30px' textAlign='center' variant='h2'>Profile</Typography>
            <Formik
                initialValues={{name: '', image: ''}}
                validationSchema={schema}
                onSubmit={(values) => {
                    dispatch(profileChange({email, ...values}));
                    setChanged(true)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: '130px' }}>
                            <Box sx={{ mb: '20px' }}>
                                <Field placeholder='Name' className={style.input} type="text" name="name" />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="name" component="div" />
                                </Box>
                            </Box>
                            <Box sx={{ mb: '20px' }}>
                                <Field placeholder='Image. Please - write url of image' className={style.input} type="text" name="image" />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="email" component="div" />
                                </Box>
                            </Box>
                            <button className={style.button} type="submit">
                                Submit
                            </button>
                            <Typography textAlign='center'><NavLink onClick={LogOut} style={{color: 'black'}}>Log out</NavLink></Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
