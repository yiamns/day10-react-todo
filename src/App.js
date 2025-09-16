import './App.css';
import {useEffect, useReducer} from "react";
import {todoReducer} from "./reducers/TodoReducer";
import {TodoContext} from "./contexts/TodoContext";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routers/BrowserRoutes";
import {useTodoService} from "./useTodoService";

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

unstableSetRender((node, container) => {
    container._reactRoot ||= createRoot(container);
    const root = container._reactRoot;
    root.render(node);
    return async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        root.unmount();
    };
});

function App() {
    const [state, dispatch] = useReducer(todoReducer, []);
    const {loadTodos} = useTodoService();
    useEffect(() => {
        loadTodos()
            .then(todos => dispatch({ type: "LOAD_TODOS", payload: todos}))
    }, [dispatch]);
    return (
        <div className="todo-container">
            <TodoContext.Provider value={{ state, dispatch }}>
                <RouterProvider router={routes} />
            </TodoContext.Provider>
        </div>
    );
}

export default App;
