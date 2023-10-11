import React from 'react';
import './App.css';
import {Todolists} from "./components/Todolists";

function App() {
    const task1 = [
        {id: 1, title: 'HTML/CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const task2 = [
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Beer', isDone: true},
        {id: 3, title: 'Cola', isDone: false}
    ]
    return (
        <div className="App">
            <Todolists title={'What to lear'} task={task1}/>
            <Todolists title={'What to buy'} task={task2}/>
        </div>
    );
}
export default App;
