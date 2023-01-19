import {ToDoListType} from "../App";
import {v1} from "uuid";

export const TodoListReducer = (state: ToDoListType[], action: ActionsType):ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
                return state.filter(el=>el.id !== action.payload.todoListId);
        case 'ADD_TODOLIST_TITLE':
            const newTodolistId = v1()
            let newToDoList:ToDoListType = {id: newTodolistId, title: action.payload.title}
            return [...state, newToDoList];
        case 'CHANGE_TDL_TITLE':
            return state.map(list=>list.id == action.payload.todoListId ? {...list, title: action.payload.title} : list);
        default:
            throw new Error('Bad type')
    }
}

type ActionsType = removeTodoListACType | addTodoListTitleACType | ChangeTodolistTitleACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodoListTitleACType = ReturnType<typeof addTodoListAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>

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
        type: 'ADD_TODOLIST_TITLE',
        payload: {
            title: title
        }
    } as const
}
export const ChangeTodolistTitleAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE_TDL_TITLE',
        payload: {
            title: title,
            todoListId: todoListId
        }
    } as const
}