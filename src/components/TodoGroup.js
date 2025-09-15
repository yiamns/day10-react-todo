import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoGroup(props) {
    const { todos, onToggle, onDelete, showDetailLink, noStrikethrough } = props;

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
                    noStrikethrough={noStrikethrough}
                />
            ))}
        </div>
    );
}
