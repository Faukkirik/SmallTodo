import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../reducers/todolist-reducer";
import {tasksReducer} from "../reducers/task-reducer";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
