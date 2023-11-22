import { blue } from "@mui/material/colors";
import { ISelectOption } from "../components/SelectOption";

export const globalBlueColor = "#002C6D";
export const globalTextColor = blue[700];
export const accessTokenKey: string = "access-token";
export const currentUser: string = "current-user";

export const crudState: {
  write: string;
  read: string;
  update: string;
  delete: string;
} = {
  write: "write",
  read: "read",
  update: "update",
  delete: "delete",
};

export const moduleNames: {
  clinical: {
    user: string;
    patient: string;
    role: string;
  };
} = {
  clinical: {
    user: "User",
    patient: "Patient",
    role: "Role",
  },
};

export const rolesListMock: ISelectOption[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];
