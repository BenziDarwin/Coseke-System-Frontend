import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelectOption from "./SelectOption";

interface IPageHeader {
  title: string;
  module: string;
  handleOpen?: () => void;
  handleSelectChange?: (value: string) => void;
  rolesList?: any[];
  currentRole?: string;
}

export const PageHeader = ({
  title,
  module,
  handleOpen,
  handleSelectChange,
  currentRole,
  rolesList,
}: IPageHeader) => {
  return (
    <>
      <Grid
        spacing={2}
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Grid item xs={6}>
          <Typography
            sx={{ textTransform: "capitalize" }}
            mb={2}
            variant="h2"
            fontSize="18px"
            fontWeight="bold"
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={handleOpen}
            startIcon={<AddIcon />}
            size="small"
            variant="contained"
            sx={{ textTransform: "capitalize", ml: 1, py: 1 }}
          >
            Add {module}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
