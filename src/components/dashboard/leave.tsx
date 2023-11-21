import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { applyForLeave, getAllApplications, getLeaveTypes } from "../../core/leaveApi";

function Leave() {
  const [open, setOpen] = React.useState(false);
  const [leaveTypes, setLeaveTypes] = React.useState<any[]>([]);
  const [notification, setNotification] = React.useState<{
    serverity: AlertColor;
    open: boolean;
    message: string;
  }>({ serverity: "success", open: false, message: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState<any[]>([]);

  const handleNotification = () => {
    setNotification({ serverity: "success", open: false, message: "" });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    {
      field: "leaveType",
      headerName: "Leave Type",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: (val) => {
        const date = new Date(val.row.startDate).toUTCString();
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
        const date = new Date(val.row.endDate).toUTCString();
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
    },
  ];

  const validationSchema = object({
    addressLeavePeriod: string().min(1, "Field is required!"),
    start: string()
      .min(1, "Field is required!")
      .refine((val) => {
        var start = new Date(val);
        return start > new Date();
      }, "Date must be greater than today!"),
    end: string().min(1, "Field is required!"),
    leave: string().min(1, "Field is required!"),
    reason: string().min(1, "Field is required!"),
  });

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    if (new Date(values.start) >= new Date(values.end)) {
      setNotification({
        serverity: "error",
        open: true,
        message: "End date has to be later than start date!",
      });
      return;
    }
    let res = await applyForLeave({...values})
    if(res.status == 200) {
      setNotification({
        serverity: "success",
        open: true,
        message: "Your Leave has been submitted successfully!",
      });
    } else {
      setNotification({
        serverity: "error",
        open: true,
        message: res.data,
      });
    }
    setNotification({
      serverity: "success",
      open: true,
      message: "Your Leave has been submitted successfully!",
    });
    handleClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    ( async() => {
      const arr: any = await getLeaveTypes();
      const transformedArray: { value: string; label: string }[] = arr.map((val:any) => ({
        value: val.name.toLowerCase().replace(/\s+/g, ' '),
        label: val.name.toLowerCase().split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }));
      let leaveApplications = await getAllApplications();
      console.log(leaveApplications)
      setRows(leaveApplications)

      setLeaveTypes(transformedArray)
    })() 
       
  },[])

  return (
    <Box>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" fontSize={30} sx={{ fontWeight: "400" }}>
            Leave Application
          </Typography>
        </Grid>
        <Grid xs={2}>
          <Button onClick={handleOpen} variant="contained">
            Apply for leave
          </Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          onSubmit={handleSubmit(onSubmitHandler)}
          maxWidth="sm"
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputLabel sx={{ marginTop: "10px" }}>Leave Type</InputLabel>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <Select
                      label="Leave Type"
                      id="leaveType"
                      error={!!errors["leave"]?.message}
                      {...register("leave")}
                    >
                      {leaveTypes && leaveTypes.map((leave) => {
                        return(
                          <MenuItem value={leave.value}>{leave.label}</MenuItem>
                        )
                      })}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {errors["leave"] ? errors["leave"].message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <InputLabel sx={{ marginTop: "10px" }}>
                Address during leave period
              </InputLabel>
              <TextField
                fullWidth
                label="Address during leave period"
                margin="normal"
                variant="outlined"
                placeholder="Enter the address you will be leaving to..."
                error={!!errors["addressLeavePeriod"]}
                helperText={errors["addressLeavePeriod"] ? errors["addressLeavePeriod"].message : ""}
                {...register("addressLeavePeriod")}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel sx={{ marginTop: "10px" }}>Start Date</InputLabel>
              <TextField
                fullWidth
                type="datetime-local"
                margin="normal"
                variant="outlined"
                error={!!errors["start"]}
                helperText={
                  errors["start"] ? errors["start"].message : ""
                }
                {...register("start")}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel sx={{ marginTop: "10px" }}>End Date</InputLabel>
              <TextField
                fullWidth
                type="datetime-local"
                margin="normal"
                variant="outlined"
                error={!!errors["end"]}
                helperText={errors["end"] ? errors["end"].message : ""}
                {...register("end")}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ marginTop: "10px" }}>Reason</InputLabel>
              <TextField
                fullWidth
                label="Reason"
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                error={!!errors["reason"]}
                helperText={errors["reason"] ? errors["reason"].message : ""}
                {...register("reason")}
              />
              <Grid container spacing={2} marginTop={"20px"}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotification}
      >
        <Alert
          onClose={handleNotification}
          severity={notification.serverity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Leave;
