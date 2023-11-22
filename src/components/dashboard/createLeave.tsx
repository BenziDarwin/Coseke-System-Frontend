import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Alert,
  AlertColor,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import {
  addLeaveType,
  deleteLeaveType,
  getAllApplications,
  getLeaveTypes,
} from "../../core/leaveApi";
import { LeaveModel } from "../../models/leaveModel";
import { getRoles } from "../../core/api";
import { useNavigate } from "react-router-dom";

function CreateLeave() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState<{
    serverity: AlertColor;
    open: boolean;
    message: string;
  }>({ serverity: "success", open: false, message: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const [roles, setRoles] = React.useState<any[]>([]);
  const state = useSelector((state: any) => state.createLeave);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const arr: any = await getLeaveTypes();
      let res: any = await getRoles();
      if (res !== undefined) {
        let arr = res.map((val: { roleName: string }) => ({
          value: val.roleName.toLowerCase(),
          label: `${val.roleName.charAt(0).toUpperCase()}${val.roleName
            .slice(1)
            .toLowerCase()}`,
        }));
        console.log(arr);
        setRoles(arr);
      } else {
        console.log(res);
        setNotification({
          serverity: "error",
          open: true,
          message: "Something happened!",
        });
      }
      setRows(arr);
    })();
  }, []);

  const handleNotification = () => {
    setNotification({ serverity: "success", open: false, message: "" });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, maxWidth: 50, editable: false },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      minWidth: 110,
      editable: false,
    },
    {
      field: "maxDuration",
      headerName: "Max Duration",
      flex: 1,
      minWidth: 110,
      editable: false,
    },
    {
      field: "approvers",
      headerName: "Approvers",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params) => {
        return <>{(params.row.approvers as string[]).join(", ")}</>;
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="error"
              onClick={async () => {
                let res = await deleteLeaveType(parseInt(params.id.toString()));
                if (res.status == 200) {
                  setNotification({
                    serverity: "success",
                    open: true,
                    message: "Leave deleted successFully!",
                  });
                  navigate(0);
                }
              }}
              variant="contained"
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const isInteger = (val: string) => /^\d+$/.test(val);
  const validationSchema = z.object({
    name: z.string().min(1, { message: "Field is required!" }),
    duration: z
      .string()
      .min(1, "Field is required!")
      .refine((val) => isInteger(val), {
        message: "Must be a valid Number.",
      })
      .transform((val) => parseInt(val, 10)),
    maxDuration: z
      .string()
      .min(1, "Field is required!")
      .refine((val) => isInteger(val), {
        message: "Must be a valid Number.",
      })
      .transform((val) => parseInt(val, 10)),
  });

  type SignUpSchemaType = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(validationSchema) });

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    if (state.approvers?.length <= 0) {
      setNotification({
        serverity: "error",
        open: true,
        message: "Please enter atlease one approver!",
      });
      return;
    }

    let newvalue: LeaveModel = {
      ...values,
      name:values.name.toUpperCase(),
      approvers: state.approvers.map((val: any) => val.label.toUpperCase()),
    };
    let res = await addLeaveType(newvalue);
    if (res.status == 200) {
      setNotification({
        serverity: "success",
        open: true,
        message: "New Leave type created Successfully!",
      });
    } else {
      console.log(res.data);
      setNotification({
        serverity: "error",
        open: true,
        message: "Something Happened!",
      });
    }
    navigate(0);
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

  return (
    <Box>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h3" fontSize={30} sx={{ fontWeight: "400" }}>
            Create leave
          </Typography>
        </Grid>
        <Grid xs={2}>
          <Button onClick={handleOpen} variant="contained">
            Create New
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
            <Grid item xs={12}>
              <InputLabel sx={{ marginTop: "10px" }}>Leave Name</InputLabel>
              <TextField
                fullWidth
                label="Leave Name"
                margin="normal"
                variant="outlined"
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : ""}
                {...register("name")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <InputLabel sx={{ marginTop: "10px" }}>
                Annual Duration (In Days)
              </InputLabel>
              <TextField
                fullWidth
                label="Duration"
                margin="normal"
                variant="outlined"
                error={!!errors["duration"]}
                helperText={
                  errors["duration"] ? errors["duration"].message : ""
                }
                {...register("duration")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "10px" }}>
                  Max Duration on can take at once
                </InputLabel>
                <TextField
                  fullWidth
                  label="Max Duration"
                  margin="normal"
                  variant="outlined"
                  error={!!errors["maxDuration"]}
                  helperText={
                    errors["maxDuration"] ? errors["maxDuration"].message : ""
                  }
                  {...register("maxDuration")}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="approvers"
                options={roles}
                getOptionLabel={(option) => option.label || ""}
                onChange={(_, value) => {
                  dispatch({ type: "SET_APPROVERS", payload: value });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Approvers" variant="outlined" />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                )}
              />
            </Grid>

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

export default CreateLeave;
