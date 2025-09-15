import axios from "axios";

export const api = axios.create({
    baseURL: "https://68c7acb55d8d9f5147328928.mockapi.io/",
    headers: {"Content-Type": "application/json"},
    timeout: 10_000
});