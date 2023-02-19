import React from "react";
import Cookies from 'js-cookie';
import getUserData from "./apiHandler";
import { Link } from "react-router-dom";
import "./index.css";


class LoginControl extends React.Component {
    
    state = {
        userName: null
    };

    componentDidMount(){
        getUserData().then((userName)=>{
            this.setState({
                userName: userName
            })
        });
    }
    
    render() {
        let output;
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
            const username = this.state.userName
            console.log(username);
            output = <><p>Welcome {username}!</p><Link to="/account"><button>Your Account</button></Link></>
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