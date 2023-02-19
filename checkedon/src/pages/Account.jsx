import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import Cookies from 'js-cookie';
import getUserData from "../apiHandler";
import "../index.css";
import 'react-phone-number-input/style.css'

class HelloName extends React.Component {
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

    render () {
        const username = this.state.userName;
        const splitUsername = username.split(/[ ,]+/);
        return (
            <h2>Hello {splitUsername[0]}!</h2>
        )
    }
}

function Account() {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        window.location.replace("#/login");
    }

    const [value, setValue] = useState('');
    
    const sendPhoneNumber = () => {
        console.log(value);
    }

    return (
        <section>
            <HelloName />
            <p>Please input your phone number</p>
            <PhoneInput className='' placeholder="Enter phone number" value={value} onChange={setValue} style={{width: "250px"}} />
            <button onClick={sendPhoneNumber}>Save</button>
        </section>
    );
}

export default Account;
