import React from "react";
import FolderList from "../list";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

const lt = [
  {
    name: "Ssali Benjamin",
    leave: "Sick Leave",
    dateBack: new Date().toDateString(),
  },
  {
    name: "Odong Sunday",
    leave: "Annual Leave",
    dateBack: new Date().toDateString(),
  },
  {
    name: "Kiiza Justus",
    leave: "Paternity Leave",
    dateBack: new Date().toDateString(),
  },
  {
    name: "Otim Tom",
    leave: "Sick Leave",
    dateBack: new Date().toDateString(),
  },
];

const leaves = [
  { name: "Maternity leave", daysAvailable: 60, daysUsed: 0 },
  { name: "Sick leave", daysAvailable: 4, daysUsed: 16 },
  { name: "Annual leave", daysAvailable: 21, daysUsed: 4 },
];

function UserDashboard() {
  
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
        {leaves.map((leave: any) => {
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
                  {leave.name}
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
                      Days Left: {`${leave.daysAvailable}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        size={80}
                        value={Math.round(
                          (leave.daysUsed /
                            (leave.daysAvailable + leave.daysUsed)) *
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
                            leave.daysAvailable + leave.daysUsed
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
                        32
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
                        6
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
                        10
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
                        16
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
          <FolderList list={lt} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDashboard;
