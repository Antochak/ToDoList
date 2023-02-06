import {v1} from "uuid";
import {ToDoListType} from "../App";
import {addTodoListAC, editTodolistTitleAC, removeTodoListAC, TodoListReducer} from "./TodoList-Reducer";

let toDoLists1:string;
let toDoLists2:string;
let startState:ToDoListType[]

beforeEach(()=> {
     toDoLists1 = v1()
     toDoLists2 = v1()

     startState = [
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ]
})

test('remove todolist', ()=>{

    const endState = TodoListReducer(startState, removeTodoListAC(toDoLists1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoLists2)
})
test('add todolist ', ()=>{

    let newTodolistTitle = 'New Todolist'

    const endState = TodoListReducer(startState, addTodoListAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})
test('edit todolist title', ()=>{

    let newTodolistTitle = 'changed Todolist title'

    const endState = TodoListReducer(startState, editTodolistTitleAC(toDoLists2, newTodolistTitle))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('changed Todolist title')
})