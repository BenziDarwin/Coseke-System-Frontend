import axios from "axios";

export const baseUrl = "/api/v1";
// export const userURL = 'http://localhost:8082';
// export const leaveURL = "http://localhost:8080";


export const AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json"
    }
});