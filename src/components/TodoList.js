import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoGroup } from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";
import { useTodoHandlers } from "../hooks/useTodoHandlers";

export function TodoList() {
    const { state } = useContext(TodoContext);
    const { handleToggle, handleDelete, handleEditSuccess } = useTodoHandlers(state);

    return (
        <>
            <h2>Todo List</h2>
            {state.length === 0 && (
                <div className="todo-tip">
                    Add the things you need to do today...
                </div>
            )}

            <TodoGroup
                todos={state}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEditSuccess={handleEditSuccess}
                showDetailLink={true}
            />
            <TodoGenerator />
        </>
    );
}
