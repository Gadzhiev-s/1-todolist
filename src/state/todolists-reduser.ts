import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type TodolistsReduserType =
    RemoveTodolistACType
    | UpdateTodolistTitleACType
    | changerTodolistFilterACType|AddTodolistACType
let initialState:TodolistsType[] = []
export const todolistsReduser = (state= initialState, action: TodolistsReduserType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {

            return [ {id: action.payload.todolistId, title: action.payload.title, filter: 'all'},...state]
        }
        case "TODOLIST-UPDATE-TITLE":
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        default :
            return state

    }
}
type changerTodolistFilterACType = ReturnType<typeof changerFilterAC>
export const changerFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}

export type  RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

// export type AddTodolistACType = {
//     type: 'ADD-TODOLIST',
//     payload: {
//         title: string,
//         todolistId: string
//     }
// }
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title,todolistId:v1()}
    } as const
}
type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleACType>
export const updateTodolistTitleACType = (id: string, title: string) => {
    return {
        type: 'TODOLIST-UPDATE-TITLE',
        payload: {id, title}
    } as const
}
