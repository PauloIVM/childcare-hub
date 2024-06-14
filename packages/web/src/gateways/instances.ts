import axios from "axios";

// TODO: Arrumar ENVs para urls de prod e dev...
export const userApi = axios.create({
    baseURL: "http://localhost:3003/user"
});

export const babyRecordApi = axios.create({
    baseURL: "http://localhost:3001/baby-record"
});

export const babyApi = axios.create({
    baseURL: "http://localhost:3001/baby"
});
