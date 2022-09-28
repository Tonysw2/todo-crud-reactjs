import React, { useContext } from 'react';
import { ToDoContext } from '../../Context/ToDoContext';
import Button from '../Button/Button';
import './ItemActions.css';

const ItemActions = ({ task }) => {
    const {
        completeToDo,
        deleteToDo,
        editToDo,
        inputFormFocus,
        setInputFormIsFocused,
    } = useContext(ToDoContext);

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
                    <Button
                        className="btn-complete"
                        id={task.id}
                        onClick={() => completeToDo(task)}
                    >
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </Button>
                    <Button
                        className="btn-edit"
                        onClick={() => {
                            inputFormFocus.focus();
                            setInputFormIsFocused(true);
                            editToDo(task.id);
                        }}
                    >
                        {<ion-icon name="create-outline"></ion-icon>}
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
                </div>
            )}
        </div>
    );
};

export default ItemActions;
