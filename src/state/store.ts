import {TodoListReducer} from "./TodoList-Reducer";
import {TaskReducer} from "./Task-Reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {useDispatch} from "react-redux";
import thunkMiddleWare from "redux-thunk";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodoListReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare))
export type AppRootStateType = ReturnType<typeof rootReducer>

// export type AllActions = TasksActionsTypes & TodolistActionsType
// export const AppThunkDispatchType =  ThunkDispatch<AppRootStateType, any, AllActions>;
// export const useAppDispatch = () => useDispatch<typeof AppThunkDispatchType>()
// export const useAppSelector = () => TypedUseSelectorHook<AppRootStateType> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store;