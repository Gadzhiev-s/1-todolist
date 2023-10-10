import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changerFilterAC,
    removeTodolistAC,
    todolistsReduser,
    updateTodolistTitleACType
} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitileAC, removeTaskAc, tasksReducer} from "./state/tasks-reduser";


export type FilterValuesType = 'all' | 'active' | 'completed'

// export type TodolistsType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
// }
// export type TaskAssocType = {
//     [key: string]: TaskType[]
// }

function AppWithReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReduser, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6/TS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "GraphQl", isDone: true},],
        [todolistId2]: [{id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "REDUX2", isDone: false},
            {id: v1(), title: "GraphQl2", isDone: true}
        ]
    })

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        const action = changeTaskTitileAC(todolistId, taskId, updateTitle)
        dispatchTasksReducer(action)
    }
    const updateTodolist = (todolistId: string, updateTitle: string) => {
        const action = updateTodolistTitleACType(todolistId, updateTitle)
        dispatchToTodolistsReducer(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    const removeTask = (todolistId: string, taskId: string) => {
        const action = removeTaskAc(todolistId, taskId)
        dispatchTasksReducer(action)
    }
    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolistsReducer(action)
        dispatchTasksReducer(action)
    },[]);
    const addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatchTasksReducer(action)
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchTasksReducer(action)
    }
    const changerFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changerFilterAC(todolistId, value)
        dispatchToTodolistsReducer(action)
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '25px'}}>
                    {todolists.map((el) => {
                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: '25px', borderRadius: '20px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        key={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changerFilter={changerFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducer;
