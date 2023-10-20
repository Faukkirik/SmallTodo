import React from "react";
import {FilteredPropsTaskType} from "../AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/reducers/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store/store";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    filteredTasks: (value: FilteredPropsTaskType, todolistId: string) => void
    filter: FilteredPropsTaskType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    task?: any
    removeTask?: any
    addTask?: any
    changeStatus?: any
    changeTaskTitle?: any
}
export const Todolists = (props: TodolistPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskPropsType[]>(state => state.tasks[props.todolistId])
    const onAllClickHandler = () => props.filteredTasks('all', props.todolistId)
    const onActiveClickHandler = () => props.filteredTasks('active', props.todolistId)
    const onCompletedClickHandler = () => props.filteredTasks('completed', props.todolistId)
    const onClickRemoveHandlers = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const onClickRemoveTodolstHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }
    const changeTaskTitle = (newTitle: string, taskId: string) => {
        dispatch(changeTaskTitleAC(newTitle, props.todolistId, taskId))
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }
    let taskForTodolist = tasks
    if (props.filter === 'active') {
        taskForTodolist = taskForTodolist.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = taskForTodolist.filter(el => el.isDone)
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
                {taskForTodolist.map((el) => {
                    return (
                        <li
                            key={el.id}
                        >
                            <Checkbox
                                checked={el.isDone}
                                color={'primary'}
                                onChange={(e)=>{dispatch(changeTaskStatusAC(el.id, e.currentTarget.checked, props.todolistId))}}
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
