import { Box, Grid, Input, Typography } from "@mui/material";
import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Teacher.png";
import backgroundImage from "../../BG.png";
import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import { teacherCellData, teacherDataHead } from "../../utils/fakedata/fakedata";
import ScrollComponent from "../ScrollComponent/ScrollComponent";

const TeacherComponent = () => {
  return (
    <ScrollComponent>
    <Grid container direction={"column"}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize:"cover",
      minHeight:"100%"
     
    }}
    >
      <HeaderComponent
        headerLabel={"Teacher"}
        headerLabelIamges={dashboardIamge}
      />
   
      <Grid container paddingTop={5} paddingLeft={2} paddingRight={2} paddingBottom={5} direction="row">
        <Grid item xl={12} lg={12} xs={9} md={12}>
        <ImageWithListComponent
          labelList={"Teacher List"}
          setImage={image}
          searchType={false}
          buttonLabel="Create Account"
          
          tableHead={teacherDataHead}
          cellData={teacherCellData}
          tableType={"teacher"}
          optionType="none"
         
        />

        </Grid>
       
      </Grid>

   
    </Grid>
    </ScrollComponent>
  );
};

export default TeacherComponent;
