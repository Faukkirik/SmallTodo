import React, {memo, useCallback} from "react";
import {FilteredPropsTaskType} from "../AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/reducers/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store/store";
import {Task} from "./Task";

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
export const Todolists = memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskPropsType[]>(state => state.tasks[props.todolistId])
    const onAllClickHandler = () => props.filteredTasks('all', props.todolistId)
    const onActiveClickHandler = () => props.filteredTasks('active', props.todolistId)
    const onCompletedClickHandler = () => props.filteredTasks('completed', props.todolistId)

    const onClickRemoveTodolstHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }, [props.changeTodolistTitle, props.todolistId])
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }, [props.todolistId, dispatch])
    const removeTaskHandler = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, props.todolistId))
    }, [props.todolistId, dispatch])
    const changeTaskStatusHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, props.todolistId))
    }, [props.todolistId, dispatch])
    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(newTitle, props.todolistId, taskId))
    }, [props.todolistId, dispatch])
    let taskForTodolist = tasks
    if (props.filter === 'active') {
        taskForTodolist = taskForTodolist.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = taskForTodolist.filter(el => el.isDone)
    }
    //console.log('Todolist render')
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
                {taskForTodolist.map((el) => <Task
                    key={el.id}
                    task={el}
                    removeTask={removeTaskHandler}
                    changeTaskStatus={changeTaskStatusHandler}
                    changeTaskTitle={changeTaskTitleHandler}/>
                )}
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={'inherit'}
                >All</Button>
                <Button
                    variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                >Active</Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                >Completed</Button>
            </div>
        </div>
    );
})
