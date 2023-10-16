import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolists} from "./components/Todolists";

export type FilteredPropsTaskType = 'all' | 'active' | 'completed'
function App() {
    const [task, setTask]=useState<TaskPropsType[]>([
        {id: 1, title: 'HTML/CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredPropsTaskType>('all')
    let taskForTodolist = task
    if (filter === 'active'){
        taskForTodolist = task.filter(el => el.isDone)
    }
    if (filter === 'completed'){
        taskForTodolist = task.filter(el => !el.isDone)
    }
    const removeTask = (id: number) => {
        setTask(taskForTodolist.filter((el)=> el.id !== id))
    }
    const filteredTasks = (value: FilteredPropsTaskType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolists
                title={'What to lear'}
                task={taskForTodolist}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
            />
        </div>
    );
}
export default App;
