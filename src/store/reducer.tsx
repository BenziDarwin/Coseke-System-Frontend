import CreateLeave from "../components/dashboard/createLeave";
import Home from "../components/dashboard/home";
import HumanResource from "../components/dashboard/humanResource";
import Leave from "../components/dashboard/leave";
import Roles from "../pages/roles";
import User from "../pages/users";

const initialState = {
  currentPage: <Home />,
};

export const dashboardReducer = (state: any = initialState, actions: any) => {
  switch (actions.type) {
    case "home":
      return { ...state, currentPage: <Home /> };
    case "leave":
      return { ...state, currentPage: <Leave /> };
    case "create-leave":
      return { ...state, currentPage: <CreateLeave /> };
    case "hr":
      return { ...state, currentPage: <HumanResource /> };
    case "roles":
      return { ...state, currentPage: <Roles /> };
    case "user":
      return { ...state, currentPage: <User /> };
    default:
      return state;
  }
};

const leaveInitState = {
  approvers: [],
};

export const createLeaveReducer = (
  state: any = leaveInitState,
  action: any,
) => {
  switch (action.type) {
    case "SET_APPROVERS":
      return { ...state, approvers: action.payload };
    default:
      return state;
  }
};

interface InitialPermState {
  value: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
}

const initialPermState: InitialPermState = {
  value: {},
};

export const permissionsReducer = (state = initialPermState, action: any) => {
  switch (action.type) {
    case "SET_PERMISSIONS":
      return {
        ...state,
        value: {
          ...state.value,
          [action.payload.role]: action.payload.permissions,
        },
      };

    case "UPDATE_PERMISSIONS":
      return {
        ...state,
        value: {
          ...state.value,
          [action.payload.role]: {
            ...state.value[action.payload.role],
            [action.payload.action]:
              !state.value[action.payload.role][action.payload.action],
          },
        },
      };
    default:
      return state;
  }
};
