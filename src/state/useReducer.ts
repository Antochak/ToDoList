

type UseStateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const useReducer = (state: UseStateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            return {...state, age: state.age + 1};
        case 'INCREMENT_CHILDREN_COUNT':
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE_NAME':
            return {...state, name: action.newName};
        default:
            throw new Error('Bad type')
    }
}