import {TodoListReducer} from "./TodoList-Reducer";
import {TaskReducer} from "./Task-Reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {useDispatch} from "react-redux";
import thunk from "redux-thunk";

// объединяя наши редьюсеры в combineRedusers мы задаем структуру нашего единственного объекта состояния
const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodoListReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppDispatch = typeof store.dispatch
//@ts-ignore
window.store = store;