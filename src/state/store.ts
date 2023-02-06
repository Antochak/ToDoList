// import {TodoListReducer} from "./TodoList-Reducer";
// import {TaskReducer} from "./Task-Reducer";
// import {combineReducers,legacy_createStore} from 'redux'
//
// // объединяя наши редьюсеры в combineRedusers мы задаем структуру нашего единственного объекта состояния
// const rootReducer = combineReducers({
//     tasks: TaskReducer,
//     todolists: TodoListReducer
// })
//
// export const store = legacy_createStore(rootReducer)
// export type AppRootStateType = ReturnType<typeof rootReducer>
// //@ts-ignore
// window.store = store;