import React, {useEffect} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";

import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/login/Login";
import {logOutTC, meTC} from "../features/login/auth-reducer";
import {CircularProgress} from "@mui/material";
import Menu from "@mui/material/Menu";

function App() {
    const status = useAppSelector<string>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.auth.isInitialized)
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logOutTC())
    }
    useEffect(()=> {
        dispatch(meTC())
    }, [])

    if(!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }
    return <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLogin && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route  path={'/'} element={ <TodolistsList/> }/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404 ERROR</h1>}/>
                    <Route path="*" element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
}

export default App
