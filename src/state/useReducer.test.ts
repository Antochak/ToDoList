import {useReducer} from "./useReducer";


test('increate only age', ()=> {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Antocha'
    }
    const endState = useReducer(startState, {type: 'INCREMENT_AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})
test('increate only childrenCount', ()=> {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Antocha'
    }
    const endState = useReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})
test('change name', ()=> {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Antocha'
    }
    const newName = 'Viktor'
    const endState = useReducer(startState, {type: 'CHANGE_NAME', newName: newName})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Viktor')
})