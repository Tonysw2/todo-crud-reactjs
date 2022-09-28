import './App.css';
import Form from './components/Form/Form';
import TodoList from './components/List/TodoList';
import ToDoContextProvider from './Context/ToDoContext';

function App() {
    return (
        <div className="app">
            <header>Tasks</header>
            <ToDoContextProvider>
                <Form />
                <TodoList />
            </ToDoContextProvider>
        </div>
    );
}

export default App;
