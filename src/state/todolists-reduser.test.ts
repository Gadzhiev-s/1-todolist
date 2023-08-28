import {
    addTodolistAC,
    changerFilterAC,
    removeTodolistAC,
    todolistsReduser,
    updateTodolistTitleACType
} from "./todolists-reduser";
import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReduser(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v1()
    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReduser(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct todolist should updateTitle', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v1()
    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'TODOLIST-UPDATE-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }
    const endState = todolistsReduser(startState, updateTodolistTitleACType(action.id, action.title))
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be change', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'
    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }
    const endState = todolistsReduser(startState, changerFilterAC(action.id, action.filter))
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter)
})