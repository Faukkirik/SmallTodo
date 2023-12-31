import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


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
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    const [task, setTask] = useState<TasksStateType>({
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
        setTask({...task, [todolistId]: task[todolistId].filter(el => el.id !== taskId)})
    };
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete task[todolistId]
        setTask({...task})
    }
    const filteredTasks = (value: FilteredPropsTaskType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : {...el}))
    }
    const addTask = (title: string, todolistId: string) => {
        setTask({...task, [todolistId]: [{id: v1(), title: title, isDone: false}, ...task[todolistId]]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTask({...task, [todolistId]: task[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    const addTodolist = (title: string) => {
        const todolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTask({...task, [todolist.id]: []})
    }
    const changeTaskTitle = (newTitle: string, todolistId: string, taskId: string) => {
        setTask({...task, [todolistId]: task[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)})
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
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
