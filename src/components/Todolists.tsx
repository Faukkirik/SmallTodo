import React from "react";
import {FilteredPropsTaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTaskTitle: (newTitle: string, todolistId: string, taskId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
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
    const changeTaskTitle = (newTitle: string, taskId: string) => {
        props.changeTaskTitle(newTitle, props.todolistId, taskId)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }
    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodolistTitle}
                />
                <IconButton onClick={onClickRemoveTodolstHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {props.task.map((el) => {
                    return (
                        <li
                            key={el.id}
                            className={el.isDone ? "is-done" : ""}
                        >
                            <Checkbox
                                checked={el.isDone}
                                color={'primary'}
                                onChange={(e)=>{props.changeStatus(el.id, e.currentTarget.checked, props.todolistId)}}
                            />
                            <EditableSpan title={el.title} changeTitle={(newTitle)=>changeTaskTitle(newTitle, el.id)} />
                            <IconButton
                                onClick={() => onClickRemoveHandlers(el.id,props.todolistId)}
                            >
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text" }
                    onClick={onAllClickHandler}
                    color={'inherit'}
                >All</Button>
                <Button
                    variant={props.filter === "active" ? "outlined" : "text" }
                    onClick={onActiveClickHandler}
                    color={'primary'}
                >Active</Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text" }
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                >Completed</Button>
            </div>
        </div>
    );
};
