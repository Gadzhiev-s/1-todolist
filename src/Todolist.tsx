import React, {ChangeEvent, FC} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {SuperCheckBox} from "./components/SuperCheckBox";

type TodoListProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changerFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolist: (todolistId: string, updateTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodoListProps> = ({
                                         tasks,
                                         title,
                                         removeTask,
                                         changerFilter,
                                         addTask,
                                         changeTaskStatus,
                                         filter,
                                         todolistId,
                                         removeTodolist,
                                         ...props
                                     }) => {

    const onAllChangerFilter = () => changerFilter(todolistId, 'all')
    const onActiveChangerFilter = () => changerFilter(todolistId, "active")
    const onCompletedChangerFilter = () => changerFilter(todolistId, "completed")


    const tasksJSX: Array<JSX.Element> = tasks.map((t) => {
        const removeTask1 = () => removeTask(todolistId, t.id)
        const updateTaskHandler = (tId: string, updateTitle: string) => {
            props.updateTask(todolistId, tId, updateTitle)}
        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)}


        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
            <SuperCheckBox isDone={t.isDone} callBack={onChangeHandlerCheckbox} />
            <EditableSpan oldTitle={t.title} callBack={(updateTitle: string) => updateTaskHandler(t.id, updateTitle)}/>
            <IconButton onClick={removeTask1} size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>

        </div>
    })

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const updateHandler = (updateTitle: string) => {
        props.updateTodolist(todolistId, updateTitle)
    }
    const buttonStyles = {
        maxWidth: '100px',
        maxHeight: '30px',
        minWidth: '50px',
        minHeight: '20px',
    }
    return (<div>
            <div className='todolist'>
                <EditableSpan oldTitle={title} callBack={updateHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
                <AddItemForm callBack={addTaskHandler}/>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <Button variant={filter === "all" ? 'outlined' : "contained"} color="primary"
                            onClick={onAllChangerFilter} style={buttonStyles}>All</Button>
                    <Button variant={filter === "active" ? 'outlined' : "contained"} color="success"
                            onClick={onActiveChangerFilter} style={buttonStyles}>Active</Button>
                    <Button variant={filter === "completed" ? 'outlined' : "contained"} color="error"
                            onClick={onCompletedChangerFilter} style={buttonStyles}>Completed</Button>
                </div>
            </div>
        </div>

    )
}
export default Todolist;