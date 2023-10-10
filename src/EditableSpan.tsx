import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanProps = {
    oldTitle: string,
    callBack: (updateTitle: string) => void

}

const EditableSpan =React.memo( (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    console.log('EditablSpan')
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
        edit ?<TextField id="standard-basic"  variant="standard" value={updateTitle} onBlur={editFc} onChange={onChangeHandler} autoFocus />
            : <span onDoubleClick={editFc}>{props.oldTitle} </span>
    );

})

export default EditableSpan;