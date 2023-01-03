import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/button";
import classes from "./css/ToDoList.module.css";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditTaskTitle} from "./components/EditSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeCheckBox: (todoListId: string, taskId: string, e: boolean)=>void
    deleteAllTasks: (todoListId: string)=>void
    filter: FilterValuesType
    changeFilter: (todoListId: string,value: FilterValuesType)=>void
    todoListId: string
    deleteTodolist: (todoListId: string)=>void
    editTaskTitle: (todoListId: string, newTaskTitleValue: string, taskId: string)=>void
    editTodolistTitle: (todoListId: string, newTodolistTitle: string)=>void
}

export function Todolist(props: PropsType) {

    const onChangeSelectedHandler = ( id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckBox(props.todoListId ,id, e.currentTarget.checked)
    }
    const deleteAllTasksHandler = () => {
        props.deleteAllTasks(props.todoListId)
    }
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todoListId)
    }
    const showThreeTasksHandler = (todoListId: string, value: FilterValuesType) => {
        props.changeFilter(todoListId, value)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const ChangeTodolistTitleHandler = (newTodolistTitle: string) => {
        props.editTodolistTitle(props.todoListId, newTodolistTitle)
    }
    const mappedTasks = props.tasks.map(t => {
        const onChangeTaskTitleHandler = (newTaskTitleValue: string) => {
            props.editTaskTitle(props.todoListId, newTaskTitleValue, t.id)
        }
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <Button buttonName={'Delete'} callBack={()=>props.removeTask(props.todoListId, t.id)} />
                <input type="checkbox" checked={t.isDone} onChange={(e)=>onChangeSelectedHandler(t.id, e)}/>
                <EditTaskTitle title={t.title} onChange={onChangeTaskTitleHandler}/>
            </li>
        )})
    return (
        <div>
            <h3>
                <EditTaskTitle title={props.title} onChange={ChangeTodolistTitleHandler}/>
                <Button buttonName={'Delete list'} callBack={deleteTodolistHandler}/>
            </h3>
        <AddItemForm addItem={addTask} />
            <ul>
                {mappedTasks}
            </ul>
            <div>
               <Button
                       filter={props.filter} buttonName={'all'}
                       callBack={()=>props.changeFilter(props.todoListId, 'all')}/>
               <Button filter={props.filter}
                       buttonName={'active'}
                       callBack={()=>props.changeFilter(props.todoListId,'active')}/>
               <Button filter={props.filter}
                       buttonName={'completed'}
                       callBack={()=>props.changeFilter(props.todoListId,'completed')}/>
               <Button filter={props.filter}
                       buttonName={'3 tasks'}
                       callBack={()=>showThreeTasksHandler(props.todoListId,'3 tasks')}/>
            </div>
        <div>
            <Button buttonName={'Delete All'} callBack={deleteAllTasksHandler}/>
        </div>
    </div>)
}
