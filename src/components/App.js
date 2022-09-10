import axios from 'axios';
// ID GENERATOR
import { v4 as uuidv4 } from 'uuid';
// SERVER
import { SERVER_URL } from '../api/urls';

// REACT HOOKS
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import Form from './Form/Form';
import TodoList from './List/TodoList';

// CSS
import classes from './App.module.css';

function App() {
    const [loading, setLoading] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [isEditing, setIsEditing] = useState({ editing: false, editID: '' });
    const inputElement = useRef(null);

    const getToDos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${SERVER_URL}/todo`);
            setTodoList(res.data);
            setLoading(false);
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
        setIsEditing((prev) => {
            return { editing: !prev.editing, editID: id };
        });
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
        getToDos();
    };

    const completeTodo = async (task) => {
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
        if (loading) return <p>Loading....</p>;
        getToDos();
    }, []);

    return (
        <div
            className={
                todoList.length === 0 ? classes['lower-gap'] : classes.app
            }
        >
            {todoList.length === 0 && (
                <p>🔽 There is no task yet, type your task here 🔽</p>
            )}
            <Form
                ref={inputElement}
                addToDo={addToDo}
                updateToDo={updateToDo}
                isEditing={isEditing}
            />
            <TodoList
                inputFocus={inputElement.current}
                editToDo={editToDo}
                deleteToDo={deleteToDo}
                completeTodo={completeTodo}
                todoList={todoList}
            />
        </div>
    );
}

export default App;
