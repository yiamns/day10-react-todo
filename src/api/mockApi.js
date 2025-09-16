import axios from "axios";
import {message} from "antd";

const api = axios.create({
    baseURL: "https://68c7acb55d8d9f5147328928.mockapi.io/",
    headers: {"Content-Type": "application/json"},
    timeout: 10_000
});

api.interceptors.response.use(
    (response) => {
        // handle response
        return response;
    },
    (error) => {
        // handle response error
        const {status, data} = error.response;
        if (status === 404) {
            message.error(error.message, 10_1000).then(r => {});
        }
        return Promise.reject(error);
    }
);

export {api};