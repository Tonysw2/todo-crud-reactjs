import React, { useState } from 'react';

// COMPONENTS
import Button from '../Button/Button';

// CSS
import classes from './Form.module.css';

const Form = React.forwardRef((props, focusInput) => {
    const [taskText, setTaskText] = useState('');
    const [taskTextUpdate, setTaskTextUpdate] = useState('');

    const handlerTaskText = (event) => {
        setTaskText(event.target.value);
    };

    const handlerTaskTextUpdate = (event) => {
        setTaskTextUpdate(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!props.isEditing.editing && taskText.length === 0)
            alert('NO TASK WAS WRITEN, PLEASE TRY AGAIN!');

        if (props.isEditing.editing && taskTextUpdate.length === 0)
            alert('NO TASK WAS WRITEN, PLEASE TRY AGAIN!');

        if (!props.isEditing.editing && taskText.length > 0) {
            props.addToDo(taskText);
        }

        if (props.isEditing.editing && taskTextUpdate.length > 0) {
            props.updateToDo(taskTextUpdate);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                className={classes.input}
                ref={focusInput}
                type="text"
                onChange={
                    props.isEditing.editing
                        ? handlerTaskTextUpdate
                        : handlerTaskText
                }
                placeholder="Add your task here"
                value={props.isEditing.editing ? taskTextUpdate : taskText}
            />

            <Button type="submit" className={classes['btn-add']}>
                ADD
            </Button>
        </form>
    );
});

export default Form;
