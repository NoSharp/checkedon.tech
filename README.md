# checkedon.tech
Created by: Ethan Egerton and Harry Kerr

https://CheckedOn.tech

This website is developed to notify family members when a person may be affected by a near by earthquake or natural disaster.

We developed this site in 24 hours as part of the HackSussex 2023 Hackathon.

## Front end:
We've developed the front end of this CSR(Client Side Rendered) Application in react allowing for flexible component usage.

## Auth:
We use Google's OAuth login for user account management, we then utilise JWT's for cookies that are then validated on each API request.

## Data:
We utilise MySQL to store persistent data via Prisma's DBMS Agnostic interface. We have implemented a function that calculates the distance between two points (Longitudinal and Latitudinal).

## API Design:
We've developed a REST API in Express with PassportJs to handle authentication flow, the API routes attempt to be expressive in nature leaving no route ambiguous.

## MicroServices:
### Alerter:
Our notification runtime which polls the USGS API to discover new natural disasters to report on then uses that data to query our database. Using our distance function, mentioned in the Data section, this provides an efficient method to find affected users and notify applicable users. 
