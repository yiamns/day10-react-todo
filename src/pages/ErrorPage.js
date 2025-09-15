import {useRouteError} from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    return <div>
        {error.status === 404
            ? <div><h1>404 not found</h1><span>Try</span></div>
            : <div>{JSON.stringify(error)}</div>
        }
    </div>;
}