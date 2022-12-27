import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import headerIamge from "../../Assest/Navigation/Header.png";
import setting from "../../Assest/Navigation/4-settings.png";
import "./header.css";
const HeaderComponent = ({ headerLabel,headerLabelIamges}) => {
  return (
    <>
      <Box className="header-container">
       
        <img
          src={headerIamge}
          alt=""
          style={{ height: "10em",objectFit:"fill",width: "100%" }}
          className="header-image"
        />
        
        
        <Grid container
          position={"absolute"}
          top={70}
          display={"flex"}
          alignItems="center"
          padding={4}
          gap={2}
        >
          <img src={headerLabelIamges} alt="" className="header-label-image"/>

          <Typography color={"white"} fontSize="1.2em">{headerLabel}</Typography>
        </Grid>
      </Box>
    </>
  );
};

export default HeaderComponent;
