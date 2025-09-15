import './App.css';
import {useContext, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {initState, TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider, Link} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {DefaultLayout} from "./layouts/DefaultLayout";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {NavBar} from "./components/NavBar";

function DoneListPage() {
    const { state } = useContext(TodoContext);
    const doneTodos = state.filter(todo => todo.done);

    if (doneTodos.length === 0) {
        return <div className="todo-tip">No completed todos.</div>;
    }

    return (
        <div>
            <h1>Done List</h1>
            {doneTodos.map(todo => (
                <div key={todo.id} className="todo-row">
                    <div className="todo-text todo-done">{todo.text}</div>
                    <Link to={`/todos/${todo.id}`} style={{ marginLeft: 8 }}>Detail</Link>
                </div>
            ))}
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
