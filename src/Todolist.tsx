import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/button";

import classes from "./css/ToDoList.module.css";

type FilterValuesType = "all" | "active" | "completed" | '3 tasks';
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeCheckBox: (taskId: string, e: boolean)=>void
    deleteAllTasks: ()=>void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string>('')
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeSelectedHandler = ( id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckBox(id, e.currentTarget.checked)
    }
    const deleteAllTasksHandler = () => {
        props.deleteAllTasks()
    }

    const [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }
    if (filter == '3 tasks') {
        tasksForTodolist = tasksForTodolist.filter((el, index) => index < 3 ? el == el : '')
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
        setError('')
    }
    const showThreeTasksHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }
    const mappedTasks = tasksForTodolist.map(t => {
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <Button buttonName={'Delete'} callBack={()=>props.removeTask(t.id)} />
                <input type="checkbox" checked={t.isDone} onChange={(e)=>onChangeSelectedHandler(t.id, e)}/>
                <span>{t.title}</span>
            </li>
        )})
    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyPressHandler}/>
            <Button buttonName={'Add'} callBack={onClickAddTask}/>
        </div>
        <div className={classes.error}>{error}</div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
           <Button filter={filter} buttonName={'all'}  callBack={()=>changeFilter('all')}/>
           <Button filter={filter} buttonName={'active'} callBack={()=>changeFilter('active')}/>
           <Button filter={filter} buttonName={'completed'} callBack={()=>changeFilter('completed')}/>
           <Button filter={filter} buttonName={'3 tasks'} callBack={()=>showThreeTasksHandler('3 tasks')}/>
        </div>
        <div>
            <Button buttonName={'Delete All'} callBack={deleteAllTasksHandler}/>
        </div>
    </div>)
}


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }