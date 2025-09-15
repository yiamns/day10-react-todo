export function todoReducer(state, action) {
    switch (action.type) {
        case "LOAD_TODOS":
            return action.payload;
        case "TOGGLE_TODO":
            return state.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload.id);
        case "ADD_TODO":
            return [ ...state, action.payload ];
        default:
            return state;
    }
}