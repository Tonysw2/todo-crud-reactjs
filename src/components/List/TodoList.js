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
            <ul className={classes.ul}>
                {props.todoList.map((task) => {
                    return (
                        <li className={classes.li} key={task.id}>
                            <div>{formatText(task.text)}</div>
                            <div className={classes.buttons}>
                                {task.complete ? (
                                    ''
                                ) : (
                                    <div className={classes['wrap-btn']}>
                                        <Button
                                            className={classes['btn-del']}
                                            key={task.id}
                                            onClick={() => {
                                                props.deleteToDo(task.id);
                                            }}
                                        >
                                            DEL
                                        </Button>
                                        <Button
                                            className={classes['btn-edit']}
                                            onClick={() => {
                                                props.inputFocus.focus();
                                                props.editToDo(task.id);
                                            }}
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                )}

                                <input
                                    type="checkbox"
                                    id={task.id}
                                    onChange={() => props.completeTodo(task)}
                                    checked={task.complete}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
