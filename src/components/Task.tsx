import React, {useCallback} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {changeStatusTaskAC, editTaskTitleAC, removeTaskAC, TasksType} from "../state/Task-Reducer";
import {Delete} from "@material-ui/icons";
import {UCheckbox} from "./Checkbox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    id: string
    task: TasksType
}

export const Task: React.FC<TaskPropsType> = ({task, id}) => {
    const dispatch = useDispatch()
    console.log('task')
    const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(id, taskId)), [dispatch])
    const changeStatusTask = useCallback((taskId: string, CheckboxValue: boolean) => {
        dispatch(changeStatusTaskAC(id, taskId, CheckboxValue))
    }, [dispatch])
    const changeTitleTask = useCallback((newTaskTitleValue: string, taskId: string) => {
        dispatch(editTaskTitleAC(id, newTaskTitleValue, taskId))
    }, [dispatch])

    return (<>
        <IconButton
            aria-label="delete"
            onClick={() => removeTask(task.id)}
        >
            <Delete/>
        </IconButton>
        <UCheckbox
            callback={(CheckboxValue) => changeStatusTask(task.id, CheckboxValue)}
            isDone={task.isDone}
        />
        <EditableSpan
            title={task.title}
            onChange={(newTaskTitleValue) => changeTitleTask(newTaskTitleValue, task.id)}
        />
    </>);
};

export default Task;