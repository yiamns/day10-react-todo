// src/App.js

import './App.css';
import {createContext, useContext, useReducer, useState} from "react";

export const initState = [];
export const TodoContext = createContext();

export function todoReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_TODO":
            return state.map((value) => {
                if (value.id === action.payload.id) {
                    return { ...value, done: !value.done };
                }
                return value;
            });
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload.id);
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: state.length === 0 ? 1 : Math.max(...state.map(t => t.id)) + 1,
                    text: action.payload.text,
                    done: false
                }
            ];
        default:
            return state;
    }
}

function TodoGroup() {
    const {state, dispatch} = useContext(TodoContext);
    if (state.length === 0) return null;
    return (
        <div>
            {state.map((item) => (
                <div key={item.id} className="todo-row">
                    <div
                        className={`todo-text${item.done ? " todo-done" : ""}`}
                        onClick={() => dispatch({type: 'TOGGLE_TODO', payload: {id: item.id}})}
                    >
                        {item.text}
                    </div>
                    <button
                        className="todo-btn"
                        onClick={() => dispatch({type: 'DELETE_TODO', payload: {id: item.id}})}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}



function TodoInput() {
    const {dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");

    function handleAdd() {
        if (input.trim() === "") return;
        dispatch({type: "ADD_TODO", payload: {text: input}});
        setInput("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleAdd();
        }
    }

    return (
        <div className="todo-input">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAdd}>add</button>
        </div>
    );
}

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
            <TodoContext.Provider value={{state, dispatch}}>
                <TodoGroup/>
                <TodoInput/>
            </TodoContext.Provider>
        </div>
    );
}

export default App;
