import axios from "axios";
import { accessTokenKey } from "../../data/constants";
import { IUser } from "./interface";
import { userUrl } from "../../core/baseURLs";


export const fetchUsers = async () => {
    const customHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(accessTokenKey)}`,
        'Access-Control-Allow-Origin':"http://localhost:3000"
    };

    try {
        const response = await axios.get(
            `${userUrl}/user/get-users`,
            { headers: customHeaders }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}