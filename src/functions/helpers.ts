import { ISelectOption } from "../components/SelectOption";
import { IRole } from "../pages/roles/interface";
import { IUser } from "../pages/users/interface";

export const formatResponseList = (list: Array<IRole>): ISelectOption[] => {
  const formatedData = list?.map((role) => ({
    value: role.roleName.toLowerCase(),
    label: capitalizeFirstLetter(role.roleName.toLowerCase()),
  }));

  return formatedData;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const filterUsersByString = (
  data: IUser[],
  searchString: string,
): IUser[] => {
  const normalizedSearch = searchString.toLowerCase().trim();

  return data.filter((patient) =>
    Object.values(patient).some((value) =>
      String(value).toLowerCase().includes(normalizedSearch),
    ),
  );
};
