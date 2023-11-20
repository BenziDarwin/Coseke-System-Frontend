import axios from "axios";
import { userUrl } from "./baseURLs";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${userUrl}/user/login`, {
    email: email,
    password: password,
  });
  if(response.status == 200) {
    sessionStorage.setItem("token",response.data.token);
    return response;
  } else {
    return response;
  }
  
};
