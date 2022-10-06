import React, { useContext } from 'react';
import { ToDoContext } from '../../Context/ToDoContext';
import Button from '../Button/Button';
import './ItemActions.css';

const ItemActions = ({ task }) => {
    const { setTaskDate, completeToDo, editToDo, deleteToDo, inputDate } =
        useContext(ToDoContext);

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
                        key={task.id}
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
                            ref={inputDate}
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
                        key={task.id}
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
