import './App.css';
import { useReducer } from "react";
import { todoReducer } from "./reducers/TodoReducer";
import { initState, TodoContext as TodoContext1 } from "./contexts/TodoContext";
import { TodoList } from "./components/TodoList";
import { TodoGenerator } from "./components/TodoGenerator";

function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            {state.length === 0 && (
                <div className="todo-tip">
                    Add the things you need to do today...
                </div>
            )}
            <TodoContext1.Provider value={{ state, dispatch }}>
                <TodoList />
            </TodoContext1.Provider>
        </div>
    );
}

export default App;
