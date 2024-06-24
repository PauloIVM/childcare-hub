import axios from "axios";

// TODO: Arrumar ENVs para urls de prod e dev...
export const usersApi = axios.create({
    baseURL: "http://localhost:3003"
});

export const babiesApi = axios.create({
    baseURL: "http://localhost:3001"
});
