import { Link } from "react-router-dom";
import React from "react";

export function TodoItem(props) {
    const item = props.item || props.todo;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;
    const showDetailLink = props.showDetailLink !== false;
    const noStrikethrough = props.noStrikethrough;

    if (item) {
        const textClass = item.done
            ? noStrikethrough
                ? "todo-text"
                : "todo-text todo-done"
            : "todo-text";

        return (
            <div className="todo-row">
                <div
                    className={textClass}
                    onClick={onToggle}
                >
                    {item.text}
                </div>
                <button className="danger-btn" onClick={onDelete}>
                    X
                </button>
                {showDetailLink && (
                    <Link to={`/todos/${item.id}`} style={{marginLeft: 8}}>Detail</Link>
                )}
            </div>
        );
    }
}
