
import React from "react";
import { Grid, } from "@mui/material";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Topic.png";
import "./topiccomponent.css";
import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import { topicsCellData, topicsDataHead } from "../../utils/fakedata/fakedata";


const TopicComponent = () => {
  return (
    <Grid container direction={"column"}>
    <HeaderComponent
      headerLabel={"Topics"}
      headerLabelIamges={dashboardIamge}
    />
    <Grid container padding={5} direction="row">
      <ImageWithListComponent
        labelList={"Topics List"}
        setImage={image}
        searchType={true}
        buttonLabel="Create Account"
      
        tableHead={topicsDataHead}
        cellData={topicsCellData}
        tableType={"topic"}
        optionType="none"
       
      />
    </Grid>
  </Grid>
  )
}

export default TopicComponent