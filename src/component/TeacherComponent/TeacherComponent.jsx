import { Box, Grid, Input, Typography } from "@mui/material";
import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Teacher.png";

import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import { teacherCellData, teacherDataHead } from "../../utils/fakedata/fakedata";

const TeacherComponent = () => {
  return (
    <Grid container direction={"column"}>
      <HeaderComponent
        headerLabel={"Teacher"}
        headerLabelIamges={dashboardIamge}
      />
      <Grid container padding={5} direction="row">
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
  );
};

export default TeacherComponent;
