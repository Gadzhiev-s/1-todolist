import React, {ChangeEvent, memo, useCallback} from "react";
import {SuperCheckBox} from "./components/SuperCheckBox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

export type TaskTypeProps = {
    task: TaskType,
    removeTask: (todolistId: string, taskId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolistId: string

}
export const Task = memo(({
                                    task,
                                    removeTask,
                                    updateTask,
                                    changeTaskStatus,
                                    todolistId,
                                }: TaskTypeProps) => {
    const removeTaskP = useCallback(() => removeTask(todolistId, task.id), [removeTask, todolistId, task.id])
    const updateTaskHandler = useCallback((tId: string, updateTitle: string) => {
        updateTask(todolistId, tId, updateTitle)
    }, [updateTask, todolistId])
    const onChangeHandlerCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
    }, [todolistId, task.id])


    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <SuperCheckBox isDone={task.isDone} callBack={onChangeHandlerCheckbox}/>
        <EditableSpan oldTitle={task.title}
                      callBack={(updateTitle: string) => updateTaskHandler(task.id, updateTitle)}/>
        <IconButton onClick={removeTaskP} size="small">
            <DeleteIcon fontSize="inherit"/>
        </IconButton>

    </div>
})