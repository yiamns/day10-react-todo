import './App.css';
import {useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {initState, TodoContext} from "./contexts/TodoContext";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage";
import {HomePage} from "./pages/HomePage";
import {DefaultLayout} from "./layouts/DefaultLayout";
import {TodoDetailPage} from "./pages/TodoDetailPage";
import {DoneListPage} from "./pages/DoneListPage";
import {AboutUs} from "./pages/AboutUs";

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
