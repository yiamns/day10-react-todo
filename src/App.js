import './App.css';
import {useEffect, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routers/BrowserRoutes";
import {useTodoService} from "./useTodoService";

function App() {
    const [state, dispatch] = useReducer(todoReducer, []);
    const {loadTodos} = useTodoService();
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
