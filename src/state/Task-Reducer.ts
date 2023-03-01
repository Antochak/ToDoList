import {v1} from "uuid";
import {addTodoListTitleACType, removeTodoListACType, setTodosType} from "./TodoList-Reducer";
import {FilterValuesType} from "../Todolist";

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
    tasksList: TasksType[]
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
    | setTodosType

const initialState: TaskStateType = {}
export const TaskReducer = (state = initialState, action: ActionsTypesTasks): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    tasksList:
                        state[action.todoListId].tasksList.filter(t => t.id !== action.taskId)
                }
            }
        case 'REMOVE_ALL_TASKS':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    tasksList:
                        state[action.todoListId].tasksList.filter(el => !el)
                }
            }

        case 'ADD_TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    tasksList:
                        [newTask, ...state[action.todoListId].tasksList]
                }
            }
        case 'CHANGE_STATUS':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    tasksList:
                        state[action.todoListId].tasksList.map(t => t.id == action.taskId ? {...t, isDone: action.value} : t)
                }
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todoListId]: {
                    ...state[action.todoListId],
                    tasksList:
                        state[action.todoListId].tasksList.map(t => t.id == action.taskId
                            ? {...t, title: action.newTitle}
                            : t)

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
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        case 'ADD_TODOLIST':
            return {[action.todoListId]: {...state[action.todoListId], tasksList: [], filter: 'all'}, ...state}
        case 'SET_TODOS':
            const copyState = {...state}
            action.todos.forEach(tl=>{
                copyState[tl.id] = {
                    tasksList: [],
                    filter:'all'
                }
            })
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
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
export const editTaskTitleAC = (todoListId: string, newTitle: string, taskId: string) => {
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

