// src/App.js

import './App.css';
import {createContext, useContext, useReducer, useState} from "react";

export const initState = [];
export const TodoContext = createContext();

function TodoItem(props) {
    const {dispatch} = useContext(TodoContext);

    function makeAsDone() {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: {id: props.todo.id}
        });
    }

    return (
        <span
            className={props.todo.done ? "todo-done" : ""}
            onClick={makeAsDone}
        >
            {props.todo.text}
        </span>
    );
}

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
                <div key={item.id} style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <div
                        className={item.done ? "todo-done" : ""}
                        onClick={() => dispatch({type: 'TOGGLE_TODO', payload: {id: item.id}})}
                        style={{
                            flex: 1,
                            padding: "12px",
                            fontSize: "16px",
                            background: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textDecoration: item.done ? "line-through" : "none",
                            marginRight: "8px"
                        }}
                    >
                        {item.text}
                    </div>
                    <button
                        onClick={() => dispatch({type: 'DELETE_TODO', payload: {id: item.id}})}
                        style={{
                            width: "30px",
                            height: "45px",
                            background: "#eee",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                            color: "#333",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
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
        <div style={{display: "flex", marginTop: "20px"}}>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px 0 0 4px"
                }}
            />
            <button
                onClick={handleAdd}
                style={{
                    padding: "0 24px",
                    background: "#7daaff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0 4px 4px 0",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                add
            </button>
        </div>
    );
}

function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <div style={{
            maxWidth: "500px",
            margin: "40px auto",
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "32px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
            <h1 style={{textAlign: "center"}}>Todo List</h1>
            {/* 只在没有todo时显示提示语 */}
            {state.length === 0 && (
                <div style={{textAlign: "center", color: "#666", marginBottom: "24px"}}>
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
