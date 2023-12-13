import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllApplications, getAllUserApplications, getLeaveDays } from "../../core/leaveApi";
import { IApplyForLeave } from "../../models/leaveApplicationModel";
import FolderList from "../list";


function UserDashboard() {
  const [usersOnLeave, setUsersOnLeave] = useState<IApplyForLeave[]>([]);
  const [leaveDays, setLeaveDays] = useState<any[]>([]);
  const [status, setStatus] = useState<{completed:number; pending:number; denied:number; total:number}>({completed:0, pending:0, denied:0, total:0});
  useEffect(() => {
    (async() =>{
      const users: IApplyForLeave[] = await getAllApplications();
      let arr:IApplyForLeave[] = [];
    users.forEach((user) => {
      if(user.stage == "Approved") {
        arr.push(user);
      }
    })
    const days = await getLeaveDays();
    let arr2:any[] = [];
    days.leave.forEach((leave:any) => {
      if(days[leave.name]) {
          let obj = {name:leave.name, daysUsed: (leave.duration - days[leave.name]), daysLeft: days[leave.name]};
          arr2.push(obj);
      }
    })

    const userApps:IApplyForLeave[] = await getAllUserApplications();
    let pending:number = userApps.filter(application => {
      return application.stage != "Denied" && application.stage !="Approved";
    }).length;
    let completed:number = userApps.filter(application => {
      return application.stage == "Approved";
    }).length;
    let denied:number = userApps.filter(application => {
      return application.stage == "Denied"
    }).length;
    setStatus({pending:pending, completed:completed, denied:denied, total:userApps.length})
    setLeaveDays(arr2);
    setUsersOnLeave(arr);

    })()
  },[])
  return (
    <Box component={"div"}>
      <Box
        component={"div"}
        sx={{
          overflowX: "auto",
          height: 200,
          maxWidth: "80vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {leaveDays.map((leave: any) => {
          return (
            <Card
              sx={{
                minWidth: 250, // Increase the width as desired
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
                display: "flex",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ marginY: "5px", textAlign: "center" }}
                >
                  
                  {leave.name
              .toLowerCase()
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" ")}
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  flexDirection="row"
                  justifyItems="center"
                  spacing={2}
                >
                  <Grid item xs={7}>
                    <Typography>Days Used: {`${leave.daysUsed}`}</Typography>
                    <Typography>
                      Days Left: {`${leave.daysLeft}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        size={80}
                        value={Math.round(
                          (leave.daysUsed /
                            (leave.daysLeft + leave.daysUsed)) *
                            100,
                        )}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color={"darkblue"}
                        >
                          {`${leave.daysUsed} / ${
                            leave.daysLeft + leave.daysUsed
                          }`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} marginY={2}>
          <Grid container marginY={2}>
            <Grid item xs={6}>
              <Card sx={{ height: 120, width: "90%" }}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    flexDirection="row"
                    justifyItems="center"
                  >
                    <Grid item xs={4}>
                      <Typography color={"darkblue"} variant="h3">
                        {status.total}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h5">Total</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: 120, width: "90%" }}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    flexDirection="row"
                    justifyItems="center"
                  >
                    <Grid item xs={4}>
                      <Typography color={"darkblue"} variant="h3">
                        {status.pending}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h5">Pending</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container marginY={2}>
            <Grid item xs={6}>
              <Card sx={{ height: 120, width: "90%" }}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    flexDirection="row"
                    justifyItems="center"
                  >
                    <Grid item xs={4}>
                      <Typography color={"darkblue"} variant="h3">
                        {status.denied}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h5">Denied</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: 120, width: "90%" }}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    flexDirection="row"
                    justifyItems="center"
                  >
                    <Grid item xs={4}>
                      <Typography color={"darkblue"} variant="h3">
                        {status.completed}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h5">Approved</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" marginY={"10px"}>
            Users on Leave
          </Typography>
          <FolderList list={usersOnLeave} stage={undefined} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDashboard;
