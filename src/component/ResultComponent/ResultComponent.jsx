import React from "react";
import { Grid } from "@mui/material";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Student.png";
import "./resultcomponent.css";
import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import {
  resultDataHead,
  studentCellData,
  topicsCellData,
 
} from "../../utils/fakedata/fakedata";

const ResultComponent = () => {
  return (
    <Grid container direction={"column"}>
      <HeaderComponent
        headerLabel={"Result"}
        headerLabelIamges={dashboardIamge}
      />
      <Grid container padding={5} direction="row">
        <ImageWithListComponent
          labelList={"Result"}
          setImage={image}
          searchType={false}
          buttonLabel="Create Account"
          tableHead={resultDataHead}
          cellData={studentCellData}
          tableType={"result"}
          
         
        />
      </Grid>
    </Grid>
  );
};

export default ResultComponent;
