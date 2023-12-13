import { Box, Grid, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import FolderList from "../list";
import { useEffect, useState } from "react";
import { IApplyForLeave } from "../../models/leaveApplicationModel";
import { getAllApplications, getLeaveTypes } from "../../core/leaveApi";
import { LeaveModel } from "../../models/leaveModel";


interface stat {
  [key:string]: any
}
function UserLeaveManagement() {
  const [usersApplications, setUsersApplications] = useState<IApplyForLeave[]>([]);
  const [usersPending, setUsersPending] = useState<IApplyForLeave[]>([]);
  const [leaveStatistics, setLeaveStatistics] = useState<any[]>([]);
  const [leaveMonthData, setLeaveMonthData] = useState<number[]>(Array(12).fill( 0));
  const pData = [2, 15, 0, 3, 0, 12, 10, 20, 5, 1, 2, 21];
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    (async() => {
      const users: IApplyForLeave[] = await getAllApplications();
      let arr:IApplyForLeave[] = [];
      let dates: number[] = Array(12).fill( 0);
    users.forEach((user) => {
      if(user.stage == "Approved") {
        arr.push(user);
      }
      let num:number = new Date(user.startDate).getMonth()+1;
      dates[num] +=1;
    })
    setLeaveMonthData(dates);
    const leaveTypes:LeaveModel[] = await getLeaveTypes();
    let stat: any[] = [];
    leaveTypes.forEach((leave:LeaveModel, index:number) => {
      let count = users.filter(user => {
        return user.leave.name == leave.name;
      }).length;
      let val:any = {};
      val.label = leave.name
      .toLowerCase()
      .split(" ")
      .map(
        (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");
      val.value = count;
      val.id = index;
      stat.push(val);
    })
    setLeaveStatistics(stat);

    
    setUsersApplications(arr);
    arr = [];
    users.forEach((user) => {
      if(user.stage != "Approved" && user.stage != "Denied") {
        arr.push(user);
      }
    })
    setUsersPending(arr);
    })()
  },[])

  return (
    <Box>
      <Grid container spacing={2} marginBottom="10px">
        <Grid item xs={6}>
          <Typography variant="h4">Leave Statistics</Typography>
          <BarChart
            width={600}
            height={400}
            yAxis={[
              { id: 'linearAxis', scaleType: 'linear', min:0, max:usersApplications.length+5 },
            ]}
            series={[{ data: leaveMonthData, id: "pvId", label: "Leave per month", yAxisKey:"linearAxis" }]}
            xAxis={[{ data: xLabels, scaleType: "band"}]}
            leftAxis="linearAxis"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">Batch Types</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                data: leaveStatistics,
                cx: 200,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            width={600}
            height={400}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" marginY={"10px"}>
            Users on Leave
          </Typography>
          <FolderList list={usersApplications} stage={undefined} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" marginY={"10px"}>
            Pending Leave Requests
          </Typography>
          <FolderList list={usersPending} stage={true} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserLeaveManagement;
