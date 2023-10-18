import React from "react";
import {FilteredPropsTaskType} from "../App";
import {AddItemForm} from "./AddItemForm";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    task: TaskPropsType[]
    removeTask: (taskId: string, todolistId: string) => void
    filteredTasks: (value: FilteredPropsTaskType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilteredPropsTaskType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}
export const Todolists = (props: TodolistPropsType) => {
    const onAllClickHandler = () => props.filteredTasks('all', props.todolistId)
    const onActiveClickHandler = () => props.filteredTasks('active', props.todolistId)
    const onCompletedClickHandler = () => props.filteredTasks('completed', props.todolistId)
    const onClickRemoveHandlers = (taskId: string, todolistId: string) => {
        props.removeTask(taskId, todolistId)
    }
    const onClickRemoveTodolstHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickRemoveTodolstHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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
                                onChange={(e)=>{props.changeStatus(el.id, e.currentTarget.checked, props.todolistId)}}
                            /> <span>{el.title}</span>
                            <button
                                onClick={() => onClickRemoveHandlers(el.id,props.todolistId)}
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
