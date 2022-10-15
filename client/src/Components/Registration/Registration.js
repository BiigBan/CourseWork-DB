import { Box, TextField, Typography } from '@mui/material';
import { Form, ErrorMessage, Formik, Field } from 'formik';
import React from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import style from './Registration.module.css'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../store/authSlice';

export default function Registration() {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    let schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(10),
    });

    if(isAuth) return <Navigate to='/'/>
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '150px' }}>
            <Typography mb='30px' textAlign='center' variant='h2'>Registration</Typography>
            <Formik
                initialValues={{name: '', email: '', password: '' }}
                validationSchema={schema}
                onSubmit={(values) => {
                    dispatch(registration(values))
                    localStorage.setItem("email", values.email);
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
                                <Field placeholder='Email' className={style.input} type="email" name="email" />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="email" component="div" />
                                </Box>
                            </Box>
                            <Box sx={{ mb: '20px' }}>
                                <Field placeholder='Password' className={style.input} type="password" name="password" />
                                <Box sx={{ width: '200px', color: 'red', textAlign: 'center', margin: '0 auto' }}>
                                    <ErrorMessage name="password" component="div" />
                                </Box>
                            </Box>
                            <button className={style.button} type="submit">
                                Submit
                            </button>
                            <Typography textAlign='center'>Have an account? <NavLink to='/login' style={{ color: 'black' }}>Login</NavLink></Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
