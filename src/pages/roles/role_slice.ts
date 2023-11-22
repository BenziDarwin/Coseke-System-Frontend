import { createSlice } from "@reduxjs/toolkit";
import { IRole } from "./interface";

export interface IRoleState {
  roles: IRole[];
}

const initialState: IRoleState = { roles: [] };

export const rolesSlice: any = createSlice({
  name: "roles",
  initialState,
  reducers: {
    rolesLoaded: (state, action) => {
      state.roles = action.payload.roles;
    },
    roleAdded: (state, action) => {
      const result = [...state.roles, action.payload];
      state.roles = result;
    },
    roleEdited: (state, action) => {
      state.roles = state.roles.map((role) =>
        role?.id === action.payload.id ? action.payload : role,
      );
    },
    roleDeleted: (state, action) => {
      state.roles = state.roles.filter(
        (role) => role?.id !== action.payload.id,
      );
    },
  },
});

export const { rolesLoaded, roleAdded, roleEdited, roleDeleted } =
  rolesSlice.actions;

export default rolesSlice.reducer;
