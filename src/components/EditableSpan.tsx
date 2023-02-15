import TextField from "@material-ui/core/TextField";
import React, {ChangeEvent, memo, useState} from "react";


type EditTitlePropsType = {
    title: string
    onChange: (taskTitle: string) => void
}

export const EditableSpan = memo((props: EditTitlePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>(props.title)

    const editSpan = () => {
        setEditMode(true)
        setTaskTitle(props.title)
    }
    const confirmEditSpan = () => {
        setEditMode(false)
        props.onChange(taskTitle.trim())
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    return (
        editMode
            ? <TextField onBlur={confirmEditSpan} onChange={onChangeInputHandler} autoFocus={true} value={taskTitle}/>
            : <span onDoubleClick={editSpan}> {props.title || '(not defined)'} </span>
    )

})