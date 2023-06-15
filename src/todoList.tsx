import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodoListProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changerFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType


}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListProps> = ({
                                         tasks,
                                         title,
                                         removeTask,
                                         changerFilter,
                                         addTask,
                                         changeTaskStatus,
                                         filter,
                                         todolistId

                                     }) => {
    const [title1, setTitle1] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle1(e.currentTarget.value)
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') addTasks()
    }
    const onAllChangerFilter = () => changerFilter(todolistId, 'all')
    const onActiveChangerFilter = () => changerFilter(todolistId, "active")
    const onCompletedChangerFilter = () => changerFilter(todolistId, "completed")


    const tasksJSX: Array<JSX.Element> = tasks.map((t) => {
        const removeTask1 = () => removeTask(todolistId, t.id)
        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        }

        return <li key={t.id}><input
            type="checkbox"
            onChange={onChangeHandlerCheckbox}
            checked={t.isDone}
            className={t.isDone ? 'is-done' : ''}/>
            <span>{t.title}</span>
            <button onClick={removeTask1}>X</button>
        </li>
    })

    const addTasks = () => {
        if (title1.trim() !== '') {
            addTask(todolistId, title1)
            setTitle1('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input
                    value={title1}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}

                />
                <button onClick={addTasks}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
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


    )
}
export default TodoList;