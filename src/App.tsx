import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {addTodoListAC, getTodoTC} from "./state/TodoList-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import { TodolistType} from "./api/todolist-api";

function App() {
    console.log('app')
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getTodoTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}> <AddItemForm addItem={addTodolist}/> </Grid>
                <Grid container spacing={3}> {todolists.map((list) => {
                    return (
                        <Grid item key={list.id}>
                            <Paper style={{padding: '10px'}} elevation={6}>
                                <Todolist todolist={list}/>
                            </Paper>
                        </Grid>
                    )
                })} </Grid>
            </Container>
        </div>
    );
}

export default App;

