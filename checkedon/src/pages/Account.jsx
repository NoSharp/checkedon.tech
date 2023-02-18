import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import Cookies from 'js-cookie';
import "../index.css";
import 'react-phone-number-input/style.css'

const user = "Ethan";

function Account() {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        window.location.replace("#/login");
    }

    const [value, setValue] = useState('');
    
    const sendPhoneNumber = () => {
        console.log(value);
        console.log(value)
    }

    return (
        <section>
            <h2>Hello {user}</h2>
            <p>Please input your phone number</p>
            <PhoneInput className='' placeholder="Enter phone number" value={value} onChange={setValue} style={{width: "250px"}} />
            <button onClick={sendPhoneNumber}>Save</button>
        </section>
    );
}

export default Account;
