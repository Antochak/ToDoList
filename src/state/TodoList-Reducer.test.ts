import {v1} from "uuid";
import {ToDoListType} from "../App";
import {addTodoListAC, ChangeTodolistTitleAC, removeTodoListAC, TodoListReducer} from "./TodoList-Reducer";


test('remove todolist', ()=>{
    let toDoLists1 = v1()
    let toDoLists2 = v1()

    const startState:ToDoListType[] = [
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ]
    const endState = TodoListReducer(startState, removeTodoListAC(toDoLists1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoLists2)
})
test('add todolist ', ()=>{
    let toDoLists1 = v1()
    let toDoLists2 = v1()

    let newTodolistTitle = 'New Todolist'
    const startState:ToDoListType[] = [
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ]
    const endState = TodoListReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})
test('edit todolist title', ()=>{
    let toDoLists1 = v1()
    let toDoLists2 = v1()

    let newTodolistTitle = 'changed Todolist title'

    const startState:ToDoListType[] = [
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ]
    const endState = TodoListReducer(startState, ChangeTodolistTitleAC(toDoLists2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('changed Todolist title')
})