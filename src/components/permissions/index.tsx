import React, { useEffect } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import CheckboxComponent from "../CheckBox";
import { grey } from "@mui/material/colors";
import { crudState } from "../../data/constants";
import { useDispatch, useSelector } from "react-redux";

export interface IPermissions {
  write: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface IPermissionsDisplay {
  role: string;
  permissions: IPermissions;
  disabled?: boolean;
}

const FormControlLabelComponent = ({
  text,
}: {
  text: string;
  actionText: string;
  action: boolean;
}) => <Typography sx={{ fontSize: "13px" }}>{text}</Typography>;

const PermissionsDisplay = ({
  role,
  permissions,
  disabled,
}: IPermissionsDisplay) => {
  const state = useSelector((state: any) => state.permissions);
  const dispatch = useDispatch();

  const handleChange = (e: any, role: string, action: string) => {
    dispatch({
      type: "UPDATE_PERMISSIONS",
      payload: {
        role: role,
        action: action,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_PERMISSIONS",
      payload: { role: role, permissions: permissions },
    });
    console.log(state.value[role]);
  }, []);

  return (
    <Grid container item xs={12}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ pb: 1 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                borderBottom: `1px solid ${grey[400]}`,
                width: "100%",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "18px",
                  py: 1,
                }}
                variant="h3"
              >
                {role}
                <Typography sx={{ ml: 1, fontSize: "12px" }}>
                  Permissions
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <FormGroup>
            <FormControlLabel
              disabled={false}
              control={
                <CheckboxComponent
                  handleChange={(e) => handleChange(e, role, "write")}
                  action={crudState?.write}
                  role={role}
                  checked={state.value[role]?.write}
                  disabled={disabled}
                />
              }
              label={
                <FormControlLabelComponent
                  action={permissions?.write}
                  text="Create"
                  actionText={`create ${role}`}
                />
              }
            />
            <FormControlLabel
              disabled={false}
              control={
                <CheckboxComponent
                  handleChange={(e) => handleChange(e, role, "read")}
                  action={crudState?.read}
                  role={role}
                  checked={state.value[role]?.read}
                  disabled={disabled}
                />
              }
              label={
                <FormControlLabelComponent
                  action={permissions?.read}
                  text="Read"
                  actionText={`view ${role}`}
                />
              }
            />
            <FormControlLabel
              disabled={false}
              control={
                <CheckboxComponent
                  handleChange={(e) => handleChange(e, role, "update")}
                  action={crudState?.update}
                  role={role}
                  checked={state.value[role]?.update}
                  disabled={disabled}
                />
              }
              label={
                <FormControlLabelComponent
                  action={permissions?.update}
                  text="Update"
                  actionText={`update ${role}`}
                />
              }
            />
            <FormControlLabel
              disabled={false}
              control={
                <CheckboxComponent
                  handleChange={(e) => handleChange(e, role, "delete")}
                  action={crudState?.delete}
                  role={role}
                  checked={state.value[role]?.delete}
                  disabled={disabled}
                />
              }
              label={
                <FormControlLabelComponent
                  action={permissions?.delete}
                  text="Delete"
                  actionText={`delete ${role}`}
                />
              }
            />
          </FormGroup>
        </Box>
      </Box>
    </Grid>
  );
};

export default PermissionsDisplay;
