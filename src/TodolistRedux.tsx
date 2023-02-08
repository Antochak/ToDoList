import React from 'react';
import {UniversButton} from "./components/button";
import classes from "./components/style/ToDoList.module.css";
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditTaskTitle} from "./components/EditSpan";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import {UCheckbox} from "./components/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTaskAC,
    changeFilterAC,
    changeStatusTaskAC,
    editTaskTitleAC,
    removeAllTaskAC,
    removeTaskAC
} from "./state/Task-Reducer";
import {editTodolistTitleAC, removeTodoListAC, ToDoListType} from "./state/TodoList-Reducer";

type PropsType = {
   todolist: ToDoListType
}

export function TodolistRedux({todolist}: PropsType) {
    const {id, title} = todolist
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id].data)
    let filter = useSelector<AppRootStateType, FilterValuesType>(state => state.tasks[id].filter)
    const dispatch = useDispatch()


    const onChangeSelectedHandler = (taskId: string, CheckboxValue: boolean) => {
        dispatch(changeStatusTaskAC(id,taskId, CheckboxValue))
    }

    const deleteAllTasks = () => dispatch(removeAllTaskAC(id))

    const deleteTodolist = () => dispatch(removeTodoListAC(id))

    const showThreeTasks = (todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId,value))
    }
    const addTask = (title: string) => dispatch(addTaskAC(id, title))

    const ChangeTodolistTitle = (newTodolistTitle: string) => {
        dispatch(editTodolistTitleAC(id,newTodolistTitle))
    }
    const onChangeTaskTitle = (newTaskTitleValue: string, taskId: string) => {
       dispatch(editTaskTitleAC(id, newTaskTitleValue, taskId))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (filter == '3 tasks') {
        tasks = tasks.filter((el, index) => index < 3 ? el == el : '')
    }

    const mappedTasks = tasks.map(t => {
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <IconButton
                    aria-label="delete"
                    onClick={()=>dispatch(removeTaskAC(id, t.id))}
                >
                    <Delete />
                </IconButton>
                <UCheckbox
                    callback={(CheckboxValue)=>onChangeSelectedHandler(t.id, CheckboxValue)}
                    isDone={t.isDone}
                />
                <EditTaskTitle
                    title={t.title}
                    onChange={(newTaskTitleValue)=>onChangeTaskTitle(newTaskTitleValue, t.id)}
                />
            </li>
        )})
    return (
        <div>
            <h3>
                <EditTaskTitle
                    title={title}
                    onChange={ChangeTodolistTitle}
                />
                <Button variant="outlined"
                        startIcon={<Delete />}
                        onClick={deleteTodolist}
                >
                </Button>
            </h3>
        <AddItemForm addItem={addTask} />
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <ButtonGroup size="small" aria-label="small button group">
                   <Button variant="outlined"
                           color={"primary"}
                           onClick={()=>dispatch(changeFilterAC(id, 'all'))}>
                       all
                   </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>dispatch(changeFilterAC(id,'active'))}>
                        active
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>dispatch(changeFilterAC(id,'completed'))}>
                        completed
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>showThreeTasks(id,'3 tasks')}>
                        3 tasks
                    </Button>
                </ButtonGroup>
            </div>
        <div>
            <UniversButton
                buttonName={'Delete All'}
                callBack={deleteAllTasks}
            />
        </div>
    </div>)
}
