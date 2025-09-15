import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";

export function TodoGenerator() {
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