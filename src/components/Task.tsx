import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskPropsType} from "./Todolists";

type TaskProps = {
    task: TaskPropsType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}
export const Task = memo ((props: TaskProps) => {
    const onClickRemoveHandlers = useCallback ( () => {
        props.removeTask(props.task.id)
    },[props.removeTask, props.task.id])
    const changeTaskStatusHandler = useCallback ( (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    },[props.changeTaskStatus, props.task.id])
    const changeTaskTitleHandler = useCallback ((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    },[props.changeTaskTitle, props.task.id])
    //console.log('Task render')
    return (
        <li
            key={props.task.id}
        >
            <Checkbox
                checked={props.task.isDone}
                color={'primary'}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan
                title={props.task.title}
                changeTitle={changeTaskTitleHandler} />
            <IconButton
                onClick={onClickRemoveHandlers}
            >
                <Delete/>
            </IconButton>
        </li>
    )
})
