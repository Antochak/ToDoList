import React from 'react';
import './App.css';
import {TodolistRedux} from './TodolistRedux';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC, editTodolistTitleAC, removeTodoListAC, ToDoListType
} from "./state/TodoList-Reducer";
import {
    addTaskAC, changeFilterAC, changeStatusTaskAC, editTaskTitleAC, removeAllTaskAC, removeTaskAC, TaskStateType
} from "./state/Task-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed" | '3 tasks';

function AppRedux() {

    const todolists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)
    // let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(todoListId: string, taskId: string) {
         dispatch(removeTaskAC(todoListId,taskId))
    }
    function deleteAllTasks(todoListId: string) {
        dispatch(removeAllTaskAC(todoListId))
    }
    function addTask(todoListId: string, title: string) {
        dispatch(addTaskAC(todoListId, title))
    }
    const changeCheckBox = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todoListId,taskId,isDone))
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todoListId,value))
    }
    const deleteTodolist = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    const editTaskTitle = (todoListId: string, newTaskTitleValue: string, taskId: string) => {
        dispatch(editTaskTitleAC(todoListId,taskId,newTaskTitleValue))
    }
    const editTodolistTitle = (todoListId: string, newTodolistTitle: string) => {
        dispatch(editTodolistTitleAC(todoListId,newTodolistTitle))
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}> <AddItemForm addItem={addTodolist}/> </Grid>
                <Grid container spacing={3}> {todolists.map((list) => {
                    // let tasksForTodolist = tasks[list.id].data;
                    // if (tasks[list.id].filter === "active") {
                    //     tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    // }
                    // if (tasks[list.id].filter === "completed") {
                    //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    // }
                    // if (tasks[list.id].filter == '3 tasks') {
                    //     tasksForTodolist = tasksForTodolist.filter((el, index) => index < 3 ? el == el : '')
                    // }
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

