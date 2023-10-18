import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
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
    return (
        <div>
            <input
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}
