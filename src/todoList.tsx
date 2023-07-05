import React, {ChangeEvent, FC} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    updateTask:(todolistId: string, taskId: string,updateTitle: string)=>void
    updateTodolist:(todolistId:string,updateTitle: string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListProps> = ({tasks,
                                         title,
                                         removeTask,
                                         changerFilter,
                                         addTask,
                                         changeTaskStatus,
                                         filter,
                                         todolistId,
                                         removeTodolist,
                                         ...props}) => {

    const onAllChangerFilter = () => changerFilter(todolistId, 'all')
    const onActiveChangerFilter = () => changerFilter(todolistId, "active")
    const onCompletedChangerFilter = () => changerFilter(todolistId, "completed")


    const tasksJSX: Array<JSX.Element> = tasks.map((t) => {
        const removeTask1 = () => removeTask(todolistId, t.id)
        const updateTaskHandler=( tId: string,updateTitle:string)=>{
            props.updateTask(todolistId,tId,updateTitle)
        }
        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        }
        return <li key={t.id}><input
            type="checkbox"
            onChange={onChangeHandlerCheckbox}
            checked={t.isDone}
            className={t.isDone ? 'is-done' : ''}/>
            <EditableSpan oldTitle={t.title} callBack={(updateTitle:string)=>updateTaskHandler(t.id,updateTitle)}/>
            <button onClick={removeTask1}>X</button>
        </li>
    })

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const updateHandler=(updateTitle: string)=>{
        props.updateTodolist(todolistId,updateTitle)
    }
    return (<div>
        <div className='todolist'>
            {/*<h3>{title}</h3>*/}
            <EditableSpan oldTitle={title} callBack={updateHandler} />
            <button onClick={removeTodolistHandler}>X</button>
            <AddItemForm callBack={addTaskHandler} />
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={filter === "all" ? 'active-filter' : ''} onClick={onAllChangerFilter}>All</button>
                <button className={filter === "active" ? 'active-filter' : ''} onClick={onActiveChangerFilter}>Active
                </button>
                <button className={filter === "completed" ? 'active-filter' : ''}
                        onClick={onCompletedChangerFilter}>Completed
                </button>
            </div>
        </div>
        </div>

    )
}
export default TodoList;