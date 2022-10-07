import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../api/urls';

export const ToDoContext = React.createContext();

const ToDoContextProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    const [isEditing, setIsEditing] = useState({ editing: false, editID: '' });
    const [inputFormIsFocused, setInputFormIsFocused] = useState(false);

    const getTodos = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/todo/`);
            const data = response.data;
            setTodoList(data);
        } catch (error) {
            console.log(error);
        }
    };

    const dateHandler = (taskDate) => {
        const splitedPickedDate = taskDate.split('-');
        const taskPickedDate = new Date(
            Number(splitedPickedDate[0]),
            Number(splitedPickedDate[1]) - 1,
            Number(splitedPickedDate[2])
        );
        const date = new Date();
        const actualDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

        const daysPassed =
            (taskPickedDate - actualDate) / (1000 * 60 * 60 * 24);

        let displayDate;
        const options = {
            day: '2-digit',
            weekday: 'short',
            month: 'long',
            // year: 'numeric',
        };

        if (daysPassed === 0) displayDate = 'Today';
        if (daysPassed === 1) displayDate = 'Tomorrow';
        if (daysPassed > 1)
            displayDate = taskPickedDate.toLocaleDateString('en-us', options);

        return displayDate;
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <ToDoContext.Provider
            value={{
                getTodos,
                dateHandler,
                todoList,
                setTodoList,
                isEditing,
                setIsEditing,
                inputFormIsFocused,
                setInputFormIsFocused,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

export default ToDoContextProvider;
