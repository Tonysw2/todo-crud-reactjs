import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../api/urls";
import { faker } from "@faker-js/faker";
import Button from "./Button/Button";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addToDo = async () => {
    try {
      await axios.post(`${SERVER_URL}/todo`, {
        id: uuidv4(),
        name: faker.name.findName(),
        complete: false,
      });
    } catch (e) {
      console.error(e);
      setError(true);
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

  const updateTodo = async (id) => {
    try {
      await axios.patch(`${SERVER_URL}/todo/${id}`, {
        complete: true,
      });
      getToDos();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  if (loading) return <p>Loading....</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={addToDo}>Add</button>
      {todoList.map((todo) => (
        <div
          style={{
            padding: "10px",
            margin: "4px",
            border: "1px solid black",
            backgroundColor: todo.complete ? "red" : "white",
          }}
          key={todo.id}
        >
          <Button onClick={() => deleteToDo(todo.id)}>Delete</Button>
          <Button onClick={() => updateTodo(todo.id)}>Complete</Button>
          <p>Name: {todo.name}</p>
          <p>Name: {todo.id}</p>
          <p>Name: {todo.complete}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
