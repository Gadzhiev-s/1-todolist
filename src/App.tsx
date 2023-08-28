import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskAssocType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskAssocType>({
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

    const updateTask = (todolistId: string, taskId: string,updateTitle: string) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,title:updateTitle}:el)})
    }
    const updateTodolist = (todolistId:string,updateTitle: string)=>{
        setTodolists(todolists.map(el=>el.id===todolistId?{...el,title:updateTitle}:el))

    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const addTodolist = (newTitle: string) => {
        let todolistId = v1()
        let newTodolist: TodolistsType = {id: todolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const changerFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
            <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{padding:'25px'}}>
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
                        <Paper elevation={5} style={{padding:'25px',borderRadius: '20px'}}>
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


export default App;
