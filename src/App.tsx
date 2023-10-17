import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";
import {v1} from "uuid";


export type FilteredPropsTaskType = 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState<TaskPropsType[]>([
        {id: v1(), title: 'HTML/CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredPropsTaskType>('all')
    let taskForTodolist = task
    if (filter === 'active') {
        taskForTodolist = task.filter(el => el.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = task.filter(el => !el.isDone)
    }
    const removeTask = (id: string) => {
        setTask(taskForTodolist.filter((el) => el.id !== id))
    }
    const filteredTasks = (value: FilteredPropsTaskType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        setTask([
            {id: v1(), title: title, isDone: false},
            ...task])
    }

    return (
        <div className="App">
            <Todolists
                title={'What to lear'}
                task={taskForTodolist}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
