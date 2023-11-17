import Home from "../components/home"
import Leave from "../components/leave"

const initialState = {
    currentPage:<Home/>
}


export const dashboardReducer = (state:any = initialState, actions:any) => {
    switch(actions.type) {
        case "home":
            return {...state, currentPage:<Home/>};
        case "leave":
            return {...state, currentPage:<Leave/>};
        default:
            return state;
    }

}