import React, {ChangeEvent} from 'react';
import {UniversButton} from "./components/button";
import classes from "./components/style/ToDoList.module.css";
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditTaskTitle} from "./components/EditSpan";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import {UCheckbox} from "./components/Checkbox";



type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeCheckBox: (todoListId: string, taskId: string, CheckboxValue: boolean)=>void
    deleteAllTasks: (todoListId: string)=>void
    filter: FilterValuesType
    changeFilter: (todoListId: string,value: FilterValuesType)=>void
    todoListId: string
    deleteTodolist: (todoListId: string)=>void
    editTaskTitle: (todoListId: string, newTaskTitleValue: string, taskId: string)=>void
    editTodolistTitle: (todoListId: string, newTodolistTitle: string)=>void
}

export function Todolist(props: PropsType) {

    const onChangeSelectedHandler = ( id: string, CheckboxValue: boolean) => {
        props.changeCheckBox(props.todoListId ,id, CheckboxValue)
    }
    const deleteAllTasksHandler = () => props.deleteAllTasks(props.todoListId)

    const deleteTodolistHandler = () => props.deleteTodolist(props.todoListId)

    const showThreeTasksHandler = (todoListId: string, value: FilterValuesType) => {
        props.changeFilter(todoListId, value)
    }
    const addTask = (title: string) => props.addTask(props.todoListId, title)

    const ChangeTodolistTitleHandler = (newTodolistTitle: string) => {
        props.editTodolistTitle(props.todoListId, newTodolistTitle)
    }
    const onChangeTaskTitleHandler = (newTaskTitleValue: string, taskId: string) => {
        props.editTaskTitle(props.todoListId, newTaskTitleValue, taskId)
    }
    const mappedTasks = props.tasks.map(t => {
        return (
            <li key={t.id} className={t.isDone ? classes.opacity : ''}>
                <IconButton
                    aria-label="delete"
                    onClick={()=>props.removeTask(props.todoListId, t.id)}
                >
                    <Delete />
                </IconButton>
                <UCheckbox
                    callback={(CheckboxValue)=>onChangeSelectedHandler(t.id, CheckboxValue)}
                    isDone={t.isDone}
                />
                <EditTaskTitle
                    title={t.title}
                    onChange={(newTaskTitleValue)=>onChangeTaskTitleHandler(newTaskTitleValue, t.id)}
                />
            </li>
        )})
    return (
        <div>
            <h3>
                <EditTaskTitle
                    title={props.title}
                    onChange={ChangeTodolistTitleHandler}
                />
                <Button variant="outlined"
                        startIcon={<Delete />}
                        onClick={deleteTodolistHandler}
                >
                </Button>
            </h3>
        <AddItemForm addItem={addTask} />
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <ButtonGroup size="small" aria-label="small button group">
                   <Button variant="outlined"
                           color={"primary"}
                           onClick={()=>props.changeFilter(props.todoListId, 'all')}>
                       all
                   </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>props.changeFilter(props.todoListId,'active')}>
                        active
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>props.changeFilter(props.todoListId,'completed')}>
                        completed
                    </Button>
                    <Button variant="outlined"
                            color={"primary"}
                            onClick={()=>showThreeTasksHandler(props.todoListId,'3 tasks')}>
                        3 tasks
                    </Button>
                </ButtonGroup>
               {/*<UniversButton*/}
               {/*        filter={props.filter} buttonName={'all'}*/}
               {/*        callBack={()=>props.changeFilter(props.todoListId, 'all')}/>*/}
               {/*<UniversButton filter={props.filter}*/}
               {/*        buttonName={'active'}*/}
               {/*        callBack={()=>props.changeFilter(props.todoListId,'active')}/>*/}
               {/*<UniversButton filter={props.filter}*/}
               {/*        buttonName={'completed'}*/}
               {/*        callBack={()=>props.changeFilter(props.todoListId,'completed')}/>*/}
               {/*<UniversButton filter={props.filter}*/}
               {/*        buttonName={'3 tasks'}*/}
               {/*        callBack={()=>showThreeTasksHandler(props.todoListId,'3 tasks')}/>*/}
            </div>
        <div>
            <UniversButton
                buttonName={'Delete All'}
                callBack={deleteAllTasksHandler}
            />
        </div>
    </div>)
}
