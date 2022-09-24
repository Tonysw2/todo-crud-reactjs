import React, { useState } from 'react';

// COMPONENTS

import ItemActions from '../Item Actions/ItemActions';

// CSS
import classes from './TodoList.module.css';

const TodoList = ({
    todoList,
    inputFocus,
    completeToDo,
    editToDo,
    deleteToDo,
}) => {
    const formatText = (text) => {
        const formatedText = text.slice(0, 1).toUpperCase() + text.slice(1);
        return formatedText;
    };

    return (
        <div className={classes['wrap-list']}>
            <ul className={classes.list}>
                {todoList
                    .sort((a, b) => a.complete - b.complete)
                    .map((task) => {
                        return (
                            <li
                                className={
                                    task.complete
                                        ? `${classes['list-item']} ${classes['list-item--complete']}`
                                        : classes['list-item']
                                }
                                key={task.id}
                            >
                                <div>
                                    <div>{formatText(task.text)}</div>
                                    <div className={classes['item-details']}>
                                        {task.date}
                                    </div>
                                </div>

                                <ItemActions
                                    task={task}
                                    inputFocus={inputFocus}
                                    completeToDo={completeToDo}
                                    editToDo={editToDo}
                                    deleteToDo={deleteToDo}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default TodoList;
