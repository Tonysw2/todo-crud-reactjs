import React, { useContext } from 'react';
import { ToDoContext } from '../../Context/ToDoContext';
import ItemActions from '../Item Actions/ItemActions';
import './TodoList.css';

const TodoList = () => {
    const { todoList, dateHandler } = useContext(ToDoContext);

    const formatText = (text) => {
        const formatedText = text.slice(0, 1).toUpperCase() + text.slice(1);
        return formatedText;
    };

    return (
        <div className="wrap-list">
            <ul className="list">
                {todoList
                    .sort((a, b) => a.complete - b.complete)
                    .map((task) => {
                        return (
                            <li
                                className={
                                    task.complete
                                        ? 'list-item list-item--complete'
                                        : 'list-item'
                                }
                                key={task.id}
                            >
                                <div>
                                    <div>{formatText(task.text)}</div>
                                    {task.date ? (
                                        <div className="conclusion-date">
                                            {dateHandler(task.date)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <ItemActions task={task} />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default TodoList;
