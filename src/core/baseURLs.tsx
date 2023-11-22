import axios from "axios";

export const userUrl = "/api/v1";
export const leaveUrl = "http://localhost:8080/api/v2";
// export const userURL = 'http://localhost:8082';
// export const leaveURL = "http://localhost:8080";

export const AxiosInstance = axios.create({
  headers: {
    Authorization: `${sessionStorage.getItem("token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const AxiosUserInstance = axios.create({
  
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
