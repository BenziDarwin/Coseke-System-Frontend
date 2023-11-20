import { createStore, combineReducers } from "redux";
import { createLeaveReducer, dashboardReducer } from "./reducer";

const allReducers = combineReducers({
  dashboard: dashboardReducer,
  createLeave: createLeaveReducer
});

const store = createStore(allReducers);

export default store;
