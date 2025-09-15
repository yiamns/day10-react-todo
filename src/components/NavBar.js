import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav style={{ marginBottom: 24, textAlign: "center" }}>
            <Link to="/" style={{ marginRight: 16 }}>All Todos</Link>
            <Link to="/done">Done List</Link>
        </nav>
    );
}
