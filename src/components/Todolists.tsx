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
}
export const Todolists = (props: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
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
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.task.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button
                                onClick={() => onClickRemoveHandlers(el.id)}
                            >x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
