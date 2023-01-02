import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/button";
import classes from "./css/ToDoList.module.css";
import {FilterValuesType} from "./App";

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
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string>('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
            props.addTask(props.todoListId, newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(props.todoListId,newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
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

    const mappedTasks = props.tasks.map(t => {
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <Button buttonName={'Delete'} callBack={()=>props.removeTask(props.todoListId, t.id)} />
                <input type="checkbox" checked={t.isDone} onChange={(e)=>onChangeSelectedHandler(t.id, e)}/>
                <span>{t.title}</span>
            </li>
        )})
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={deleteTodolistHandler}>X</button>
            </h3>
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