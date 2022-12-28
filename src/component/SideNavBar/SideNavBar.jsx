import { Grid, Paper, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import image from "../../Assest/Navigation/sidebar.png";
import ImageWIthLabel from "../../shared/ImageWithLabel/ImageWIthLabel";
import logo from "../../Assest/Navigation/title.png";

import { sideNavData } from "../../utils/sideNavData/sideNavData";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import {useNavigate} from 'react-router-dom'
const SideNavBar = ({ parameters,role,sideNavData,subType}) => {
  const history=useNavigate()
  const handleLogout=()=>{
    history('/')
  }

  const styles = {
    paperContiner: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "120vh",
      width: "100%",
    },
  };

  return (
    <Grid container>
      <Paper style={styles.paperContiner}>
        <Stack
          spacing={1}
          direction="column"
          alignItems={"center"}
          borderBottom="1px solid white"
          
        >
          <ImageWIthLabel
            setImage={logo}
            setLabel="TeSco"
            labelVariant={"h3"}
            setHeight="6em"
            setWidth={"6em"}
            setpath={"dashboard"}
          />
          <Typography variant="h4" fontWeight={"700"} color={"white"}>
            {role}
          </Typography>
        </Stack>
        {sideNavData.map((each, index) => (
          <Box sx={{ margin: "2em" }} key={index}>
            <ImageWIthLabel
              setImage={each.image}
              setpath={each.values}
              labelVariant={"h6"}
              setLabel={each.label}
              setHeight={each.height}
              setWidth={each.width}
              parameters={parameters}
              subType={subType}
            />
          </Box>
        ))}
        <Box
          sx={{
            marginLeft: "5em",
            marginTop: "5em",
          }}
        >
          <ButtonLabel
            buttonLabel={"Logout"}
            handleCLick={handleLogout}
            styles={{
              fontSize: "1.2em",
              width: "10em",
              backgroundColor: "#ebad00",
              color: "black",
            }}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export default SideNavBar;