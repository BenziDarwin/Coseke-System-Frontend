import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Stack } from "@mui/material";
import PermissionsDisplay, { IPermissions } from "../../components/permissions";
import { blue } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { globalBlueColor, moduleNames } from "../../data/constants";
import { ICrud, IModule } from "./interface";
import { deleteRole, getRoles, updatePermissions } from "../../core/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RolesCard = ({ permissionList }: { permissionList?: IModule }) => {
  const [roles, setRoles] = useState([]);
  const perm = useSelector((state: any) => state.permissions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res: any = await getRoles();
      setRoles(res);
    })();
  }, []);

  const updateRole = async (role: string) => {
    const keysArray: string[] = Object.keys(perm.value[role]);
    const valuesArray: boolean[] = Object.values(perm.value[role]);
    let permissions = [];
    for (let i = 0; i < keysArray.length; i++) {
      if (valuesArray[i] == true) {
        if (keysArray[i] == "create") {
          permissions.push("write");
          continue;
        }
        permissions.push(keysArray[i].toUpperCase());
      }
    }
    let roleObj = { roleName: role.toLowerCase(), permissions: permissions };
    let response = await updatePermissions(roleObj);
    console.log(response);
  };

  const deleteHandler = async (role: string) => {
    let res = await deleteRole({ roleName: role });
    if (res.status == 200) {
      console.log("Success");
    }
    navigate(0);
  };

  return (
    <Grid container xs={12} spacing={2}>
      {roles.map((role: any) => {
        return (
          <Grid item xs={4}>
            <Card sx={{ bgcolor: blue[50], boxShadow: "none", p: 2 }}>
              <Box>
                <PermissionsDisplay
                  role={`${role.roleName.charAt(0).toUpperCase()}${role.roleName
                    .slice(1)
                    .toLowerCase()}`}
                  permissions={{
                    read: role.permissions.includes("READ"),
                    write: role.permissions.includes("WRITE"),
                    delete: role.permissions.includes("DELETE"),
                    update: role.permissions.includes("UPDATE"),
                  }}
                  disabled={true}
                />
                <Stack
                  sx={{ justifyContent: "end" }}
                  direction="row"
                  spacing={1}
                >
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    startIcon={<DeleteOutlineIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      deleteHandler(
                        `${role.roleName.charAt(0).toUpperCase()}${role.roleName
                          .slice(1)
                          .toLowerCase()}`,
                      )
                    }
                    size="small"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() =>
                      updateRole(
                        `${role.roleName.charAt(0).toUpperCase()}${role.roleName
                          .slice(1)
                          .toLowerCase()}`,
                      )
                    }
                    startIcon={<EditOutlinedIcon />}
                    variant="outlined"
                    size="small"
                    sx={{
                      border: `1px solid ${globalBlueColor}`,
                      boxShadow: "none",
                      color: globalBlueColor,
                      textTransform: "capitalize",
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RolesCard;
