import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useTodoService } from "../useTodoService";

export function useTodoHandlers(todos) {
    const { dispatch } = useContext(TodoContext);
    const { updateTodo, deleteTodo } = useTodoService();

    const handleToggle = (id) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        updateTodo(id, { text: todo.text, done: !todo.done })
            .then((todo) => dispatch({ type: "TOGGLE_TODO", payload: todo }));
    };

    const handleDelete = (id) => {
        deleteTodo(id).then(() => {
            dispatch({ type: "DELETE_TODO", payload: { id } });
        });
    };

    const handleEditSuccess = (id, newText) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        updateTodo(id, { text: newText, done: todo.done })
            .then((updated) => {
                dispatch({ type: "EDIT_TODO", payload: updated });
            });
    };

    return { handleToggle, handleDelete, handleEditSuccess };
}
