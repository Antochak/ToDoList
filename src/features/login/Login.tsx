import React from 'react'
import {Grid} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import {logInTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useFormik} from "formik";

export type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            console.log(values)


            const errors: FormDataType = {};
            // errors: Yup.object({
            //     email: Yup.string().max(25, 'Invalid email address').required('Required'),
            //     password: Yup.string().min(4, 'Must be 25 characters or more').required('Required')
            // })
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password must be longer';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(logInTC(values))
            formik.resetForm()
        }
    })
    if (isLogin) {
        return <Navigate to="/"/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>
                        To log in get registered
                        <a href={'https://social-network.samuraijs.com'} target={'_blank'}>here</a>
                    </p>

                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label={'email'}
                            margin={'normal'}
                            {...formik.getFieldProps('email')}/>
                            {formik.errors.email && formik.touched.email
                                && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type='password'
                            label={'password'}
                            margin={'normal'}
                            {...formik.getFieldProps('password')}/>
                            {formik.errors.password && formik.touched.password
                                 && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}