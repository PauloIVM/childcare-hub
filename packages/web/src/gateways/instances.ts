import axios from "axios";

// TODO: Arrumar ENVs para urls de prod e dev...
export const userApi = axios.create({
    baseURL: "http://107.22.132.248:3003/user"
});

export const babyRecordApi = axios.create({
    baseURL: "http://3.83.152.25:3001/baby-record"
});

export const babyApi = axios.create({
    baseURL: "http://3.83.152.25:3001/baby"
});
