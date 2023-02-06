import {ToDoListType} from "../App";
import {v1} from "uuid";

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListTitleACType = ReturnType<typeof addTodoListAC>
export type editTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>

export type ActionsType = removeTodoListACType | addTodoListTitleACType | editTodolistTitleACType

export const TodoListReducer = (state: ToDoListType[], action: ActionsType):ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
                return state.filter(el=>el.id !== action.payload.todoListId);
        case 'ADD_TODOLIST':
            let newToDoList:ToDoListType = {id: action.payload.todoListId, title: action.payload.title}
            return [...state, newToDoList];
        case 'CHANGE_TDL_TITLE':
            return state.map(list=>list.id == action.payload.todoListId ? {...list, title: action.payload.title} : list);
        default:
            throw new Error('Bad type')
    }
}

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
           todoListId: todoListId
       }
    } as const // для типизации
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title: title,
            todoListId: v1()
        }
    } as const
}
export const editTodolistTitleAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE_TDL_TITLE',
        payload: {
            title: title,
            todoListId: todoListId
        }
    } as const
}