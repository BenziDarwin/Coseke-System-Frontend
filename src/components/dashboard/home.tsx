import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getApproverApplications } from "../../core/leaveApi";
import { Check, Close } from "@mui/icons-material";

function Home() {
  const [rows, setRows] = useState<any[]>([])
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    {
      field: "leave",
      headerName: "Leave Type",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (val) => {
        return (
          <>
            {val.row.leave.name
              .toLowerCase()
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" ")}
          </>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: (val) => {
        const date = new Date(val.row.startDate).toDateString();
        return <>{date}</>;
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: (val) => {
        const date = new Date(val.row.endDate).toDateString();
        return <>{date}</>;
      },
    },
    {
      field: "stage",
      headerName: "Stage",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell:(val) => { return(
      <>{`${val.row.stage.charAt(0).toUpperCase()}${val.row.stage.slice(1).toLowerCase()}`}</>
      )
      }
    },
    {
      field: "Options",
      headerName: "Options",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: () => {return(
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" color="success"><Check/></Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="error"><Close/></Button>
          </Grid>
        </Grid>
      )}
        
    }
  ];

  const approver = (status:number, ) => {

  }
  useEffect(() => {
    (async () => {
      let res = await getApproverApplications();
    setRows(res)
    })()
    
  },[])
  return( 
  <Box>
    <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" fontSize={30} sx={{ fontWeight: "400" }}>
            Approve Leave
          </Typography>
        </Grid>
      </Grid>
     <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{ marginTop: "20px" }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
  </Box>
  );
}

export default Home;
