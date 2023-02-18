import React from "react";
import {Outlet} from "react-router-dom";
import Topbar from "../Topbar";

const Layout = () => {
    return (
        <>
            <Topbar />
            <Outlet />
        </>
    );
};

export default Layout;