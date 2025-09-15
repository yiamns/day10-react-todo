import {api} from "./api/mockApi";

export function useTodoService() {
    const loadTodos =  () => {
        return api.get("/todos")
            .then(res => res.data);
    }

    const updateTodo = (id, todo) => {
        return api.put(`/todos/${id}`, {text: todo.text, done: !todo.done})
            .then((res) => res.data);
    }

    const deleteTodo = (id) => {
        return api.delete(`/todos/${id}`);
    }

    const creatTodo = (input) => {
        return api.post("/todos", {text: input.trim(), done: false})
            .then(res => res.data);
    }

    return { loadTodos, updateTodo, deleteTodo, creatTodo };
}