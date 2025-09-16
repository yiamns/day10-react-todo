import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoGroup } from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";
import {useTodoService} from "../useTodoService";

export function TodoList() {
    const { state, dispatch } = useContext(TodoContext);
    const { updateTodo, deleteTodo } = useTodoService();

    const handleToggle = (id) => {
        const todo = state.find(t => t.id === id);
        updateTodo(id, { text: todo.text, done: !todo.done })
            .then((todo) => dispatch({ type: "TOGGLE_TODO", payload: todo }));
    };

    const handleDelete = (id) => {
        deleteTodo(id).then(() => {
            dispatch({ type: "DELETE_TODO", payload: { id } });
        });
    };

    const handleEditSuccess = (id, newText) => {
        const todo = state.find(t => t.id === id);
        if (!todo) return;
        updateTodo(id, { text: newText, done: todo.done })
            .then((updated) => {
                dispatch({ type: "EDIT_TODO", payload: updated });
            });
    };

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
