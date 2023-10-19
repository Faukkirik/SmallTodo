import React, {useReducer} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/reducers/task-reducer";


export type FilteredPropsTaskType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredPropsTaskType
}
export type TasksStateType = {
    [key: string]: TaskPropsType[]
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, dispatchTodolist] = useReducer(todolistReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    const [task, dispatchTask] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Beer', isDone: true}
        ]
    })
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchTask(removeTaskAC(taskId, todolistId))
    };
    const removeTodolist = (todolistId: string) => {
        dispatchTodolist(removeTodolistAC(todolistId))
        dispatchTask(removeTodolistAC(todolistId))
    }
    const filteredTasks = (value: FilteredPropsTaskType, todolistId: string) => {
        dispatchTodolist(changeTodolistFilterAC(value, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchTask(addTaskAC(title, todolistId))
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchTask(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTask(action)
        dispatchTodolist(action)
    }
    const changeTaskTitle = (newTitle: string, todolistId: string, taskId: string) => {
        dispatchTask(changeTaskTitleAC(newTitle, todolistId, taskId))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatchTodolist(changeTodolistTitleAC(newTitle, todolistId))
    }
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(el => {
                            let taskForTodolist = task[el.id]
                            if (el.filter === 'active') {
                                taskForTodolist = task[el.id].filter(el => el.isDone)
                            }
                            if (el.filter === 'completed') {
                                taskForTodolist = task[el.id].filter(el => !el.isDone)
                            }
                            return (
                                <Grid
                                    item
                                    key={el.id}
                                >
                                    <Paper style={{padding: '10px'}}>
                                        <Todolists
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            task={taskForTodolist}
                                            removeTask={removeTask}
                                            removeTodolist={removeTodolist}
                                            filteredTasks={filteredTasks}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={el.filter}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
