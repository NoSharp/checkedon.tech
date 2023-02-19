import React from 'react';

function Home() {
    return (
        <section>
            <h2>Welcome!</h2>
            <h3>What is "checkedOn"?</h3>
            <p>checkedOn is proof of concept app which allows users to form an alert group, if a natural disaster is dectected nearby one of the members of the group, the entire of the group is sent an alert. This alert can take the form of either an SMS message or an email.</p>
            <h3>Why use checkedOn?</h3>
            <p>In light of the recent natural disasters in Turkey, it is becoming clearer that natural disasters can affect any of our family and friends all round the world. Distant friends and family will only hear of tragedies from news, by then it could've been days since the tragedy had occured.</p>
            <p>checkedOn aims to elimate unnecessary worry and concern by immediately alerting loved ones only if you are in danger. If a loved one who has been in the affecting radius of a natural disaster has been reached out to and hasn't responded then local authorties can be then notified of a missing persons.</p>
            <h3>How does checkedOn work?</h3>
            <p>checkedOn uses your geolocation and the USGS natural disasters API tied together with a bit of maths to find whether your last known location is within the damaging radius of natural disasters. To sign into the application, checkedOn uses Google Sign-In Authentication. Browsers are logged into the session through the use of cookies.</p>
            <h3><b>WARNING</b></h3>
            <p>This application does use Google Sign-In to authenticate who you are, using this application gives us your GoogleID (a public token that identifies authentication), your name linked with the Gmail account, your phone number (however you can choose to enter a fake number), and your geolocation. If you do not wish for this data to be stored on our server temporarily, do <b>NOT</b> use this application.</p>
        </section>
    );
}

export default Home;