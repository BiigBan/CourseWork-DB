import './App.css';

import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import {
  createTheme,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';

import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Profile from './Components/Profile/Profile';
import Registration from './Components/Registration/Registration';
import { Context } from './Context';
import { getUser } from './store/authSlice';
import { getNews } from './store/newsSlice';

function App() {

  const dispatch = useDispatch();
  const lang = useSelector(state => state.auth.lang)
  const articles = useSelector(state => state.news.articles)

  useEffect(() => {
    let key = localStorage.getItem("email");
    if (key.length > 0) {
      dispatch(getUser(key));
    }
  }, [])

  useEffect(() => {
    if ( lang !== undefined) {
      dispatch(getNews({ lang, media: 'True' }))
    }
  }, [lang])

  const theme = createTheme({
    typography: {
      fontFamily: 'Playfair Display'
    },
    palette: {
      primary: {
        main: '#FDFDFD'
      },
      secondary: {
        main: '#121221'
      }
    }
  })

  const smallPhone = useMediaQuery(theme.breakpoints.down('sm'));

  if (articles === 'Request failed with status code 429') {
    return (<>
    <Typography textAlign='center' variant='h2'>Api error. You see this message cuz I use free API and  I have limit for requests. Please refresh this page through 2 minutes</Typography>
      <Typography textAlign='center' variant='h5' color='red'>message from API: "You have exceeded the rate limit per hour for your plan, BASIC, by the API provider"</Typography>
    </>
    )
  }
  else {
    return (
      <>
      <Context.Provider value={smallPhone}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/news-app' element={<Main />} />
              <Route path='/' element={<Navigate to={'/news-app'}/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/news-app/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/news-app/registration' element={<Registration />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/news-app/profile' element={<Profile />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </Context.Provider>
      </>
    )
  }
}

export default App;
