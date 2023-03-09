import { setAppStatusAC} from "../../app/app-reducer";
import {AuthApi, ResultCode} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        },
        setIsInitializedAC(state, action: PayloadAction<{value: boolean}>){
            state.isInitialized = action.payload.value
        }
    }
})
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const setIsInitializedAC = slice.actions.setIsInitializedAC
export const authReducer = slice.reducer

export const logInTC = (values: FormDataType) => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const result = await AuthApi.logIn(values)
            if(result.resultCode == ResultCode.success){
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
        }
    }
}
export const logOutTC = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const result = await AuthApi.logOut()
            if(result.resultCode == ResultCode.success){
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
        }
    }
}
export const meTC = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const result = await AuthApi.me()
            if(result.resultCode == ResultCode.success){
                dispatch(setIsInitializedAC({value: true}))
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(result, dispatch)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
        }
    }
}