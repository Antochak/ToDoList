import {TaskStateType} from "../App";
import {
    addTaskAC,
    changeFilterAC,
    changeStatusTaskAC,
    removeTaskAC,
    TaskReducer
} from "./Task-Reducer";
import {addTodoListAC, removeTodoListAC} from "./TodoList-Reducer";
import {keys} from "@material-ui/core/styles/createBreakpoints";

let startState:TaskStateType

beforeEach(()=> {
    startState = {
        'toDoLists1': {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Rest API", isDone: false},
                {id: '5', title: "GraphQL", isDone: false},
            ],
            filter: 'all'
        },
        'toDoLists2': {
            data: [
                {id: '1', title: "Whiskey", isDone: true},
                {id: '2', title: "Cola", isDone: true},
                {id: '3', title: "Sprite", isDone: false},
                {id: '4', title: "Fanta", isDone: false},
                {id: '5', title: "Beer", isDone: false},
            ],
            filter: 'all'
        }
    };
})

test('correct task should be deleted from correct array', ()=> {

    const action = removeTaskAC('2','toDoLists2')
    const endState = TaskReducer(startState,action)
    expect(endState).toEqual({
        'toDoLists1': {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Rest API", isDone: false},
                {id: '5', title: "GraphQL", isDone: false},
            ],
            filter: 'all'
        },
        'toDoLists2': {
            data: [
                {id: '1', title: "Whiskey", isDone: true},
                {id: '3', title: "Sprite", isDone: false},
                {id: '4', title: "Fanta", isDone: false},
                {id: '5', title: "Beer", isDone: false},
            ],
            filter: 'all'
        }
    })
})
test('correct task should be added from correct array', ()=> {
    const action = addTaskAC('toDoLists2','Water')
    const endState = TaskReducer(startState, action)

    expect(endState['toDoLists2'].data.length).toBe(6)
    expect(endState['toDoLists2'].data[0].title).toBe('Water')
    expect(endState['toDoLists2'].data[0].id).toBeDefined()
})
test('correct task status should be changed from correct array', ()=> {
    const action = changeStatusTaskAC('toDoLists2', '2', false)
    const endState = TaskReducer(startState, action)

    expect(endState['toDoLists2'].data['2'].isDone).toBe(false)
})
test('correct task filter should be changed from correct array', ()=> {
    const action = changeFilterAC('toDoLists2', 'completed')
    const endState = TaskReducer(startState, action)

    expect(endState['toDoLists2'].filter).toBe('completed')
})

test('Todolist and properties should be added', ()=> {
    const action = addTodoListAC('new todolist')
    const endState = TaskReducer(startState, action)

    const keys = Object.keys(endState)  // в keys лежит массив из 3 эл. ( строки: todolist1, todolist2  и new todolist)
    const newKey = keys.find(k=>k != 'toDoLists1' && k != 'toDoLists1') // выбираем именно новый new todolist
    if (!newKey) throw Error('New key should be added')

    expect(keys.length).toBe(3)
    expect(endState[newKey].data).toEqual([]) // значение по новому ключу должно соответствовать пустому массиву
})
test('Todolist and properties should be deleted', ()=> {
    const action = removeTodoListAC('toDoLists2')
    const endState = TaskReducer(startState, action)

    expect(keys.length).toBe(5)
    expect(endState['toDoLists2']).not.toBeDefined()
})
