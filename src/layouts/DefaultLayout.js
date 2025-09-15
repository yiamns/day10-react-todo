import {Link, Outlet} from "react-router-dom";

export function DefaultLayout() {
    return (
        <div>
            <header>
                <nav style={{
                    marginBottom: 24,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                }}>
                    <Link to="/" style={{marginRight: 16}}>Home</Link>
                    <Link to="/done" style={{marginRight: 16}}>Done List</Link>
                    <Link to="/about">About us</Link>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}
