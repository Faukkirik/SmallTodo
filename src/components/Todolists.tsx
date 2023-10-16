import React from "react";
import {FilteredPropsTaskType} from "../App";

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    task: TaskPropsType[]
    removeTask: (id: number) => void
    filteredTasks: (value: FilteredPropsTaskType) => void
}
export const Todolists = ( props: TodolistPropsType ) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((el) => {
                    return (
                        <li>
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
