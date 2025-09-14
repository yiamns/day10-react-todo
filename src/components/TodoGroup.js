import {useContext, useState} from "react";

import {TodoContext} from "../contexts/TodoContext";

export function TodoGroup() {
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

export function TodoInput() {
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