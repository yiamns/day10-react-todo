import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoGroup(props) {
    const todos = props.todos;
    const onToggle = props.onToggle;
    const onDelete = props.onDelete;
    const showDetailLink = props.showDetailLink;

    if (!todos || todos.length === 0) return null;
    return (
        <div>
            {todos.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    todo={item}
                    onToggle={() => onToggle(item.id)}
                    onDelete={() => onDelete(item.id)}
                    showDetailLink={showDetailLink}
                />
            ))}
        </div>
    );
}
