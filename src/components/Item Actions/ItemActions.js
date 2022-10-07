import axios from 'axios';
import React, { useContext } from 'react';
import { SERVER_URL } from '../../api/urls';
import { ToDoContext } from '../../Context/ToDoContext';
import Button from '../Button/Button';
import './ItemActions.css';

const ItemActions = ({ task }) => {
    const { getTodos, isEditing, setIsEditing, setInputFormIsFocused } =
        useContext(ToDoContext);

    const setTaskDate = async (task, taskDate) => {
        try {
            await axios.patch(`${SERVER_URL}/todo/${task.id}`, {
                date: taskDate,
            });
        } catch (error) {
            console.log(error);
        }

        getTodos();
    };

    const completeToDo = async (task) => {
        try {
            await axios.patch(`${SERVER_URL}/todo/${task.id}`, {
                complete: !task.complete,
            });
        } catch (e) {
            console.error(e);
        }

        getTodos();
    };

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}/todo/${id}`);
        } catch (e) {
            console.error(e);
        }
        getTodos();
    };

    const editToDo = (id) => {
        if (isEditing.editing) {
            setIsEditing({ editing: false, editID: '' });
            setInputFormIsFocused(false);
        } else {
            setIsEditing((prev) => {
                return { editing: !prev.editing, editID: id };
            });
            setInputFormIsFocused(true);
        }
    };

    const getMinDate = () => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        const newDate = new Date().toLocaleString('pt-br', options);
        const minDate = newDate.split('/').reverse().join('-');

        return minDate;
    };

    return (
        <div className="buttons">
            {task.complete ? (
                <>
                    <Button
                        className="btn-complete"
                        id={task.id}
                        onClick={() => completeToDo(task)}
                    >
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </Button>
                    <Button
                        className="btn-del"
                        onClick={() => {
                            deleteToDo(task.id);
                        }}
                    >
                        {<ion-icon name="trash-outline"></ion-icon>}
                    </Button>
                </>
            ) : (
                <div className="wrap-btn">
                    <Button className="btn-date" title="date">
                        <input
                            className="input-date"
                            type="date"
                            min={getMinDate()}
                            onChange={(event) =>
                                setTaskDate(task, event.target.value)
                            }
                        />
                        <ion-icon name="calendar-number-outline"></ion-icon>
                    </Button>
                    <Button
                        className="btn-complete"
                        id={task.id}
                        onClick={() => completeToDo(task)}
                    >
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </Button>
                    <Button
                        className="btn-edit"
                        title="edit"
                        onClick={() => {
                            editToDo(task.id);
                        }}
                    >
                        {<ion-icon name="create-outline"></ion-icon>}
                    </Button>
                    <Button
                        className="btn-del"
                        title="delete"
                        onClick={() => {
                            deleteToDo(task.id);
                        }}
                    >
                        {<ion-icon name="trash-outline"></ion-icon>}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ItemActions;
