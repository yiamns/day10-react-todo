// src/components/TodoItem.js
import React from "react";

export function TodoItem(props) {
    const item = props.item || props.todo;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;

    if (!item) return null;

    return (
        <div className="todo-row">
            <div
                className={`todo-text${item.done ? " todo-done" : ""}`}
                onClick={onToggle}
            >
                {item.text}
            </div>
            <button className="todo-btn" onClick={onDelete}>
                X
            </button>
        </div>
    );
}
