import {Link, Outlet} from "react-router-dom";
import './layouts.css';

export function DefaultLayout() {
    return (
        <div>
            <header>
                <ul>
                    <nav className="nav-bar">
                        <li><Link to="/" style={{marginRight: 16}}>Home</Link></li>
                        <li><Link to="/done" style={{marginRight: 16}}>Done List</Link></li>
                        <li><Link to="/about">About us</Link></li>
                    </nav>
                </ul>

            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}
export default DefaultLayout;