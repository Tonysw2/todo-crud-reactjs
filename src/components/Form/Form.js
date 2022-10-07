import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../../api/urls';
import { ToDoContext } from '../../Context/ToDoContext';

import './Form.css';

const Form = () => {
    const {
        getTodos,
        isEditing,
        setIsEditing,
        inputFormIsFocused,
        setInputFormIsFocused,
    } = useContext(ToDoContext);
    const inputForm = useRef(null);

    const addToDo = async (text) => {
        try {
            await axios.post(`${SERVER_URL}/todo`, {
                text: text,
                id: uuidv4(),
                complete: false,
                date: false,
            });
        } catch (e) {
            console.error(e);
        }
        getTodos();
    };

    const updateToDo = async (text) => {
        try {
            await axios.patch(`${SERVER_URL}/todo/${isEditing.editID}`, {
                text: text,
            });
        } catch (e) {
            console.error(e);
        }

        setIsEditing({ editing: false, editID: '' });
        setInputFormIsFocused(false);
        getTodos();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!isEditing.editing && inputForm.current.value.length === 0)
            alert(
                'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO ADD A NEW TASK!'
            );

        if (isEditing.editing && inputForm.current.value.length === 0)
            alert(
                'NO TEXT WAS WRITEN, PLEASE TYPE SOMETHING TO EDIT ACTUAL TASK!'
            );

        if (!isEditing.editing && inputForm.current.value.length > 0) {
            addToDo(inputForm.current.value);
        }

        if (isEditing.editing && inputForm.current.value.length > 0) {
            updateToDo(inputForm.current.value);
        }

        inputForm.current.value = '';
    };

    return (
        <>
            <form
                className={
                    inputFormIsFocused ? 'task-form isFocused' : 'task-form'
                }
                onSubmit={submitHandler}
            >
                <input
                    className="task-input"
                    ref={inputForm}
                    type="text"
                    placeholder={
                        isEditing.editing
                            ? 'Update your task'
                            : 'Add your task here'
                    }
                ></input>
                <div onClick={submitHandler} className="add-sharp">
                    <ion-icon name="add-sharp"></ion-icon>
                </div>
            </form>
        </>
    );
};

export default Form;
