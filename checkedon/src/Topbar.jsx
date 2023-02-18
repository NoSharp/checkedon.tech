import React from "react";
import { Link } from "react-router-dom";

const user = "lmao";
const signedIn = true;

class LoginControl extends React.Component {
    render() {
        let output;
        if (signedIn) {
            output = <><p>Welcome {user}!</p><button>Your Account</button></>
        } else {
            output = <Link href="/login"><button>Sign Up!</button></Link>
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

export default Topbar