import React from 'react';
import "../index.css";


function Login() {
    return (
        <section>
            <h2>Login</h2>
            <p>Please login using Google</p>
            <a target="_blank" rel='noreferrer' href="https://api.checkedon.tech/auth/method/google"><button className='login-button'>Log in with google</button></a>
        </section>
    );
}

export default Login;