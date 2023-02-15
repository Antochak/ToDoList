import React, {useCallback} from 'react';
import './App.css';
import {TodolistRedux} from './TodolistRedux';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {addTodoListAC, ToDoListType} from "./state/TodoList-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

function AppRedux() {
    console.log('app')
    const todolists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)
    const dispatch = useDispatch()

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
                                <TodolistRedux todolist={list}/>
                            </Paper>
                        </Grid>
                    )
                })} </Grid>
            </Container>
        </div>
    );
}

export default AppRedux;

