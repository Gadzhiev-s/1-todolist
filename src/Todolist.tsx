import React, {memo, useCallback} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import TaskWithRedux from "./components/TaskWithRedux";

type TodoListProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changerFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, updateTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = React.memo(({
                                 todolistId,
                                 title,
                                 tasks,
                                 changerFilter,
                                 addTask,
                                 filter,
                                 removeTodolist,
                                 updateTodolist,
                             }:TodoListProps) => {
    console.log('Todolist')

    const onAllChangerFilter = useCallback(() => changerFilter(todolistId, 'all'), [changerFilter, todolistId]);
    const onActiveChangerFilter = useCallback(() => changerFilter(todolistId, "active"), [changerFilter, todolistId]);
    const onCompletedChangerFilter = useCallback(() => changerFilter(todolistId, "completed"), [changerFilter, todolistId]);
    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const updateHandler = useCallback((updateTitle: string) => {
        updateTodolist(todolistId, updateTitle)
    }, [updateTodolist, todolistId])
    const buttonStyles = {
        maxWidth: '100px',
        maxHeight: '30px',
        minWidth: '50px',
        minHeight: '20px',
    }
    let task = tasks
    if (filter === 'active') {
        task = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        task = tasks.filter(t => t.isDone)
    }
    return (<div>
            <div className='todolist'>
                <EditableSpan oldTitle={title} callBack={updateHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm callBack={addTaskHandler}/>
                <ul>
                    {task.map(t => <TaskWithRedux key={t.id} task={t}
                                          todolistId={todolistId}/>)}
                </ul>
                <div>
                    <ButtonWithMemo variant={filter === "all" ? 'outlined' : "contained"} color="primary"
                                    onClick={onAllChangerFilter} style={buttonStyles} title={'All'}/>
                    <ButtonWithMemo title={'Active'} variant={filter === "active" ? 'outlined' : "contained"}
                                    color="success"
                                    onClick={onActiveChangerFilter} style={buttonStyles}/>
                    <ButtonWithMemo variant={filter === "completed" ? 'outlined' : "contained"} color="error"
                                    onClick={onCompletedChangerFilter} style={buttonStyles} title={'Completed'}/>
                </div>
            </div>
        </div>

    )
})
export default Todolist;
type  ButtonWithMemoPropsType = {
    variant: 'text' | 'outlined' | 'contained',
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    onClick: () => void,
    style: any
    title: string
}
const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return <Button variant={props.variant} color={props.color}
                   onClick={props.onClick} style={props.style}>{props.title}</Button>
})