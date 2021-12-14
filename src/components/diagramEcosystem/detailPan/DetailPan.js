import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Box, Button, Link } from "@mui/material";

/*Should be split in multiple files :
return(
  <Default/>
  <ASC_Reco/>
  <Resilience_Reco/>
  <ETC_Reco/>
)
*/

const DetailPan = () => {
  const detailData = useSelector((state) => state.detail);

  if (detailData.hasOwnProperty("id")) {
    //! hard tenant here !
    const ResourcePortalLink =
      "https://portal.azure.com/#@mendacorp.onmicrosoft.com/resource" +
      detailData.id;

    /*const ASCLink =
      "https://portal.azure.com/#@mendacorp.onmicrosoft.com/resource" +
      detailData.RecommandationsASC.id;*/

    const openResourceInPortal = (event) => {
      window.open(ResourcePortalLink, "_blank").focus();
    };

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
          alignItems="left"
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
          <Grid item>
            <Typography variant="body">
              Resource name : {detailData.label}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={openResourceInPortal}>
              See me on Azure Portal
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6">Recommendations</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
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
  }
};
export default DetailPan;
////https://portal.azure.com/#@mendacorp.onmicrosoft.com/resource/
//subscriptions/3bfaafd1-b638-4262-8794-370d23b971d7/resourceGroups/chboudrywebsite/
//providers/Microsoft.ContainerRegistry/registries/chboudryacr/overview

/*          <Grid item>
            <Typography variant="body" style={{ fontWeight: "bold" }}>
              Azure Security Center
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body" style={{ fontWeight: "bold" }}>
              Alert name :{" "}
            </Typography>
            <Link rel="noopener noreferrer" href={ASCLink} target="_blank">
              {detailData.RecommandationsASC.properties.alertDisplayName}
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="body" style={{ fontWeight: "bold" }}>
              Description :{" "}
            </Typography>
            <Typography variant="body">
              {detailData.RecommandationsASC.properties.description}
            </Typography>
          </Grid>
          */
