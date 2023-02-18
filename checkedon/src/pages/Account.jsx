import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

const user = "Ethan";

function Account() {
    const [value, setValue] = useState('');

    const sendPhoneNumber = () => {
    }

    return (
        <>
            <h2>Hello {user}</h2>
            <p>Please input your phone number</p>
            <PhoneInput className='' placeholder="Enter phone number" value={value} onChange={setValue} style={{width: "250px"}} />
            <button onClick={sendPhoneNumber}>Save</button>
        </>
    );
}

export default Account;
