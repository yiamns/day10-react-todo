
import './App.css';
import {useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoGroup, TodoInput} from "./components/TodoGroup";
import {initState, TodoContext as TodoContext1} from "./contexts/TodoContext";

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
            <TodoContext1 value={{state, dispatch}}>
                <TodoGroup/>
                <TodoInput/>
            </TodoContext1>
        </div>
    );
}

export default App;
