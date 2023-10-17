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
export const Todolists = ( props: TodolistPropsType ) => {
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
                            <button onClick={ ()=>{props.removeTask(el.id)} }>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={ ()=>{props.filteredTasks('all')} }>All</button>
                <button onClick={ ()=>{props.filteredTasks('active')}}>Active</button>
                <button onClick={ ()=>{props.filteredTasks('completed')}}>Completed</button>
            </div>
        </div>
    );
};
