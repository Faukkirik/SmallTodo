import {FilteredPropsTaskType, TodolistType} from "../../App";
import {v1} from "uuid";

export type ActionType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const todolist: TodolistType = {id: v1(), title: action.title, filter: "all"}
            return [todolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : {...el})
        }
        default: {
            return {...state}
        }
    }
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title} as const
}
export const changeTodolistTitleAC = (newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, id: todolistId} as const
}
export const changeTodolistFilterAC = (value: FilteredPropsTaskType, todolistId: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: value, id: todolistId} as const
}
