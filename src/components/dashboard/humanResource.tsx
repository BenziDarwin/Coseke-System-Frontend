import React from "react";
import HrCard from "../HumanResource/HrCard";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Person } from "@mui/icons-material";

function HumanResource() {
  const dispatch = useDispatch();
  return (
    <Grid container spacing={2} style={{ minHeight: "100vh" }}>
      <Grid item xs={12} alignItems={"center"} md={4}>
        <HrCard
          title="Leave Types"
          icon={CardTravelIcon}
          onClick={() => dispatch({ type: "create-leave" })}
        />
      </Grid>
      <Grid item xs={12} alignItems={"center"} md={4}>
        <HrCard
          title="HR User Management"
          icon={Person}
          onClick={() => dispatch({ type: "user-leave-management" })}
        />
      </Grid>
    </Grid>
  );
}

export default HumanResource;
