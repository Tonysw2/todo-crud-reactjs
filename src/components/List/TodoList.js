import React from 'react';

// COMPONENTS
import Button from '../Button/Button';

// CSS
import classes from './TodoList.module.css';

const TodoList = (props) => {
    const formatText = (text) => {
        const formatedText = text.slice(0, 1).toUpperCase() + text.slice(1);
        return formatedText;
    };

    return (
        <div className={classes['wrap-list']}>
            <ul className={classes.list}>
                {props.todoList.map((task) => {
                    return (
                        <li className={classes['list-item']} key={task.id}>
                            <div>{formatText(task.text)}</div>
                            <div className={classes.buttons}>
                                <input
                                    className={classes.checkbox}
                                    type="checkbox"
                                    id={task.id}
                                    onChange={() => props.completeTodo(task)}
                                    checked={task.complete}
                                />

                                {task.complete ? (
                                    ''
                                ) : (
                                    <div className={classes['wrap-btn']}>
                                        <Button
                                            className={classes['btn-edit']}
                                            onClick={() => {
                                                props.inputFocus.focus();
                                                props.editToDo(task.id);
                                            }}
                                        >
                                            {
                                                <ion-icon name="create-outline"></ion-icon>
                                            }
                                        </Button>
                                        <Button
                                            className={classes['btn-del']}
                                            key={task.id}
                                            onClick={() => {
                                                props.deleteToDo(task.id);
                                            }}
                                        >
                                            {
                                                <ion-icon name="trash-outline"></ion-icon>
                                            }
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
