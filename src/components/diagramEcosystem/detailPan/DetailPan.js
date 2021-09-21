import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";

const DetailPan = () => {
  return (
    <Box
      border={1}
      borderColor="#808080"
      style={{
        height: "inherit",
        overflow: "auto",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        wrap="nowrap"
        style={{
          height: "inherit",
          overflow: "auto",
          boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.2)",
        }} // --> add scrollbar when overflow }}
      >
        <Grid item>
          <Typography variant="h5">Detail Pan</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DetailPan;
