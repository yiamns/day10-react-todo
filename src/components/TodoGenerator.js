import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {api} from "../api/mockApi";

export function TodoGenerator() {
    const {dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");

    function handleAdd() {
        if (input.trim()) {
            api.post("/todos", {text: input.trim(), done: false})
                .then(res => res.data)
                .then(todo => dispatch({type: "ADD_TODO", payload: todo}));
        }
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