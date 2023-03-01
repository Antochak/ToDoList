import React, {memo, useCallback} from 'react';
import {UniversButton} from "./components/button";
import classes from "./components/style/ToDoList.module.css";

import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeFilterAC, removeAllTaskAC, TasksType} from "./state/Task-Reducer";
import {editTodolistTitleAC, removeTodoListAC} from "./state/TodoList-Reducer";
import Task from "./components/Task";
import {TodolistType} from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed" | '3 tasks';

type PropsType = {
    todolist: TodolistType
}

export const Todolist = memo(({todolist}: PropsType) => {
    console.log('todolist')
    const {id, title} = todolist

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id].tasksList)
    let filter = useSelector<AppRootStateType, FilterValuesType>(state => state.tasks[id].filter)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)), [dispatch])
    const deleteAllTasks = useCallback(() => dispatch(removeAllTaskAC(id)), [dispatch])

    const deleteTodolist = useCallback(() => dispatch(removeTodoListAC(id)), [dispatch])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) => {
        dispatch(editTodolistTitleAC(id, newTodolistTitle))
    }, [dispatch])

    const showThreeTasks = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }, [dispatch])


    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (filter == '3 tasks') {
        tasks = tasks.filter((el, index) => index < 3 ? el == el : '')
    }
    const mappedTasks = tasks?.map(t => {
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <Task task={t} id={id}/>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    onChange={changeTodolistTitle}
                />
                <Button variant="outlined"
                        startIcon={<Delete/>}
                        onClick={deleteTodolist}
                >
                </Button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <ButtonGroup size="small" aria-label="small button group">
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={() => dispatch(changeFilterAC(id, 'all'))}>
                        all
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={() => dispatch(changeFilterAC(id, 'active'))}>
                        active
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={() => dispatch(changeFilterAC(id, 'completed'))}>
                        completed
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={() => showThreeTasks(id, '3 tasks')}>
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
})
