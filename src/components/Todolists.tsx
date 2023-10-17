import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredPropsTaskType} from "../App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    task: TaskPropsType[]
    removeTask: (id: string) => void
    filteredTasks: (value: FilteredPropsTaskType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilteredPropsTaskType
}
export const Todolists = (props: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (taskTitle.trim() === '') {
            setError("Title is required")
            setTaskTitle('')
        } else {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const onAllClickHandler = () => props.filteredTasks('all')
    const onActiveClickHandler = () => props.filteredTasks('active')
    const onCompletedClickHandler = () => props.filteredTasks('completed')
    const onClickRemoveHandlers = (id: string) => {
        props.removeTask(id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error && <div className={"error-message"}>{error}</div>}
            <ul>
                {props.task.map((el) => {
                    return (
                        <li
                            key={el.id}
                            className={el.isDone ? "is-done" : ""}
                        >
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(e)=>{props.changeStatus(el.id, e.currentTarget.checked)}}
                            /> <span>{el.title}</span>
                            <button
                                onClick={() => onClickRemoveHandlers(el.id)}
                            >x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : "" }
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={props.filter === "active" ? "active" : "" }
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === "completed" ? "active" : "" }
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
