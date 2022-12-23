import { Grid, Paper, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import image from "../../Assest/Navigation/sidebar.png";
import ImageWIthLabel from "../../shared/ImageWithLabel/ImageWIthLabel";
import logo from "../../Assest/Navigation/title.png";

import { sideNavData } from "../../utils/sideNavData/sideNavData";
const SideNavBar = () => {
  const styles = {
    paperContiner: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "20em",
    },
  };
  return (
    <Grid container columns={{ xs: 4, sm: 4, md: 8 }}>
      <Paper style={styles.paperContiner}>
        <Stack
          spacing={1}
          direction="column"
          alignItems={"center"}
          borderBottom="1px solid white"
          marginTop= "1em"
        >
          <ImageWIthLabel
            setImage={logo}
            setLabel="TeSco"
            labelVariant={"h3"}
            setHeight="6em"
            setWidth={"6em"}
          />
          <Typography variant="h4" fontWeight={"700"} color={"white"}>
            Admin
          </Typography>
        </Stack>
        {sideNavData.map((each,index)=>(
             <Box sx={{ margin: "2em" }} key={index}>
             <ImageWIthLabel
               setImage={each.image}
               labelVariant={"h6"}
               setLabel={each.label}
               setHeight={each.height}
               setWidth={each.width}
             />
           
           </Box>
        ))}
     
      </Paper>
    </Grid>
  );
};

export default SideNavBar;
