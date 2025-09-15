import './App.css';
import { useReducer } from "react";
import { todoReducer } from "./reducers/TodoReducer";
import { initState, TodoContext as TodoContext1 } from "./contexts/TodoContext";
import { TodoList } from "./components/TodoList";
import {createBrowserRouter, NavLink, Outlet, RouterProvider} from "react-router";

function DefaultLayout() {
    return <div>
        <header>
            <nav>
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
    </div>;
}

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <TodoList />
            }
        ]
    }
]);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <div className="todo-container">
            <TodoContext1.Provider value={{ state, dispatch }}>
                <RouterProvider router={routes} />
            </TodoContext1.Provider>
        </div>
    );
}

export default App;
