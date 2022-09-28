import React, { useContext } from 'react';
import { ToDoContext } from '../../Context/ToDoContext';
import './Form.css';

const Form = React.forwardRef(() => {
    const {
        addToDo,
        updateToDo,
        isEditing,
        inputFormIsFocused,
        inputFormFocus,
    } = useContext(ToDoContext);
    console.log(isEditing);

    const submitHandler = (event) => {
        event.preventDefault();

        if (!isEditing.editing && inputFormFocus.current.value.length === 0)
            alert(
                'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO ADD A NEW TASK!'
            );

        if (isEditing.editing && inputFormFocus.current.value.length === 0)
            alert(
                'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO EDIT ACTUAL TASK!'
            );

        if (!isEditing.editing && inputFormFocus.current.value.length > 0) {
            addToDo(inputFormFocus.current.value);
        }

        if (isEditing.editing && inputFormFocus.current.value.length > 0) {
            updateToDo(inputFormFocus.current.value);
        }

        inputFormFocus.current.value = '';
    };

    return (
        <form
            className={inputFormIsFocused ? 'isFocused' : ''}
            onSubmit={submitHandler}
        >
            <input
                ref={inputFormFocus}
                type="text"
                placeholder={isEditing.editing ? '' : 'Add your task here'}
            ></input>
            <div onClick={submitHandler} className="add-sharp">
                <ion-icon name="add-sharp"></ion-icon>
            </div>
        </form>
    );
});

export default Form;
