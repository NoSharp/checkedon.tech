import React from "react";
import { Link } from "react-router-dom";

const user = "lol";

function Topbar() {
    return (
        <div>
            <h1>CheckedOn</h1>
            <p>Welcome {user}</p>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/setup">Setup</Link>
                <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Topbar