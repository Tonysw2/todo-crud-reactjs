import React, { useEffect, useRef, useState } from 'react';

// COMPONENTS

// CSS
import classes from './Form.module.css';

const Form = React.forwardRef(
    ({ addToDo, updateToDo, isEditing, inputFormIsFocused }, inputFocus) => {
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

            if (!isEditing.editing && taskText.length === 0)
                alert(
                    'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO ADD A NEW TASK!'
                );

            if (isEditing.editing && taskTextUpdate.length === 0)
                alert(
                    'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO EDIT ACTUAL TASK!'
                );

            if (!isEditing.editing && taskText.length > 0) {
                addToDo(taskText);
            }

            if (isEditing.editing && taskTextUpdate.length > 0) {
                updateToDo(taskTextUpdate);
            }

            setTaskText('');
            setTaskTextUpdate('');
        };

        return (
            <form
                className={inputFormIsFocused ? `${classes.isFocused}` : ''}
                onSubmit={submitHandler}
            >
                <input
                    className={classes.input}
                    ref={inputFocus}
                    type="text"
                    onChange={
                        isEditing.editing
                            ? handlerTaskTextUpdate
                            : handlerTaskText
                    }
                    placeholder="Add your task here"
                    value={isEditing.editing ? taskTextUpdate : taskText}
                ></input>
                <div onClick={submitHandler} className={classes['add-sharp']}>
                    <ion-icon name="add-sharp"></ion-icon>
                </div>
            </form>
        );
    }
);

export default Form;
