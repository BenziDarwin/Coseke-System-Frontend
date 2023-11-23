import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import RolesCard from "./RolesCard";
import { permissionListMock } from "./initialPermissions";
import { roleSchema } from "./schema";

import { PageHeader } from "../../components/Headers";
import { BootstrapInput } from "../../components/Input";
import ModalComponent from "../../components/ModelComponent";
import { createRole, getRoles } from "../../core/api";
import { globalBlueColor } from "../../data/constants";
import { IModule, IRole, def } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

interface IRoleCreate {
  roleName: string;
  weight: number;
  permissions: string[];
  activities: string[];
}

const Roles = () => {
  const [currentRole, setCurrentRole] = useState<string>("");
  const [rolesList, setRolesList] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [permissionList, setPermissionList] = React.useState<IModule>(def);
  const [allPermissionList, setAllPermissionList] = React.useState<{
    [key: string]: IModule;
  }>({ permissionListMock });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    role: string,
    action: string,
  ) => {
    console.log(permissionList);
    setPermissionList({
      ...permissionList,
      [role]: {
        ...permissionList[role],
        [action]: event.target.checked,
      },
    });
  };

  useEffect(() => {
    (async () => {
      let res: any = await getRoles();
      res.map((role: any) => {
        let arr = {
          read: role.permissions.includes("READ"),
          create: role.permissions.includes("WRITE"),
          delete: role.permissions.includes("DELETE"),
          update: role.permissions.includes("UPDATE"),
        };
        setPermissionList({
          ...permissionList,
          [`${role.roleName.charAt(0).toUpperCase()}${role.roleName
            .slice(1)
            .toLowerCase()}`]: arr,
        });
      });
    })();
  }, []);

  const handleSelectChange = (value: string) => {
    setCurrentRole(value);
  };

  useEffect(() => {
    setCurrentRole("admin");
  }, []);

  useEffect(() => {
    const val = currentRole.toLowerCase();
    setPermissionList(allPermissionList[val]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRole]);

  const isInteger = (val: string) => /^\d+$/.test(val);
  const validationSchema = z.object({
    roleName: z.string().min(1, { message: "Field is required!" }),
    weight: z
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

  const onSubmit = async (values: any) => {
    console.log(values);
    let role: IRoleCreate = { ...values, permissions: [], activities: [] };
    let res = await createRole(role);
    if (res.status == 200) {
      console.log("Success!");
      navigate(0);
    }
    handleClose();
    navigate(0);
  };

  return (
    <Box>
      {open && (
        <ModalComponent style={style} handleClose={handleClose} open={open}>
          <>
            <Box
              component={"form"}
              autoComplete="false"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{ fontWeight: "bold" }}
                component="h2"
              >
                Create new Role
              </Typography>
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Role Name"
                    variant="outlined"
                    error={!!errors["roleName"]}
                    helperText={
                      errors["roleName"] ? errors["roleName"].message : ""
                    }
                    {...register("roleName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Weight"
                    variant="outlined"
                    error={!!errors["weight"]}
                    helperText={
                      errors["weight"] ? errors["weight"].message : ""
                    }
                    {...register("weight")}
                  />
                </Grid>
              </Grid>
              <Stack
                mt={2}
                sx={{ justifyContent: "end" }}
                direction="row"
                spacing={1}
              >
                <Button
                  onClick={handleClose}
                  sx={(theme) => ({
                    textTransform: "capitalize",
                    color: theme.palette.grey[800],
                  })}
                  variant="outlined"
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    border: `1px solid`,
                    boxShadow: "none",
                    bgcolor: `${globalBlueColor}`,
                    textTransform: "capitalize",
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Box>
          </>
        </ModalComponent>
      )}
      <PageHeader
        rolesList={rolesList}
        currentRole={currentRole}
        handleSelectChange={handleSelectChange}
        handleOpen={handleOpen}
        module="Role"
        title={`${currentRole} Permissions Management`}
      />

      <RolesCard permissionList={permissionList} />
    </Box>
  );
};

export default Roles;
