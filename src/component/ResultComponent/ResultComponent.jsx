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
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import backgroundImage from "../../BG.png";

const ResultComponent = () => {
  return (
    <Grid container direction={"column"}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize:"cover",
     
    }}
    >
      <HeaderComponent
        headerLabel={"Result"}
        headerLabelIamges={dashboardIamge}
      />
      

      <ScrollComponent>
      <Grid container padding={5} direction="row">
        <Grid item xl={12} xs={10}>
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
      </ScrollComponent>
     
    </Grid>
  );
};

export default ResultComponent;
