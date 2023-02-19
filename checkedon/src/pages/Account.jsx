import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import Cookies from 'js-cookie';
import getUserData, { getPhoneNumber, addPhoneNumber, setUserLocation } from "../apiHandler";
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
        if (username == null) {
            return (
                <></>
            )
        }
        const splitUsername = username.split(/[ ,]+/);
        return (
            <h2>Hello {splitUsername[0]}!</h2>
        )
    }
}

class DisplayPhoneNumber extends React.Component {
    state = {
        phoneNum: 0
    }

    componentDidMount(){
        getPhoneNumber().then((phoneNumber)=>{
            this.setState({
                phoneNum: phoneNumber
            })
        });
    }

    render() {
        const phoneNum = this.state.phoneNum;
        return (
            <h3>Your phone number: {phoneNum}</h3>
        )
    }
}

class LocationRequest extends React.Component {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos)=>{
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            setUserLocation(lon, lat);
        },
        (err)=>{
            console.log("no pos");
        })
    }

    render() {
        return <></>
    }
}

function Account() {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
        window.location.replace("#/login");
    }

    const [value, setValue] = useState('');

    const sendPhoneNumber = () => {
        addPhoneNumber(value);
    }

    return (
        <section>
            <LocationRequest />
            <HelloName />
            <DisplayPhoneNumber />
            <p>Your phonenumber:</p>
            <PhoneInput className='' placeholder="Enter phone number" value={value} onChange={setValue} style={{width: "250px"}} />
            <button onClick={sendPhoneNumber}>Save</button>
        </section>
    );
}

export default Account;
