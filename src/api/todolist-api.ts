import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        "API-KEY": "67b38818-76c8-46ef-8075-f416d15ccb5b"
    },
    withCredentials:true
})
export const todolistApi = {
    updateTodolist (id: string, title: string) {
        return instance.put<ResponseType>(`/todo-list/${id}`, {title: title})
    },
    deleteTodolist (todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    getTodolist () {
        return instance.get<TodolistType[]>(`/todo-lists`).then((res)=>res.data)
    },
    createTodolist (title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
    },
    getTasks (todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask (todolistId: string, taskId: string) {
        return instance.delete<DeleteTaskResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask (todolistId: string, title: string) {
        return instance.post<{title: string},AxiosResponse<ResponseType<{item: TaskType}>>>(`/todo-lists/${todolistId}/tasks/`, {title})
    },
    updateTask (todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{item: TaskType}>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<I = {}> = {    // по умолчанию I это {}
    resultCode: number
    messages: string[]
    data: I
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 4
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1 ,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type DeleteTaskResponse = {
    messages: string[]
    resultCode: number
    data: TaskType[]
}