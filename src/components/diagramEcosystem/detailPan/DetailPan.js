import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";

const DetailPan = () => {
  const detailData = useSelector((state) => state.detail);

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
          <Typography variant="body">
            ID : {detailData ? detailData.id : "test"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DetailPan;
