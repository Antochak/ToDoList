import {v1} from "uuid";

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListTitleACType = ReturnType<typeof addTodoListAC>
export type editTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>

export type ActionsType = removeTodoListACType | addTodoListTitleACType | editTodolistTitleACType

export type ToDoListType = {
    id: string
    title: string
}
const initialState:ToDoListType[]=[]

export const TodoListReducer = (state=initialState, action: ActionsType):ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
                return state.filter(el=>el.id !== action.todoListId);
        case 'ADD_TODOLIST':
            return [{id: action.todoListId, title: action.title}, ...state ];
        case 'CHANGE_TDL_TITLE':
            return state.map(list=>list.id == action.todoListId ? {...list, title: action.title} : list);
        default:
          return state
    }
}

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