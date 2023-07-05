import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormProps = {
    callBack: (title: string) => void
}


const AddItemForm = (props: AddItemFormProps) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTasks = () => {
        let newTitle = title.trim()
        if (newTitle!== '') {
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
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}

            />
            <button onClick={addTasks}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}


export default AddItemForm;