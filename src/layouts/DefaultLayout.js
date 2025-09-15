import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export function DefaultLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
