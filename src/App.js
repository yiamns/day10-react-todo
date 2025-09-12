import './App.css';
import {createContext, useContext, useReducer} from "react";

export const initState = [
    {id: 1, text: "the first todo", done: false},
    {id: 2, text: "the second todo", done: true},
];
export const TodoContext = createContext()

function TodoItem(props) {
    const {state, dispatch} = useContext(TodoContext);

    function makeAsDone() {
        dispatch({
            type: 'DONE',
            payload: {id: props.todo.id}
        })
    }

    return <div className={"todo-item"}>
        <span className={
            props.todo.done ? "todo-done" : ""}
            onClick={makeAsDone}
        >
            { props.todo.text }
        </span>
    </div>;
}

export function todoReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_TODO":
            /// copy
            const newState = [...state];
            const id = action.payload.id;
            return newState.map((value) => {
                if (value.id === id) {
                    return { id,
                        text: value.text,
                        done: !value.done
                    };
                }

                return value
            })
        default:
            return state;
    }
}

function TodoGroup() {
    const {state, dispatch} = useContext(TodoContext);
    return (
        <div>
            {
                state.map((item, index) => {
                    return <TodoItem todo={item} key={index}/>
                })
            }
        </div>
    )
}


function App() {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <div>
            <TodoContext.Provider value={{state, dispatch}}>
                <TodoGroup/>
            </TodoContext.Provider>
        </div>
    );
}

export default App;
