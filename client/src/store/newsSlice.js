import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

//1 не работает createAsyncThunk
export const getNews = createAsyncThunk(

    'news/getNews',
    async function ({ lang = 'en', media = 'True' }, { dispatch }) {
        try {
            const { data } = await axios.get(`https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=${lang}&media=${media}`, {
                headers: {
                    'X-RapidAPI-Key': 'ff2cdbd7b5msh8ce4e43184ff15ap1b9f0djsne4e318b2e942',
                    'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
                }
            })
            console.log(data);
            return data.articles;
        } catch (error) {
            return error.message;
        }

    }
)

export const searchNews = createAsyncThunk(
    'news/searchNews',
    async function ({ q = '', lang = 'en', media = 'True' }, { dispatch }) {
        const { data } = await axios.get(`https://newscatcher.p.rapidapi.com/v1/search_free?q=${q}&lang=${lang}&media=${media}`, {
            headers: {
                'X-RapidAPI-Key': 'ff2cdbd7b5msh8ce4e43184ff15ap1b9f0djsne4e318b2e942',
                'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
            }
        })

        return data.articles;
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        allArticles: 0,
        language: 'en',
        status: null,
        message: '',
    },


    reducers: {
        searchNews(state, action) {
            state.articles.push(action.payload)
        },

        getArticles(state, action) {
            state.articles = [action.payload]
        },
        allArticles(state, action) {
            state.allArticles = action.payload
        },
        changeLanguage(state, action) {
            getNews(action.payload);
            state.language = action.payload;
        }

    },
    extraReducers: {
        [getNews.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getNews.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.articles = action.payload;
            state.allArticles = action.payload.length
        },
        [getNews.rejected]: (state, action) => {
            state.status = 'error';
            console.log(action);
            state.message = action.payload;
        },
        [searchNews.pending]: (state, action) => {
            state.status = 'loading';
        },
        [searchNews.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.articles = action.payload;
            state.allArticles = action.payload.length;
        },
        [searchNews.rejected]: (state, action) => {
            state.status = 'error';
        },
    }
})

export const { getArticles, allArticles } = newsSlice.actions;

export default newsSlice.reducer;