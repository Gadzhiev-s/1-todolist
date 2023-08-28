import {addTaskAC, changeTaskStatusAC, changeTaskTitileAC, removeTaskAc, tasksReducer} from "./tasks-reduser";
import {TaskAssocType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reduser";

test('correct task should be deleted from correct array', () => {

    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action = removeTaskAc('todolistId2', '2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !=='2')).toBeTruthy()
})
test('correct task should be added from correct array', () => {

    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action = addTaskAC('todolistId2', 'Milk')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('Milk')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be change', () => {

    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action = changeTaskStatusAC('todolistId2', '3', true)
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][2].isDone).toBeTruthy()
    expect(endState['todolistId1'][2].isDone).toBeFalsy()

})
test('title of specified task should be change', () => {

    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action = changeTaskTitileAC('todolistId2', '3', 'Milk')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][2].title).toBe('Milk')
    expect(endState['todolistId1'][2].title).toBe("REDUX")
})
test('new property with new array should be added when new todolist is added', () => {
    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action = addTodolistAC('title no matter')
    const endState = tasksReducer(startState, action)
    const keys =Object.keys(endState);
    const newKeys =keys.find(k=>k!=='todolistId1' &&k!=='todolistId2')
    if (!newKeys){
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKeys]).toEqual([])

})
test('property with todolistId should be deleted', () => {
    const startState: TaskAssocType = {
        'todolistId1': [
            {id: "1", title: "JS/ES6/TS", isDone: true},
            {id: '2', title: "REACT", isDone: true},
            {id: '3', title: "REDUX", isDone: false},],
        'todolistId2': [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "REDUX2", isDone: false},
        ]
    }
    const action =removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys =Object.keys(endState);
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()

})