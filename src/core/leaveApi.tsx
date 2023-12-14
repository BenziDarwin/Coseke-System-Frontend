import { ApproveLeave } from "../models/ApproveLeaveModel";
import { ApplyLeaveModel } from "../models/applyLeaveModel";
import { LeaveModel } from "../models/leaveModel";
import { AxiosInstance, leaveUrl } from "./baseURLs";

export const getLeaveTypes = async () => {
  const response = await AxiosInstance.get(`${leaveUrl}/leave/get-leave`);
  return response.data;
};

export const addLeaveType = async (leaveType: LeaveModel) => {
  const response = await AxiosInstance.post(
    `${leaveUrl}/leave/add-leave`,
    JSON.stringify(leaveType),
  );
  if (response.status == 200) {
    console.log("Success!");
    return response;
  } else {
    return response;
  }
};

export const deleteLeaveType = async (id: number) => {
  const response = await AxiosInstance.post(
    `${leaveUrl}/leave/remove-leave/${id}`,
  );
  if (response.status == 200) {
    console.log("Success!");
    return response;
  } else {
    return response;
  }
};

export const applyForLeave = async (apply: ApplyLeaveModel) => {
  const response = await AxiosInstance.post(
    `${leaveUrl}/apply-leave/apply`,
    JSON.stringify(apply),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (response.status == 200) {
    console.log("Success!");
    return response;
  } else {
    return response;
  }
};

export const getAllUserApplications = async () => {
  var response:any;
  try {
    response = await AxiosInstance.get(`${leaveUrl}/apply-leave/get-user-all`);
    if (response.status == 200) {
      console.log("Success!");
      return response.data;
    } else {
      return response;
    }
  } catch (e) {
    return response
  }
};

export const getAllApplications = async () => {
  let response:any;
  try {
    response = await AxiosInstance.get(`${leaveUrl}/apply-leave/get-all`)
    if (response.status == 200) {
      console.log("Success!");
      return response.data;
    } else {
      return response;
    }
  } catch (e) {
    return response
  }
  
}

export const getLeaveDays = async () => {
 let response:any;
  try {
    response = await AxiosInstance.post(`${leaveUrl}/tracker/leave-days`,JSON.stringify({email:JSON.parse(sessionStorage.getItem("user") || "")?.email}))
    if (response.status == 200) {
      console.log("Success!");
      return response.data;
    } else {
      return response;
    }
  } catch (e) {
    return response
  }
}

export const getApproverApplications = async () => {
  const response = await AxiosInstance.get(
    `${leaveUrl}/apply-leave/approver-applications`,
  );
  if (response.status == 200) {
    console.log("Success!");
    return response.data;
  } else {
    return response;
  }
};

export const approveLeave = async (approve: ApproveLeave) => {
  const response = await AxiosInstance.post(
    `${leaveUrl}/apply-leave/approve`,
    JSON.stringify(approve),
  );
  if (response.status == 200) {
    console.log("Success!");
    return response.data;
  } else {
    return response;
  }
};

export const handleIssue = async (issue: any) => {
  const response = await AxiosInstance.post(
    `${leaveUrl}/apply-leave/handle-issue`,
    JSON.stringify(issue),
  );
  if (response.status == 200) {
    console.log("Success!");
    return response.data;
  } else {
    return response;
  }
};
