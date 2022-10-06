import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../api/urls';

export const ToDoContext = React.createContext();

const ToDoContextProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    const [isEditing, setIsEditing] = useState({ editing: false, editID: '' });
    const [inputFormIsFocused, setInputFormIsFocused] = useState(false);
    const inputDate = useRef(null);
    const inputFormFocus = useRef(null);

    const getToDos = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/todo`);
            setTodoList(res.data);
        } catch (e) {
            console.error(e);
        }
    };

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
        getToDos();
    };

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}/todo/${id}`);
        } catch (e) {
            console.error(e);
        }
        getToDos();
    };

    const editToDo = (id) => {
        if (isEditing.editing) {
            setIsEditing({ editing: false, editID: '' });
            inputFormFocus.current.blur();
            setInputFormIsFocused(false);
        } else {
            setIsEditing((prev) => {
                return { editing: !prev.editing, editID: id };
            });
            inputFormFocus.current.focus();
            setInputFormIsFocused(true);
        }
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
        getToDos();
    };

    const completeToDo = async (task) => {
        try {
            await axios.patch(`${SERVER_URL}/todo/${task.id}`, {
                complete: !task.complete,
            });
        } catch (e) {
            console.error(e);
        }

        getToDos();
    };

    const setTaskDate = async (task, taskDate) => {
        try {
            await axios.patch(`${SERVER_URL}/todo/${task.id}`, {
                date: taskDate,
            });
        } catch (error) {
            console.log(error);
        }

        getToDos();
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

        let displayDate = '';
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        };

        if (daysPassed === 0) displayDate = 'Today';
        if (daysPassed === 1) displayDate = 'Tomorrow';
        if (daysPassed > 1)
            displayDate = taskPickedDate.toLocaleDateString('en-us', options);

        return displayDate;
    };

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <ToDoContext.Provider
            value={{
                getToDos,
                addToDo,
                updateToDo,
                completeToDo,
                editToDo,
                deleteToDo,
                setTaskDate,
                dateHandler,
                todoList,
                setTodoList,
                isEditing,
                setIsEditing,
                inputFormIsFocused,
                setInputFormIsFocused,
                inputFormFocus,
                inputDate,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

export default ToDoContextProvider;
