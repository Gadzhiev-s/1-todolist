import React, {useCallback} from 'react';
import './App.css';
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changerFilterAC, removeTodolistAC, updateTodolistTitleACType} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitileAC, removeTaskAc} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskAssocType, TodolistsType} from "./App";


export type FilterValuesType = 'all' | 'active' | 'completed'


const AppWithRedux = React.memo(() =>{

    // console.log('App')

    let todolist = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)
    let dispatch = useDispatch()

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        const action = changeTaskTitileAC(todolistId, taskId, updateTitle)
        dispatch(action)
    },[dispatch])
    const updateTodolist =useCallback( (todolistId: string, updateTitle: string) => {
        const action = updateTodolistTitleACType(todolistId, updateTitle)
        dispatch(action)
    },[dispatch])
    const removeTodolist =useCallback( (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    },[dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        const action = removeTaskAc(todolistId, taskId)
        dispatch(action)
    },[dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    },[dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    },[dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    },[dispatch])
    const changerFilter =useCallback( (todolistId: string, value: FilterValuesType) => {
        const action = changerFilterAC(todolistId, value)
        dispatch(action)
    },[dispatch])
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '25px'}}>
                    {todolist.map((el) => {

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: '25px', borderRadius: '20px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        key={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id]}
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
)

export default AppWithRedux;
