import axios from 'axios';

let base = 'http://192.168.1.202:8080';
let localBase = ' http://localhost:3000';

export const requestLogin = params => { return axios.post(`${base}/test`, params).then(res => res.data); };


export const setLogin = params => { return axios.get(`${localBase}/user`, params).then(res => res.data); };



