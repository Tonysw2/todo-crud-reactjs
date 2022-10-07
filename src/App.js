import './App.css';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import TodoList from './components/List/TodoList';
import ToDoContextProvider from './Context/ToDoContext';

function App() {
    return (
        <div className="app">
            <Header />
            <ToDoContextProvider>
                <Form />
                <TodoList />
            </ToDoContextProvider>
        </div>
    );
}

export default App;
