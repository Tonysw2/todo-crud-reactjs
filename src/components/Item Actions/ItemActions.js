import React from 'react';
import Button from '../Button/Button';
import classes from './ItemActions.module.css';

const ItemActions = ({
    task,
    inputFocus,
    setInputFormIsFocused,
    completeToDo,
    editToDo,
    deleteToDo,
}) => {
    return (
        <div className={classes.buttons}>
            {task.complete ? (
                <>
                    <Button
                        className={classes['btn-complete']}
                        id={task.id}
                        onClick={() => completeToDo(task)}
                    >
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </Button>
                    <Button
                        className={classes['btn-del']}
                        key={task.id}
                        onClick={() => {
                            deleteToDo(task.id);
                        }}
                    >
                        {<ion-icon name="trash-outline"></ion-icon>}
                    </Button>
                </>
            ) : (
                <div className={classes['wrap-btn']}>
                    <Button
                        className={classes['btn-complete']}
                        id={task.id}
                        onClick={() => completeToDo(task)}
                    >
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </Button>
                    <Button
                        className={classes['btn-edit']}
                        onClick={() => {
                            inputFocus.focus();
                            setInputFormIsFocused(true);
                            editToDo(task.id);
                        }}
                    >
                        {<ion-icon name="create-outline"></ion-icon>}
                    </Button>
                    <Button
                        className={classes['btn-del']}
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
