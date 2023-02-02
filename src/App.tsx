import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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

function App() {

    let toDoLists1 = v1()
    let toDoLists2 = v1()
    let [toDoLists, setToDoLists] = useState<ToDoListType[]>([
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
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
        setTasks( {...tasks,
            [todoListId]:{...tasks[todoListId],
                data: tasks[todoListId].data.filter(el=>el.id !== taskId)}})
    }
    function deleteAllTasks(todoListId: string) {
         setTasks({
             ...tasks,
                [todoListId]:{...tasks[todoListId],
                    data: tasks[todoListId].data.filter(el=>!el)
                }
            }
         )
    }
    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({
            ...tasks,
            [todoListId]: {
                ...tasks[todoListId],
                data: [...tasks[todoListId].data, newTask],
            },
        })
    }
    const changeCheckBox = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
                [todoListId]:{...tasks[todoListId],
                    data: [...tasks[todoListId].data.map(el=>el.id == taskId ? {...el, isDone: isDone} : el)]}})
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTasks({...tasks,
            [todoListId]:{
            ...tasks[todoListId],
                filter: value
        }})
    }
    const deleteTodolist = (todoListId: string) => {
        setToDoLists(toDoLists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        let toDoList:ToDoListType = {id: newTodolistId, title: title}
        setToDoLists([toDoList, ...toDoLists])
        setTasks({...tasks,[newTodolistId]: {data: [], filter: 'all'}})
    }
    const editTaskTitle = (todoListId: string, newTaskTitleValue: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todoListId]:{
                ...tasks[todoListId],
                data:
                    [...tasks[todoListId].data.map(task=>task.id==taskId ? {...task, title: newTaskTitleValue} : task)]
            }
        })
    }
    const editTodolistTitle = (todoListId: string, newTodolistTitle: string) => {
        setToDoLists(toDoLists.map(list=>list.id == todoListId ? {...list, title: newTodolistTitle} : list))
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

export default App;

