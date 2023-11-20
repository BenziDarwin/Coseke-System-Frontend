// src/components/HrCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";

const HrCard = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const IconComponent = icon;
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        maxWidth: 500, // Increase the width as desired
        minHeight: { md: 200 },
        borderRadius: 2, // Add border radius for a rounded look
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={2}>
            <IconButton style={{ marginBottom: 16 }} disabled>
              {/* The IconButton is disabled to prevent clicking on the icon */}
              <IconComponent style={{ fontSize: 64 }} />{" "}
              {/* Increase the icon size */}
            </IconButton>
          </Grid>
          <Grid
            item
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            xs={10}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontSize: { lg: 24, md: 22, xs: 20 },
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HrCard;
