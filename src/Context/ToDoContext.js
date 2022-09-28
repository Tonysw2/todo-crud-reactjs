import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../api/urls';

export const ToDoContext = React.createContext();

const ToDoContextProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    const [isEditing, setIsEditing] = useState({ editing: false, editID: '' });
    const [inputFormIsFocused, setInputFormIsFocused] = useState(false);
    const inputFormFocus = useRef(null);

    const getTaskDate = useCallback(() => {
        const newDate = new Date();
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        const date = `Creation date: ${day}/${
            month > 9 ? month : `0${month}`
        }/${year}`;
        return date;
    }, []);

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
                date: getTaskDate(),
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
        } else {
            setIsEditing((prev) => {
                return { editing: !prev.editing, editID: id };
            });
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

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <ToDoContext.Provider
            value={{
                addToDo,
                deleteToDo,
                updateToDo,
                editToDo,
                completeToDo,
                setInputFormIsFocused,
                todoList,
                isEditing,
                inputFormIsFocused,
                inputFormFocus,
            }}
        >
            {children}
        </ToDoContext.Provider>
    );
};

export default ToDoContextProvider;
