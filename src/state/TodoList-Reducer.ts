import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type TodolistActionsType = removeTodoListACType | addTodoListTitleACType | editTodolistTitleACType | setTodosType

const initialState: TodolistType[] = []
export const TodoListReducer = (state = initialState, action: any): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.todoListId);
        case 'ADD_TODOLIST':
            return [...state, {id: action.todoListId, title: action.title, addedDate: '', order: 0}];
        case 'CHANGE_TDL_TITLE':
            const todolist = state.find(tl=>tl.id == action.todoListId)
            if(todolist) todolist.title = action.title
            return [...state]
            // return state.map(list => list.id == action.todoListId ? {...list, title: action.title} : list);
        case "SET_TODOS":
            return [...state, ...action.todos]
        default:
            return state
    }
}
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListTitleACType = ReturnType<typeof addTodoListAC>
export type editTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>
export type setTodosType = ReturnType<typeof setTodos>

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todoListId: todoListId
    } as const // для типизации
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        title: title,
        todoListId: v1()
    } as const
}
export const editTodolistTitleAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE_TDL_TITLE',
        title: title,
        todoListId: todoListId
    } as const
}

export const setTodos = (todos: TodolistType[]) => {
    return {type: 'SET_TODOS', todos} as const
}
export const getTodoTC = () => (dispatch: Dispatch) => {
        todolistApi.getTodolist()
            .then((res)=> {
                dispatch(setTodos(res))
            })
}

