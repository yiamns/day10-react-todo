import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoGroup } from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";
import {api} from "../api/mockApi";

function updateTodo(id, todo) {
    return api.put(`/todos/${id}`, {done: !todo.done})
        .then((res) => res.data);
}

function deleteTodo(id) {
    return api.delete(`/todos/${id}`);
}

export function TodoList() {
    const { state, dispatch } = useContext(TodoContext);

    const handleToggle = (id) => {
        const todo = state.find(t => t.id === id);
        updateTodo(id, todo)
            .then((todo) => dispatch({ type: "TOGGLE_TODO", payload: { id: todo.id } }));
    };

    const handleDelete = (id) => {
        deleteTodo(id).then(() => {
            dispatch({ type: "DELETE_TODO", payload: { id } });
        });
    };

    return (
        <>
            <h1>Todo List</h1>
            {state.length === 0 && (
                <div className="todo-tip">
                    Add the things you need to do today...
                </div>
            )}

            <TodoGroup
                todos={state}
                onToggle={handleToggle}
                onDelete={handleDelete}
                showDetailLink={false}
            />
            <TodoGenerator />
        </>
    );
}
