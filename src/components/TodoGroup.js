import {useContext} from "react";

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

