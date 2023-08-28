import {TaskAssocType, TodolistsType} from "../App";
import {tasksReducer} from "./tasks-reduser";
import {addTodolistAC, todolistsReduser} from "./todolists-reduser";

test('ids should be equals', () => {
    const startTasksState: TaskAssocType = {}
    const startTodolistState: TodolistsType[] = []
    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTasksState,action)
    const endTodolistsState = todolistsReduser(startTodolistState,action)

    const keys =Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistsState[0].id
    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)

})