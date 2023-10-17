import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";
import {v1} from "uuid";


export type FilteredPropsTaskType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilteredPropsTaskType
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])
    const [task, setTask] = useState({
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
        setTask(prevTask => ({
            ...prevTask,
            [todolistId]: prevTask[todolistId].filter(el => el.id !== taskId)
        }));
    };
    const filteredTasks = (value: FilteredPropsTaskType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        setTask([
            {id: v1(), title: title, isDone: false},
            ...task])
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        setTask(task.map(el => el.id === taskId ? {...el, isDone} : el));
    }

    return (
        <div className="App">
            { todolists.map(el => {
                let taskForTodolist = task[el.id]
                if (el.filter === 'active') {
                    taskForTodolist = task[el.id].filter(el => el.isDone)
                }
                if (el.filter === 'completed') {
                    taskForTodolist = task[el.id].filter(el => !el.isDone)
                }
                return (
                    <Todolists
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        task={taskForTodolist}
                        removeTask={removeTask}
                        filteredTasks={filteredTasks}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })
            }
        </div>
    );
}

export default App;
