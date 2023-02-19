import axios from 'axios';

const longitude = 0.8123;
const latitude = 0.6963;
const instance = axios.create({withCredentials:true});


export default async function getUserData() {
    const response = await instance.get(`https://checkedon.tech/api/`);
    const { data: { userName } } = response;
    console.log(userName);
    return userName;
}

export async function setUserLocation(_longitude, _latitude) {
    await instance.put(`https://checkedon.tech/api/user/location/testLocation`);
    return await instance.put(`https://checkedon.tech/api/user/location/testLocation`, {longitude : `${longitude}`, latitude :`${latitude}`});
}

export async function getUserLocation() {
    return await instance.get(`https://checkedon.tech/api/user/location/testLocation`);
}

export async function delet() {
    return await instance.get(`https://checkedon.tech/api/user/location/testLocation`);
}