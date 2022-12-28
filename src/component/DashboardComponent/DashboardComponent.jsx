import { Grid } from "@mui/material";
import React from "react";

import CardWithImage from "../CardImage/CardWithImage";
import { dashboardcardData } from "../../utils/fakedata/fakedata";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import "./dashboard.css";
import { resultDataHead } from "../../utils/fakedata/fakedata";
import Cardindicator from "../CardIndiactor/Cardindicator";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
const DashboardComponent = () => {
  return (
    <Grid container direction={"column"}>
      <HeaderComponent
        headerLabel={"Dashboard"}
        headerLabelIamges={dashboardIamge}
      />
      
      <Grid
        container
        direction={"row"}
        spacing={10}
        padding={7}
        justifyContent={"center"}
        alignItems="center"
        zIndex={1}
      >
        {dashboardcardData.map((each, index) => (
          <Grid item key={index}>
            <CardWithImage
              imagePath={each.image}
              totalNumber={each.number}
              labelCard={each.label}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        direction={"row"}
        spacing={5}
        padding={2}
      >
        <Grid item >
          <Cardindicator
            darkTheme={false}
            setDetails={"Student pass for month for this september"}
            setTitle="monthly passer"
            tableHead={resultDataHead}
          />
        </Grid>
        <Grid item >
          <Cardindicator
            setDetails={"student statics pass verse fail"}
            setTitle={"Passer percentage"}
            chartEnable={true}
            
          />
        </Grid>
      </Grid>
     
     
    </Grid>
  );
};

export default DashboardComponent;
