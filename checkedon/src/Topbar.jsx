import React from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import "./index.css";

const user = "lmao";

class LoginControl extends React.Component {
    render() {
        let output;
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
            output = <><p>Welcome {user}!</p><Link to="/account"><button>Your Account</button></Link></>
        } else {
            output = <Link to="/login"><button>Sign Up!</button></Link>
        }

        return (
            <div style={{display: "flex", flexDirection: "row", flexGrow: "1", alignSelf: "center"}}>
                {output}
            </div>
        )
    }
}



function Topbar() {
    return (
        <div>
            <h1>CheckedOn</h1>
            <LoginControl />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/setup">Setup</Link>
                <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Topbar;