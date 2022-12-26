import React from 'react'
import classes from "../css/ToDoList.module.css";

export type ButtonType = {
    buttonName: string
    callBack: ()=>void
    filter?: string
}
export const Button = (props: ButtonType) => {
    const onClickHandler = () => props.callBack()
    return <button
        className={props.buttonName === props.filter ? classes.activeFilter : ""}
        onClick={onClickHandler}
    >
        {props.buttonName}</button>
}