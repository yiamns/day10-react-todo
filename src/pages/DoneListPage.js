import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {TodoGroup} from "../components/TodoGroup";

export function DoneListPage() {
    const {state} = useContext(TodoContext);
    const doneTodos = state.filter(todo => todo.done);

    if (doneTodos.length === 0) {
        return <div className="todo-tip">No completed todos.</div>;
    }

    return (
        <div>
            <h2>Done List</h2>
            <TodoGroup
                todos={doneTodos}
                onToggle={() => {}}
                onDelete={() => {}}
                showDetailLink={true}
                noStrikethrough={true}
            />
        </div>
    );
}