import React, { ChangeEvent, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { PageHeader } from "../../components/Headers";
import ModalComponent from "../../components/ModelComponent";
import CreateUser from "./createUser";
import {
  GridColDef,
  GridPagination,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { DataGridStyled } from "../../components/tables";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { grey } from "@mui/material/colors";
import { fetchUsers } from "./user_api";
import { IUser } from "./interface";
import SearchIcon from "@mui/icons-material/Search";
import { filterUsersByString } from "../../functions/helpers";
import { getUsers } from "../../core/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

interface ICustomGridToolBar {
  data: IUser[];
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

const User = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [users, setUsers] = React.useState<IUser[]>([]);

  const fetchUsersFunction = async () => {
    const response = (await getUsers()) as unknown as IUser[];
    if (response?.length > 0) {
      console.log(response);
      setUsers(response);
    }
  };

  useEffect(() => {
    fetchUsersFunction();
  }, []);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const data = filterUsersByString(users, e.target.value);
    console.log(data, "data information");
  };

  const columns: GridColDef[] = [
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 100,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography sx={{ textTransform: "capitalize" }}>
          {params.row.role.roleName.toLowerCase()}
        </Typography>
      ),
    },
    {
      field: "id",
      headerName: "Options",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              console.log(params.row.id, "id value");
              console.log("button Clicked!!!");
            }}
          >
            <DeleteOutlineIcon color="error" />
          </IconButton>
          <IconButton
            onClick={() => {
              console.log(params.row.id, "id value");
              console.log("button Clicked!!!");
            }}
          >
            <EditOutlinedIcon sx={{ color: grey[600] }} />
          </IconButton>
          <IconButton
            onClick={() => {
              console.log(params.row.id, "id value");
              console.log("button Clicked!!!");
            }}
          >
            <RemoveRedEyeOutlinedIcon color="primary" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {open && (
        <ModalComponent style={style} handleClose={handleClose} open={open}>
          <>
            <CreateUser handleClose={handleClose} />
          </>
        </ModalComponent>
      )}
      <PageHeader handleOpen={handleOpen} module="User" title="Users" />
      <Grid container xs={12}>
        <Card sx={{ pb: 2, width: "100%" }}>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <DataGridStyled
              {...users}
              autoHeight
              rows={users || []}
              columns={columns}
              slots={{
                footer: (props: any) => (
                  <CustomGridToolBar
                    data={users}
                    {...props}
                    handleFilter={handleFilter}
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
          </Box>
        </Card>
      </Grid>
    </Box>
  );
};

export default User;
