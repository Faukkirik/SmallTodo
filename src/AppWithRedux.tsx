import React, {useCallback} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store/store";


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
    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
    const removeTodolist = useCallback ((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const filteredTasks = useCallback ((value: FilteredPropsTaskType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch])
    const addTodolist = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])
    const changeTodolistTitle = useCallback ((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    },[dispatch])
    //console.log('App render')
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
                                            removeTodolist={removeTodolist}
                                            filteredTasks={filteredTasks}
                                            filter={el.filter}
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
