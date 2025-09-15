import {Link, Outlet} from "react-router-dom";
import './layouts.css';

export function DefaultLayout() {
    return (
        <div>
            <header>
                <nav className="nav-bar">
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
