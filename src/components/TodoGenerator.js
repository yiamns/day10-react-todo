import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {useTodoService} from "../useTodoService";


export function TodoGenerator() {
    const {dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    const {creatTodo} = useTodoService();

    function handleAdd() {
        if (input.trim()) {
            creatTodo(input)
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