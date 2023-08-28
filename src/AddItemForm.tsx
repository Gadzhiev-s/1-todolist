import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type AddItemFormProps = {
    callBack: (title: string) => void
}


const AddItemForm = (props: AddItemFormProps) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTasks = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') addTasks()
    }
    const buttonStyles = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
    }
    return (
        <div>
            <TextField
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
                id="outlined-basic"
                label={error?'Title is required':'please type smth...)'}
                variant="outlined"
                size='small'/>
            <Button variant="contained" onClick={addTasks} style={buttonStyles}>+</Button>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    )
}


export default AddItemForm;