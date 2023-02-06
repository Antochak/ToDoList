import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {addTodoListTitleACType, removeTodoListACType} from "./TodoList-Reducer";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type removeAllTaskACType = ReturnType<typeof removeAllTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type changeTaskTitleACType = ReturnType<typeof editTaskTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>


export type TaskStateType = {
    [key: string]: DataType
}
export type DataType = {
    data: TasksType[]
    filter: FilterValuesType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type ActionsTypesTasks = removeTaskACType
    | addTaskACType
    | changeStatusTaskACType
    | changeTaskTitleACType
    | changeFilterACType
    | removeTodoListACType
    | removeAllTaskACType
    | addTodoListTitleACType

export const TaskReducer = (state: TaskStateType, action: ActionsTypesTasks): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    data:
                        state[action.todoListId].data.filter(t => t.id !== action.taskId)
                }
            }
        case 'REMOVE_ALL_TASKS':
            return {
                 ...state,
                    [action.todoListId]:{...state[action.todoListId],
                        data: state[action.todoListId].data.filter(el=>!el)
                    }
                }

        case 'ADD_TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    data:
                        [newTask, ...state[action.todoListId].data]
                }
            }
        case 'CHANGE_STATUS':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    data:
                        state[action.todoListId].data.map(t => t.id == action.taskId ? {...t, isDone: action.value} : t)
                }
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    data: [...state[action.todoListId].data.map(t => t.id == action.taskId
                        ? {...t, title: action.newTitle}
                        : t)
                    ]
                }
            }
        case 'CHANGE_FILTER':
            return {
                ...state, [action.todoListId]: {
                    ...state[action.todoListId],
                    filter: action.value
                }
            }
        case 'REMOVE_TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        case 'ADD_TODOLIST':
            return {[action.payload.todoListId]: {...state[action.payload.todoListId], data: []}, ...state}
        default:
            throw new Error('Bad type')
    }
}

export const removeTaskAC = (todoListId: string,taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        taskId,
        todoListId
    } as const // для типизации
}
export const removeAllTaskAC = (todoListId: string) => {
    return {
        type: 'REMOVE_ALL_TASKS',
        todoListId
    } as const // для типизации
}
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        todoListId,
        title
    } as const
}
export const changeStatusTaskAC = (todoListId: string, taskId: string, value: boolean) => {
    return {
        type: 'CHANGE_STATUS',
        todoListId,
        taskId,
        value
    } as const
}
export const editTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todoListId,
        taskId,
        newTitle
    } as const
}
export const changeFilterAC = (todoListId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE_FILTER',
        todoListId,
        value
    } as const
}

