import axios from "axios";
import { AxiosUserInstance, userUrl } from "./baseURLs";
import { IUser } from "../pages/users/interface";

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
  if (response.status == 200) {
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } else {
    return response;
  }
};

export const getRoles = async () => {
  console.log(sessionStorage.getItem("token"));
  let response = await AxiosUserInstance.get(`${userUrl}/roles/get-roles`);
  return response.data;
};

export const updatePermissions = async (role: any) => {
  let response = await AxiosUserInstance.post(
    `${userUrl}/roles/update-permissions`,
    JSON.stringify(role),
  );
  return response.data;
};

export const createRole = async (role: any) => {
  let response = await AxiosUserInstance.post(
    `${userUrl}/roles/add-role`,
    JSON.stringify(role),
  );
  return response.data;
};

export const deleteRole = async (role: any) => {
  let response = await AxiosUserInstance.post(
    `${userUrl}/roles/delete-role`,
    JSON.stringify(role),
  );
  return response.data;
};


export const getUsers = async () => {
  let response = await AxiosUserInstance.get (
    `${userUrl}/user/get-users`,

  )
  return response.data;
}

export const addUser = async (user: IUser) => {

  const customHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
  };

  try {
      const response = await axios.post(
          `${userUrl}/user/user-register`,
          { ...user },
          { headers: customHeaders }
      );
      return response.data;
  } catch (error) {
      console.log(error);
  }
};
