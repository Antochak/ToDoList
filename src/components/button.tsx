import Button from '@material-ui/core/Button';
import React from 'react'
import classes from "./style/ToDoList.module.css";


export type ButtonType = {
    buttonName: string
    callBack: ()=>void
    filter?: string
}

export const UniversButton = (props: ButtonType) => {
    const onClickHandler = () => props.callBack()
    return <Button
        variant={"contained"}
        color={"primary"}
        size={"small"}
        className={props.buttonName === props.filter ? classes.activeFilter : ""}
        onClick={onClickHandler}
    >
        {props.buttonName}</Button>
}