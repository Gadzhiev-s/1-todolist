import {TaskAssocType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reduser";


type ActionsType =
    RemoveTaskAcType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
type RemoveTaskAcType = ReturnType<typeof removeTaskAc>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitileAC>
export const tasksReducer = (state: TaskAssocType, action: ActionsType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                        ...t, title: action.payload.title
                    } : t
                )
            }
        case 'ADD-TODOLIST':

            return {...state, [action.payload.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        default :
            throw new Error('i don t understand this type')

    }

}

export const removeTaskAc = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const
}
export const changeTaskTitileAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE-STATUS', payload: {todolistId, taskId, title}} as const
}