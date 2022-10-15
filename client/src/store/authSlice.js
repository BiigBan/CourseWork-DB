import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

//1 не работает createAsyncThunk
export const login = createAsyncThunk(
    'auth/login',
    async function ({ email, password }, { dispatch }) {
        try {
            const { data } = await axios.post(`http://localhost:3001/api/auth/login`, {
                email,
                password
            })
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    })

export const registration = createAsyncThunk(
    'auth/registration',
    async function ({ name, email, password }, { dispatch }) {
        try {
            const { data } = await axios.post(`http://localhost:3001/api/auth/registration`, {
                name,
                email,
                password
            })
            console.log(data);
            if (data.message === 'user was created') {
                return data;
            } else {
                throw Error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    })

export const profileChange = createAsyncThunk(
    'auth/profile',
    async function ({ email, name, image }, { dispatch }) {
        try {
            const { data } = await axios.put(`http://localhost:3001/api/auth/profile`, {
                name,
                email,
                image
            })
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    })

    export const getUser = createAsyncThunk(
        'auth/getUser',
        async function (email, { dispatch }) {
            try {
                const { data } = await axios.post(`http://localhost:3001/api/auth/getUser`, {
                    email,
                })
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        })

        export const changeLang = createAsyncThunk(
            'auth/changeLang',
            async function ({email, lang}, { dispatch }) {
                try {
                    const { data } = await axios.put(`http://localhost:3001/api/auth/lang`, {
                        email,
                        lang,
                    })
                    console.log(data);
                    return data;
                } catch (error) {
                    console.log(error);
                }
            })

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        id: null,
        image: 'https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png',
        isAuth: false,
        email: '',
        lang: '',
        status: null,
    },


    reducers: {
        logOutRed(state, action) {
            state.name = '';
            state.id = null;
            state.image = 'https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png';
            state.isAuth = false;
            state.email = '';
            state.status = null;
        },

    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.name = action.payload.user.name === undefined ? 'User' : action.payload.user.name;
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.image = action.payload.user.image === undefined ? 'https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png' : action.payload.user.image;
            state.isAuth = true;
        },
        [login.rejected]: (state, action) => {
            state.status = 'error';
        },
        [registration.pending]: (state, action) => {
            state.status = 'loading';
        },
        [registration.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.name = action.payload.user.name === undefined ? 'User' : action.payload.user.name;
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.image = action.payload.user.image === undefined ? 'https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png' : action.payload.user.image;
            state.isAuth = true;
        },
        [registration.rejected]: (state, action) => {
            state.status = 'error';
        },
        [profileChange.pending]: (state, action) => {
            state.status = 'loading';
        },
        [profileChange.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.name = action.payload.user.name;
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.image = action.payload.user.image;
            state.isAuth = true;
        },
        [profileChange.rejected]: (state, action) => {
            state.status = 'error';
        },
        [getUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.name = action.payload.user.name === undefined ? 'User' : action.payload.user.name;
            state.id = action.payload.user.id;
            state.email = action.payload.user.email;
            state.lang = action.payload.user.lang;
            state.image = action.payload.user.image === undefined ? 'https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png' : action.payload.user.image;
            state.isAuth = true;
        },
        [getUser.rejected]: (state, action) => {
            state.status = 'error';
        },
        [changeLang.pending]: (state, action) => {
            state.status = 'loading';
        },
        [changeLang.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.lang = action.payload.user.lang;
        },
        [changeLang.rejected]: (state, action) => {
            state.status = 'error';
        }

    }
});

export const { logOutRed } = authSlice.actions;

export default authSlice.reducer;