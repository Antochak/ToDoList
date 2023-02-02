import {TaskStateType, ToDoListType} from "../App";
import {
    addTaskAC,
    changeFilterAC,
    changeStatusTaskAC,
    deleteTodolistWithTasksAC,
    removeTaskAC,
    TaskReducer
} from "./Task-Reducer";
import {v1} from "uuid";
import {removeTodoListAC} from "./TodoList-Reducer";
import {keys} from "@material-ui/core/styles/createBreakpoints";

test('correct task should be deleted from correct array', ()=> {
    const startState:TaskStateType = {
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
    const startState: TaskStateType = {
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
    const action = addTaskAC('toDoLists2','Water')
    const endState = TaskReducer(startState, action)


    expect(endState['toDoLists2'].data.length).toBe(6)
    expect(endState['toDoLists2'].data[0].title).toBe('Water')
    expect(endState['toDoLists2'].data[0].id).toBeDefined()
})
test('correct task status should be changed from correct array', ()=> {
    const startState: TaskStateType = {
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
    const action = changeStatusTaskAC('toDoLists2', '2', false)
    const endState = TaskReducer(startState, action)
    expect(endState['toDoLists2'].data['2'].isDone).toBe(false)
})
test('correct task filter should be changed from correct array', ()=> {
    const startState: TaskStateType = {
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
    const action = changeFilterAC('toDoLists2', 'completed')
    const endState = TaskReducer(startState, action)
    expect(endState['toDoLists2'].filter).toBe('completed')
})

test('Todolist and properties should be deleted', ()=> {
    const startState: TaskStateType = {
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
    const action = removeTodoListAC('toDoLists2')
    const endState = TaskReducer(startState, action)
    expect(keys.length).toBe(5)
    expect(endState['toDoLists2']).not.toBeDefined()
})
