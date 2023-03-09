import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AuthApi, ResultCode} from "../api/todolists-api";
import {setIsInitializedAC, setIsLoggedInAC} from "../features/login/auth-reducer";
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle',
    error: null ,
    isInitialized: false
}
export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null }>){
            // @ts-ignore
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const {setAppStatusAC, setAppErrorAC,setAppInitializedAC} = slice.actions
export const appReducer = slice.reducer

export const initializedTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await AuthApi.me()
        if (res.resultCode === ResultCode.success) {
            dispatch(setIsLoggedInAC({value: true}))
        }
        dispatch(setIsInitializedAC({value: true}))
    } catch (e) {
        console.warn(e)
    }
}

