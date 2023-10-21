import React, {ChangeEvent, memo, useCallback, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = memo ((props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = useCallback (() => {
        setEditMode(false)
        props.changeTitle(title)
    }, [props.changeTitle])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    //console.log('Editable span render')
    return editMode
        ? <TextField
            variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus={true}
        />
        : <span
        onDoubleClick={activateEditMode}
        >{title}</span>
})
