import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
    ActionsType, addTodoListAC,
    editTodolistTitleAC,
    removeTodoListAC,
    TodoListReducer
} from "./state/TodoList-Reducer";
import {
    ActionsTypesTasks,
    addTaskAC, changeFilterAC,
    changeStatusTaskAC, editTaskTitleAC,
    removeAllTaskAC,
    removeTaskAC,
    TaskReducer
} from "./state/Task-Reducer";

export type ToDoListType = {
    id: string
    title: string
}
export type TaskStateType = {
    [key:string]:DataType
}
export type DataType = {
    data: TasksType[]
    filter: FilterValuesType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed" | '3 tasks';

function AppUseReducer() {

    let toDoLists1 = v1()
    let toDoLists2 = v1()
    let [toDoLists, dispatchToDoLists] = useReducer<Reducer<ToDoListType[], ActionsType>>(TodoListReducer,[
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ])
    let [tasks, dispatchTasks] = useReducer<Reducer<TaskStateType, ActionsTypesTasks>>(TaskReducer,{
        [toDoLists1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            filter: 'all'
        },
        [toDoLists2]: {
            data: [
                {id: v1(), title: "Whiskey", isDone: true},
                {id: v1(), title: "Cola", isDone: true},
                {id: v1(), title: "Sprite", isDone: false},
                {id: v1(), title: "Fanta", isDone: false},
                {id: v1(), title: "Beer", isDone: false},
            ],
            filter: 'all'
        }
    });

    function removeTask(todoListId: string, taskId: string) {
         dispatchTasks(removeTaskAC(todoListId,taskId))
    }
    function deleteAllTasks(todoListId: string) {
        dispatchTasks(removeAllTaskAC(todoListId))
    }
    function addTask(todoListId: string, title: string) {
        dispatchTasks(addTaskAC(todoListId, title))
    }
    const changeCheckBox = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeStatusTaskAC(todoListId,taskId,isDone))
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchTasks(changeFilterAC(todoListId,value))
    }
    const deleteTodolist = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchToDoLists(action)
        dispatchTasks(action)
    }
    const addTodolist = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToDoLists(action)
        dispatchTasks(action)
    }
    const editTaskTitle = (todoListId: string, newTaskTitleValue: string, taskId: string) => {
        dispatchTasks(editTaskTitleAC(todoListId,taskId,newTaskTitleValue))
    }
    const editTodolistTitle = (todoListId: string, newTodolistTitle: string) => {
        dispatchToDoLists(editTodolistTitleAC(todoListId,newTodolistTitle))
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}> <AddItemForm addItem={addTodolist}/> </Grid>
                <Grid container spacing={3}> {toDoLists.map((list) => {
                    let tasksForTodolist = tasks[list.id].data;
                    if (tasks[list.id].filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tasks[list.id].filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }
                    if (tasks[list.id].filter == '3 tasks') {
                        tasksForTodolist = tasksForTodolist.filter((el, index) => index < 3 ? el == el : '')
                    }
                    return (
                        <Grid item>
                            <Paper style={{padding: '10px'}} elevation={6}>
                                <Todolist title={list.title}
                                          key={list.id}
                                          todoListId={list.id}
                                          filter={tasks[list.id].filter}
                                          tasks={tasksForTodolist}
                                          deleteTodolist={deleteTodolist}
                                          removeTask={removeTask}
                                          addTask={addTask}
                                          editTaskTitle={editTaskTitle}
                                          editTodolistTitle={editTodolistTitle}
                                          changeCheckBox={changeCheckBox}
                                          deleteAllTasks={deleteAllTasks}
                                          changeFilter={changeFilter}
                                />
                            </Paper>
                        </Grid>
                    )
                })} </Grid>
            </Container>
        </div>
    );
}

export default AppUseReducer;

