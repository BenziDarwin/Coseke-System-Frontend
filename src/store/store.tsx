import { createStore, combineReducers } from "redux";
import {
  createLeaveReducer,
  dashboardReducer,
  permissionsReducer,
} from "./reducer";

const allReducers = combineReducers({
  dashboard: dashboardReducer,
  createLeave: createLeaveReducer,
  permissions: permissionsReducer,
});

const store = createStore(allReducers);

export default store;
