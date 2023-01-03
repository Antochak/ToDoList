import React, {ChangeEvent, useState} from "react";

type EditTitlePropsType = {
    title: string
    onChange: (taskTitle: string)=>void
}
export const EditTaskTitle = (props: EditTitlePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [taskTitle,setTaskTitle] = useState<string>('')
    const editSpan =() => {
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
        editMode ?
            <input onBlur={confirmEditSpan}
                   onChange={onChangeInputHandler}
                   autoFocus={true}
                   value={taskTitle}
            /> :
            <span onDoubleClick={editSpan}
            >
                {props.title || '(not defined)'}
            </span>
    )

}