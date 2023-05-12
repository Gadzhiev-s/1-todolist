import React, {FC} from "react";
import {FilterValuesType} from "./App";


type TodoListProps = {
    title: string
    tasks: TaskType[]
    removeTask:(taskId:number)=>void
    changerFilter:(filter:FilterValuesType)=>void

}
export type TaskType = {
    id: number
    title: string
    isDone: boolean


}
const TodoList:FC <TodoListProps> = ({tasks,title,removeTask,changerFilter }) => {

    const tasksJSX:Array<JSX.Element> = tasks.map((t)=>{
        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => removeTask(t.id)}>X</button></li>})

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={()=>changerFilter('all')}>All</button>
                <button onClick={()=>changerFilter("active")}>Active</button>
                <button onClick={()=>changerFilter('completed')}>Completed</button>
            </div>
        </div>


    )
}
export default TodoList;