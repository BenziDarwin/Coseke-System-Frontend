import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import {
  applyForLeave,
  getAllUserApplications,
  getLeaveTypes,
  handleIssue,
} from "../../core/leaveApi";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { DataGridStyled } from "../tables";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

interface ICustomGridToolBar {
  data: any[];
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomGridToolBar = ({ handleFilter, data }: ICustomGridToolBar) => {
  return (
    <GridToolbarContainer sx={{ width: "100%", display: "flex", p: "20px" }}>
      <TextField
        onChange={(e: any) => handleFilter(e)}
        size="small"
        placeholder="Filter.."
        sx={{
          padding: "1px 10px 1px 1px",
          borderRadius: "6px",
          width: "360px",
        }}
        InputProps={{
          startAdornment: (
            <SearchIcon color="primary" sx={{ mr: "10px" }} fontSize="small" />
          ),
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
            ></IconButton>
          ),
        }}
      />
      <GridToolbarExport
        sx={{
          backgroundColor: grey[50],
          height: "40px",
          mr: "10px",
          px: "10px",
          color: "black",
          border: "1px solid black",
        }}
      />
      <GridPagination
        sx={{
          marginLeft: "auto",
        }}
      />
    </GridToolbarContainer>
  );
};

function Leave() {
  const [open, setOpen] = React.useState(false);
  const [leaveTypes, setLeaveTypes] = React.useState<any[]>([]);
  const [data, setData] = React.useState<any>();
  const [form, setForm] = React.useState<string>("apply");
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState<{
    serverity: AlertColor;
    open: boolean;
    message: string;
  }>({ serverity: "success", open: false, message: "" });
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState<any[]>([]);

  const handleNotification = () => {
    setNotification({ serverity: "success", open: false, message: "" });
  };

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
      renderCell: (val) => {
        return (
          <>{`${val.row?.stage.charAt(0).toUpperCase()}${val.row?.stage
            .slice(1)
            .toLowerCase()}`}</>
        );
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: (val) => {
        return (
          <>
            <Button
              size="small"
              disabled={val.row.stage == "Issue Raised!" ? false : true}
              onClick={() => {
                openHandler(true, "form", val.row);
                console.log(data);
              }}
              variant="contained"
              color="primary"
            >
              <Edit />
            </Button>
          </>
        );
      },
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
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    if (new Date(values.start) >= new Date(values.end)) {
      setNotification({
        serverity: "error",
        open: true,
        message: "End date has to be later than start date!",
      });
      return;
    }
    let res = await applyForLeave({ ...values });
    if (res.status == 200) {
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
    navigate(0);
    handleClose();
  };

  const onEditHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    if (new Date(values.start) >= new Date(values.end)) {
      setNotification({
        serverity: "error",
        open: true,
        message: "End date has to be later than start date!",
      });
      return;
    }
    let res = await handleIssue(values);
    if (res.status == 200) {
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
    (async () => {
      const arr: any = await getLeaveTypes();
      const transformedArray: { value: string; label: string }[] = arr.map(
        (val: any) => ({
          value: val.name.toLowerCase().replace(/\s+/g, " "),
          label: val.name
            .toLowerCase()
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }),
      );
      let leaveApplications = await getAllUserApplications();
      console.log(leaveApplications);
      setRows(leaveApplications);

      setLeaveTypes(transformedArray);
    })();
  }, [data]);

  const openHandler = (open: boolean, form: string, data?: any) => {
    reset();
    setOpen(open);
    setForm(form);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" fontSize={30} sx={{ fontWeight: "400" }}>
            Leave Application
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => openHandler(true, "apply")}
            variant="contained"
          >
            Apply for leave
          </Button>
        </Grid>
      </Grid>
      <DataGridStyled
        {...rows}
        autoHeight
        rows={rows || []}
        columns={columns}
        slots={{
          footer: (props: any) => (
            <CustomGridToolBar
              data={rows}
              {...props}
              handleFilter={() => null}
            />
          ),
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {form == "apply" ? (
          <Box
            component="form"
            sx={style}
            onSubmit={handleSubmit(onSubmitHandler)}
            maxWidth="sm"
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "10px" }}>Leave Type</InputLabel>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <Select
                    label="Leave Type"
                    id="leaveType"
                    error={!!errors["leave"]?.message}
                    {...register("leave")}
                  >
                    {leaveTypes &&
                      leaveTypes.map((leave) => {
                        return (
                          <MenuItem value={leave.value}>{leave.label}</MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors["leave"] ? errors["leave"].message : ""}
                  </FormHelperText>
                </FormControl>
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
                  helperText={
                    errors["addressLeavePeriod"]
                      ? errors["addressLeavePeriod"].message
                      : ""
                  }
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
                  helperText={errors["start"] ? errors["start"].message : ""}
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
        ) : (
          <Box
            component="form"
            sx={style}
            onSubmit={handleSubmit(onEditHandler)}
            maxWidth="sm"
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputLabel sx={{ marginTop: "10px" }}>Leave Type</InputLabel>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <Select
                    label="Leave Type"
                    id="leaveType"
                    error={!!errors["leave"]?.message}
                    {...register("leave")}
                  >
                    {leaveTypes &&
                      leaveTypes.map((leave) => {
                        return (
                          <MenuItem value={leave.value}>{leave.label}</MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors["leave"] ? errors["leave"].message : ""}
                  </FormHelperText>
                </FormControl>
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
                  helperText={
                    errors["addressLeavePeriod"]
                      ? errors["addressLeavePeriod"].message
                      : ""
                  }
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
                  helperText={errors["start"] ? errors["start"].message : ""}
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
        )}
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
