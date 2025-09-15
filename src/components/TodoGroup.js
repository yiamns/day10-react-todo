import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoGroup({ todos, onToggle, onDelete }) {
    if (todos.length === 0) return null;
    return (
        <div>
            {todos.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    onToggle={() => onToggle(item.id)}
                    onDelete={() => onDelete(item.id)}
                />
            ))}
        </div>
    );
}
