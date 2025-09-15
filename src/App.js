import './App.css';
import {useEffect, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {RouterProvider} from "react-router-dom";
import {api} from "./api/mockApi";
import {routes} from "./routers/BrowserRoutes";

function loadTodos() {
    return api.get("/todos")
        .then(res => res.data);
}

function App() {
    const [state, dispatch] = useReducer(todoReducer, []);
    useEffect(() => {
        loadTodos()
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
