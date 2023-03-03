import {v1} from "uuid";
import {addTodoListTitleACType, removeTodoListACType, setTodosType} from "./TodoList-Reducer";
import {FilterValuesType} from "../Todolist";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type TaskStateType = {
    [key: string]: DataType
}
export type DataType = {
    tasksList: TaskType[]
    filter: FilterValuesType
}

export type TasksActionsTypes = removeTaskACType
    | addTaskACType
    | changeStatusTaskACType
    | changeTaskTitleACType
    | changeFilterACType
    | removeTodoListACType
    | removeAllTaskACType
    | addTodoListTitleACType
    | setTodosType
    | setTasksType

const initialState: TaskStateType = {}
export const TaskReducer = (state = initialState, action: TasksActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    tasksList:
                        state[action.todolistId].tasksList.filter(t => t.id !== action.taskId)
                }
            }
        }
        case 'REMOVE_ALL_TASKS':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    tasksList:
                        state[action.todolistId].tasksList.filter(el => !el)
                }
            }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId], tasksList: [action.task, ...state[action.todolistId].tasksList]
                }
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    tasksList:
                        state[action.todolistId].tasksList.map(t => t.id == action.taskId ? {
                            ...t,
                            status: action.status
                        } : t)
                }
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    tasksList:
                        state[action.todolistId].tasksList.map(t => t.id == action.taskId
                            ? {...t, title: action.newTitle}
                            : t)
                }
            }
        }
        case 'CHANGE_FILTER': {
            return {
                ...state, [action.todolistId]: {
                    ...state[action.todolistId],
                    filter: action.value
                }
            }
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case 'ADD_TODOLIST': {
            return {[action.todoListId]: {...state[action.todoListId], tasksList: [], filter: 'all'}, ...state}
        }
        case 'SET_TODOS': {
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = {
                    tasksList: [],
                    filter: 'all'
                }
            })
            return copyState
        }
        case 'SET_TASKS': {
            return {
                ...state,
                [action.todolistId]:
                    {...state[action.todolistId], tasksList: action.tasks, filter: 'all'}
            }
        }
        default:
            return state
    }
}
type removeTaskACType = ReturnType<typeof removeTaskAC>
type removeAllTaskACType = ReturnType<typeof removeAllTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type changeTaskTitleACType = ReturnType<typeof editTaskTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type setTasksType = ReturnType<typeof setTasks>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        taskId,
        todolistId
    } as const // для типизации
}
export const removeAllTaskAC = (todolistId: string) => {
    return {
        type: 'REMOVE_ALL_TASKS',
        todolistId
    } as const // для типизации
}
export const addTaskAC = (task: TaskType, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        todolistId,
        task
    } as const
}
export const changeStatusTaskAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_STATUS',
        todolistId,
        taskId,
        status
    } as const
}
export const editTaskTitleAC = (todolistId: string, newTitle: string, taskId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        newTitle
    } as const
}
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE_FILTER',
        todolistId,
        value
    } as const
}
export const setTasks = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET_TASKS', tasks, todolistId} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasks(res.data.items, todolistId))
        })
}
export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].tasksList.find(t => t.id === taskId)
        if(task) {
            let model: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status
            }
            todolistApi.updateTask(todolistId, taskId, model)
                .then((res) => dispatch(changeStatusTaskAC(todolistId, taskId, status)))
        }
    }
}
