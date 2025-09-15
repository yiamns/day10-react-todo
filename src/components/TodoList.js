import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoGroup } from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";

export function TodoList() {
    const { state, dispatch } = useContext(TodoContext);

    const handleToggle = (id) => {
        dispatch({ type: "TOGGLE_TODO", payload: { id } });
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_TODO", payload: { id } });
    };

    return (
        <>
            <TodoGroup
                todos={state}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
            <TodoGenerator />
        </>
    );
}
