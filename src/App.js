import './App.css';
import {useEffect, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {initState, TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {DefaultLayout} from "./layouts/DefaultLayout";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {DoneListPage} from "./pages/DoneListPage";
import {AboutUs} from "./pages/AboutUs";
import axios from "axios";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
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
            {
                path: "/about",
                element: <AboutUs />
            },
        ]
    }
]);

const api = axios.create({
    baseURL:"https://68c7acb55d8d9f5147328928.mockapi.io/",
    headers: { "Content-Type": "application/json" },
    timeout: 10_000
});

function App() {
    const [state, dispatch] = useReducer(todoReducer, []);
    useEffect(() => {
        api.get("/todos")
            .then(res => res.data)
            .then(todos => dispatch({ type: "LOAD_TODOS", payload: todos}))
    }, []);
    return (
        <div className="todo-container">
            <TodoContext.Provider value={{ state, dispatch }}>
                <RouterProvider router={routes} />
            </TodoContext.Provider>
        </div>
    );
}

export default App;
