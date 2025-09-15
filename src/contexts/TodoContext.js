import {createContext} from "react";

export const initState = [
    {id: 1, text: "Learn React", done: true},
    {id: 2, text: "Learn Redux", done: false},
    {id: 3, text: "Build something fun!", done: false}
];
export const TodoContext = createContext();