import React, {ChangeEvent} from 'react';

export type CheckboxPropsType = {
    callback: ( CheckboxValue: boolean)=>void
    isDone: boolean
}
export const UCheckbox = (props: CheckboxPropsType) => {
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (
        <input
            type={'checkbox'}
            checked={props.isDone}
            onChange={onChangeCheckboxHandler}
        />
    );
};
