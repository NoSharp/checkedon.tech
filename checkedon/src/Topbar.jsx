import React from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import "./index.css";


class LoginControl extends React.Component {    
    render() {
        let output;
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
            output = <Link to="/account">Your Account</Link>
        } else {
            output = <Link to="/login">Sign-In</Link>
        }

        return (
            <>
                {output}
            </>
        )
    }
}

function Topbar() {
    return (
        <div className="topbar">
            <h1>>checkedOn_</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/setup">Setup</Link>
                <LoginControl />
                <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Topbar;