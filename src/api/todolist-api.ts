import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "b0225b42-e713-48af-beb5-98fbfd0cf5ae"
    }
})
export const todolistApi = {
    updateTodolist (id: string, title: string) {
        return instance.put<ResponseType>(`/todo-list/${id}`, {title: title})
    },
    deleteTodolist (todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    getTodolist () {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist (title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
    },
}
type TodolistType = {
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
