import { createStore, combineReducers } from "redux";
import { dashboardReducer } from "./reducer";


const allReducers = combineReducers({
    dashboard: dashboardReducer
})

const store = createStore(allReducers);

export default store;
