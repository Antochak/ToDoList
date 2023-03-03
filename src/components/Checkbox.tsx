import React, {ChangeEvent} from 'react';
import {TaskStatuses} from "../api/todolist-api";

export type CheckboxPropsType = {
    callback: ( CheckboxValue: boolean)=>void
    checked: boolean
}
export const UCheckbox = (props: CheckboxPropsType) => {
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (
        <input
            type={'checkbox'}
            checked={props.checked}
            onChange={onChangeCheckboxHandler}
        />
    );
};
