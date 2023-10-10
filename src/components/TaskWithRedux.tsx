import React, {ChangeEvent, memo} from 'react';
import {SuperCheckBox} from "./SuperCheckBox";
import EditableSpan from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {TaskType} from "../Todolist";
import {changeTaskStatusAC, changeTaskTitileAC, removeTaskAc} from "../state/tasks-reduser";

type TaskWithReduxType ={
    task:TaskType,
    todolistId:string
}
const TaskWithRedux = memo(({task,todolistId}:TaskWithReduxType) => {


    const dispatch = useDispatch()
    const removeTask =()=>{
        dispatch(removeTaskAc(task.id,todolistId))
    }

    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>)=>{
        let newIsDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, task.id,newIsDone ))
    }
   const updateTaskHandler =(tId: string, updateTitle: string)=>{
        dispatch(changeTaskTitileAC(todolistId,tId,updateTitle))
   }
    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <SuperCheckBox isDone={task.isDone} callBack={onChangeHandlerCheckbox}/>
            <EditableSpan oldTitle={task.title}
                          callBack={(updateTitle: string) => updateTaskHandler(task.id, updateTitle)}/>
            <IconButton onClick={removeTask} size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>

        </div>
    );
});
export default TaskWithRedux;