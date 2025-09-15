import './App.css';
import {useContext, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {initState, TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider, Link} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {DefaultLayout} from "./layouts/DefaultLayout";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {TodoGroup} from "./components/TodoGroup";

function DoneListPage() {
    const { state } = useContext(TodoContext);
    const doneTodos = state.filter(todo => todo.done);

    if (doneTodos.length === 0) {
        return <div className="todo-tip">No completed todos.</div>;
    }

    return (
        <div>
            <h1>Done List</h1>
            <TodoGroup
                todos={doneTodos}
                onToggle={() => {}}
                onDelete={() => {}}
                showDetailLink={true}
            />
        </div>
    );
}

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/todos/:id",
                element: <TodoDetailPage />
            },
            {
                path: "/done",
                element: <DoneListPage />
            },
        ]
    }
]);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <div className="todo-container">
            <TodoContext.Provider value={{ state, dispatch }}>
                <RouterProvider router={routes} />
            </TodoContext.Provider>
        </div>
    );
}

export default App;
