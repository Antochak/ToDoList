import axios from "axios";

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
