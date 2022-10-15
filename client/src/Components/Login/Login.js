import { Box, Button, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import style from './Login.module.css';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';


export default function Login() {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    let schema = yup.object().shape({
        email: yup.string().email().required(),
    });
    if(isAuth) return <Navigate to='/'/>
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '150px' }}>
            <Typography mb='30px' textAlign='center' variant='h2'>Welcome at News app!</Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                        dispatch(login(values))
                        localStorage.setItem("email", values.email);
                }}
                validationSchema={schema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: '130px' }}>
                            <Box sx={{ mb: '20px' }}>
                                <Field placeholder='Email' className={style.input} type="email" name="email" />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="email" component="div" />
                                </Box>
                            </Box>
                            <Box sx={{ mb: '20px' }}>
                                <Field placeholder='Password' className={style.input} type="password" name="password"  />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="password" component="div" />
                                </Box>
                            </Box>
                            <button className={style.button} type="submit">
                                Submit
                            </button>
                            <Typography textAlign='center'>Don't have an account? <NavLink to='/registration' style={{color: 'black'}}>Registration</NavLink></Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
