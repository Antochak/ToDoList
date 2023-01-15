import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {UniversButton} from "./button";
import classes from "../css/ToDoList.module.css";
import TextField from "@material-ui/core/TextField";


export type AddItemFormPropsType = {
    addItem: (title: string)=>void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string>('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickAddItem = () => {
        if (newTaskTitle.trim() !== ''){
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className={classes.addItemForm}>
            <TextField value={newTaskTitle}
                       variant={"standard"}
                       label={error ? "Title is required" : "Type value"}
                       error={!!error}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyPressHandler}/>
            <UniversButton buttonName={'Add'} callBack={onClickAddItem}/>

            {/*<div className={classes.error}>{error}</div>*/}
        </div>
    )
}