import React from 'react';

function About() {
    return (
        <section>
            <h2>How we built this</h2>
            <p>We used a collection of technolgies to bring this idea together. For frontend, we used the React framework, for flexible component usage and so we could use Node.js. We used the node package Axios to handle communications from client to our API. To log in users we used Google's Authentication to sign-in and save data back to the database, when the user would login using Google Sign-In, they would be redirected from our server back to the main page with their authentication token inside their cookies, so as long as the browser held that cookie or the server would end that authentication session, they would be signed in.</p>
            <p>To find out whether a user was close enough to a natural disaster to trigger an alert, we used a combination of Geolocation and the <a href='https://github.com/NoSharp/checkedon.tech/blob/main/api/mysql_funcs/latdist.sql'>Haversine Function</a> to find the distance between two points on the earth given the longitude and latitude. To send an SMS alert, we used Twilio to generate the text message, and it was very effective. To handle the database and backend functionality, we used Nginx for the webserver, Domains.com for the domain. We attempted to use Github Pages to start with but found host the server ourselves would give us more control over background processes.</p>
            <p>We used Prisma and Express for our API, MySql for our DBMS, and TypeScript. When committing to our Github respository we ensured that we used Conventional Commits to allow version control to be easily maintained.</p>
            <p>The two of us, Ethan and Harry, built this for HackSussex 2023. We hope you enjoy this very low quality proof of concept.</p>
        </section>
    );
}

export default About;