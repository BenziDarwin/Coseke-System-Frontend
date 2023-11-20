import CreateLeave from "../components/dashboard/createLeave";
import Home from "../components/dashboard/home";
import HumanResource from "../components/dashboard/humanResource";
import Leave from "../components/dashboard/leave";

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
    default:
      return state;
  }
};

const leaveInitState = {
    approvers:[]
}

export const createLeaveReducer = (state:any=leaveInitState, action:any ) => {
    switch (action.type) {
        case "SET_APPROVERS":
            return{...state, approvers: action.payload}
        default:
            return state;
    }
}