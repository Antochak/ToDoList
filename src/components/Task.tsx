import React, {ChangeEvent, useCallback} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {deleteTasksTC, editTaskTitleAC, updateTaskTC} from "../state/Task-Reducer";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useAppDispatch} from "../state/store";
import {Checkbox} from "@material-ui/core";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = ({task, todolistId}) => {
    const dispatch = useAppDispatch()

    const removeTask = useCallback((taskId: string) => dispatch(deleteTasksTC(todolistId, taskId)), [])

    const changeStatusTask = useCallback((taskId: string, e:ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.checked
        console.log('newValue: ', newValue)
        console.log('taskId: ', taskId)
        console.log('todolistId: ', todolistId)
        dispatch(updateTaskTC(todolistId, taskId, newValue ? TaskStatuses.New : TaskStatuses.Completed))
    }, [])

    const changeTitleTask = useCallback((newTaskTitleValue: string, taskId: string) => {
        dispatch(editTaskTitleAC(todolistId, newTaskTitleValue, taskId))
    }, [])

    return (<>
        <IconButton
            aria-label="delete"
            onClick={() => removeTask(task.id)}
        >
            <Delete/>
        </IconButton>
        <Checkbox
             onChange={(e) => changeStatusTask(task.id, e)}
            checked={task.status === TaskStatuses.Completed}
        />
        <EditableSpan
            title={task.title}
            onChange={(newTaskTitleValue) => changeTitleTask(newTaskTitleValue, task.id)}
        />
    </>);
};

export default Task;