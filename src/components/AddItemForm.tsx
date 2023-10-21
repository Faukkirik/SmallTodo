import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo((props: AddItemFormType) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        if (error !== null){
            setError(null)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (taskTitle.trim() === '') {
            setError("Title is required")
            setTaskTitle('')
        } else {
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        }
    }
    //console.log('Add item form render')
    return (
        <div>
            <TextField
                variant={'outlined'}
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                label={'Title'}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={addTaskHandler}
                color={'primary'}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})
