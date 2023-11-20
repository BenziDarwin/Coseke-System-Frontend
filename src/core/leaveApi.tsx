import { ApplyLeaveModel } from "../models/applyLeaveModel";
import { LeaveModel } from "../models/leaveModel";
import { AxiosInstance, leaveUrl } from "./baseURLs"


export const getLeaveTypes =async () =>  {
    const response = await AxiosInstance.get(`${leaveUrl}/leave/get-leave`);
    return response.data;
}

export const addLeaveType = async(leaveType: LeaveModel) => {
    const response = await AxiosInstance
    .post(`${leaveUrl}/leave/add-leave`,
    JSON.stringify(leaveType),{
        headers: {
            "Content-Type": "application/json",
        }    
    });
    if(response.status == 200) {
        console.log("Success!");
        return response;
    } else {
        return response;
    }
}

export const deleteLeaveType = async (id:number) => {
    const response = await AxiosInstance
    .post(`${leaveUrl}/leave/remove-leave/${id}`);
    if(response.status == 200) {
        console.log("Success!");
        return response;
    } else {
        return response;
    }
}

export const applyForLeave = async (apply:ApplyLeaveModel) => {
    const response = await AxiosInstance
    .post(`${leaveUrl}/apply-leave/apply`,
    JSON.stringify(apply),{
        headers: {
            "Content-Type": "application/json",
        }    
    });
    if(response.status == 200) {
        console.log("Success!");
        return response;
    } else {
        return response;
    }

}