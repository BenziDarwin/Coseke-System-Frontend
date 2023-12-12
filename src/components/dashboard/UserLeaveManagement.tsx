import { Box, Grid, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import FolderList from "../list";

function UserLeaveManagement() {
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
  return (
    <Box>
      <Grid container spacing={2} marginBottom="10px">
        <Grid item xs={6}>
          <Typography variant="h4">Leave Statistics</Typography>
          <BarChart
            width={600}
            height={400}
            series={[{ data: pData, id: "pvId", label: "Leave per month" }]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">Batch Types</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                data: [
                  { id: 0, value: 10, label: "Sick Leave" },
                  { id: 1, value: 15, label: "Maternity Leave" },
                  { id: 2, value: 20, label: "Annual Leave" },
                ],
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
          <FolderList list={lt} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" marginY={"10px"}>
            Pending Leave Requests
          </Typography>
          <FolderList list={lt} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserLeaveManagement;
