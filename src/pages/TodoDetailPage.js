import {useParams} from "react-router";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {TodoItem} from "../components/TodoItem";

export function TodoDetailPage() {
    const {id} = useParams();
    const {state} = useContext(TodoContext);
    const todoId = Array.isArray(id) ? id[0] : id;
    const todo = state.find((t) => String(t.id) === String(todoId));

    if (!todo) {
        return <div>Not Found Todo</div>;
    }

    return (
        <div className="done-detail-container">
            <div className="done-detail-text">{todo.text}</div>
        </div>
    );
}

