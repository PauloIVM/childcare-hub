import axios from "axios";

// TODO: Arrumar ENVs para urls de prod e dev...
export const authApi = axios.create({
    baseURL: "http://localhost:3001/api/auth"
});

export const babyRecordApi = axios.create({
    baseURL: "http://localhost:3001/api/baby-record"
});
