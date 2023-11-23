import {
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { approveLeave, getApproverApplications } from "../../core/leaveApi";
import { Check, Close } from "@mui/icons-material";
import { ApproveLeave } from "../../models/ApproveLeaveModel";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();
  const profile = JSON.parse(sessionStorage.getItem("user")!);
  let [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  const [approve, setApprove] = useState<ApproveLeave>();

  const handleClose = async () => {
    let val: ApproveLeave = { ...approve!, approvalState: -2 };
    let res = await approveLeave(val);
    setOpen(false);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    {
      field: "fullName",
      headerName: "Full Names",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
    },
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
      field: "reason",
      headerName: "Reason",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
    },
    {
      field: "Options",
      headerName: "Options",
      // type: 'number',
      flex: 1,
      minWidth: 110,
      editable: false,
      renderCell: (val) => {
        return (
          <Grid container>
            <Grid item xs={6}>
              <Button
                size="small"
                onClick={async () => {
                  let list = rows.filter((row) => row.id == val.row.id);
                  let value: ApproveLeave = {
                    email: list[0].email,
                    approvalState: 1,
                    approverRole: profile.role.roleName,
                  };
                  let res = await approveLeave(value);
                  navigate(0);
                }}
                variant="contained"
                color="success"
              >
                <Check />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="small"
                onClick={() => {
                  let list = rows.filter((row) => row.id == val.row.id);
                  approveHandler(-1, list[0].email, profile.role.roleName);
                }}
                variant="contained"
                color="error"
              >
                <Close />
              </Button>
            </Grid>
          </Grid>
        );
      },
    },
  ];
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

  const errorSchema = object({
    comment: string().min(1, "Field is required!"),
  });

  type SignUpSchemaType = z.infer<typeof errorSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(errorSchema) });

  const onErrorHandler: SubmitHandler<SignUpSchemaType> = async (values) => {
    let finalApprove: ApproveLeave = { ...approve!, comment: values.comment };
    let res = await approveLeave(finalApprove);
    setOpen(false);
    navigate(0);
  };

  const approveHandler = async (
    status: number,
    email: string,
    role: string,
  ) => {
    let approve: ApproveLeave = {
      approverRole: role,
      email: email,
      approvalState: status,
    };
    setApprove(approve);
    setOpen(true);
  };
  useEffect(() => {
    (async () => {
      let res = await getApproverApplications();
      setRows(res);
    })();
  }, []);
  return (
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          onSubmit={handleSubmit(onErrorHandler)}
          maxWidth="sm"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel sx={{ marginTop: "10px" }}>Comment</InputLabel>
              <TextField
                fullWidth
                label="Reason"
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                error={!!errors["comment"]}
                helperText={errors["comment"] ? errors["comment"].message : ""}
                {...register("comment")}
              />
              <Grid container spacing={2} marginTop={"20px"}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Send Back to Applicant
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    fullWidth
                  >
                    Terminate Application
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export default Home;
