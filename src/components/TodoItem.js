import { Link } from "react-router-dom";
import React from "react";

export function TodoItem(props) {
    const item = props.item || props.todo;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;
    const showDetailLink = props.showDetailLink !== false; // default true

    if (!item) return null;

    return (
        <div className="todo-row">
            <div
                className={`todo-text${item.done ? " todo-done" : ""}`}
                onClick={onToggle}
            >
                {item.text}
            </div>
            {showDetailLink && (
                <Link to={`/todos/${item.id}`} style={{ marginRight: 8 }}>Detail</Link>
            )}
            <button className="todo-btn" onClick={onDelete}>
                X
            </button>
        </div>
    );
}
