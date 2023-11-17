import axios from "axios";
import { AxiosInstance, baseUrl } from "./baseURLs"


export const login = async ({email, password}:{email:string;password:string}) => {
    const response = await axios.post(`${baseUrl}/user/login`,{email:email, password:password})
    console.log(response);
}