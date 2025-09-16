import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoGroup } from "../components/TodoGroup";
import { useTodoHandlers } from "../hooks/useTodoHandlers";

export function DoneListPage() {
    const { state } = useContext(TodoContext);
    const doneTodos = state.filter(todo => todo.done);
    const { handleToggle, handleDelete, handleEditSuccess } = useTodoHandlers(doneTodos);

    if (doneTodos.length === 0) {
        return <div className="todo-tip">No completed todos.</div>;
    }

    return (
        <div>
            <h2>Done List</h2>
            <TodoGroup
                todos={doneTodos}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEditSuccess={handleEditSuccess}
                showDetailLink={true}
                noStrikethrough={true}
                hideDelete={false}
                hideEdit={false}
            />
        </div>
    );
}
