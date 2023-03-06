import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {AuthApi, ResultCode, todolistsAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type AuthActionsType = setIsLoggedInACType | SetAppStatusActionType | SetAppErrorActionType | setIsInitializedACType
const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type initialStateType = typeof initialState

export const authReducer = (state=initialState, action: AuthActionsType):initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
};
const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}
const setIsInitializedAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-INITIALIZED',
        value
    } as const
}
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>

export const logInTC = (values: FormDataType) => {
    return async (dispatch: Dispatch<AuthActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const result = await AuthApi.logIn(values)
            if(result.resultCode == ResultCode.success){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
        }
    }
}
export const logOutTC = () => {
    return async (dispatch: Dispatch<AuthActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const result = await AuthApi.logOut()
            if(result.resultCode == ResultCode.success){
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
        }
    }
}
export const meTC = () => {
    return async (dispatch: Dispatch<AuthActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const result = await AuthApi.me()
            if(result.resultCode == ResultCode.success){
                dispatch(setIsInitializedAC(true))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)

        }

    }
}