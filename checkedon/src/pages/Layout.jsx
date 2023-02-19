import React from "react";
import {Outlet} from "react-router-dom";
import Topbar from "../Topbar";


const Layout = () => {
    return (
        <main>
            <Topbar />
            <Outlet />
        </main>
    );
};

export default Layout;