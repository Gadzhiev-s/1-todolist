import React, {ChangeEvent, useState} from 'react';


type EditableSpanProps = {
    oldTitle: string,
    callBack: (updateTitle: string) => void

}

const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    const editFc = () => {
        setEdit(!edit)
        if (edit){
            addTaskHandler()
        }
    }
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUpdateTitle(e.currentTarget.value)

    const addTaskHandler = () => {
        props.callBack(updateTitle)
    }
    return (
        edit ? <input value={updateTitle} onBlur={editFc} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editFc}>{props.oldTitle} </span>
    );

}

export default EditableSpan;