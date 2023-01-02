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
    <Grid container direction={"column"}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize:"cover",
     
    }}
    >
      <HeaderComponent
        headerLabel={"Teacher"}
        headerLabelIamges={dashboardIamge}
      />
      <ScrollComponent>
      <Grid container paddingTop={5} paddingLeft={2} paddingRight={2} direction="row">
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
      </ScrollComponent>
   
    </Grid>
  );
};

export default TeacherComponent;
