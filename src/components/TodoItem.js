import React from "react";

export function TodoItem({ item, onToggle, onDelete }) {
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
