
import React from "react";
import { Grid, } from "@mui/material";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Questinnaire.png";

import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import { resultDataHead, topicsCellData} from "../../utils/fakedata/fakedata";


const QuestionAnswer= () => {
  return (
    <Grid container direction={"column"}>
    <HeaderComponent
      headerLabel={"Questionnaires"}
      headerLabelIamges={dashboardIamge}
    />
    <Grid container padding={5} direction="row">
      <ImageWithListComponent
        labelList={"QUESTIONNAIRES"}
        setImage={image}
        searchType={false}
        buttonLabel="Create Account"
        questionType={"question-answer"}
        tableHead={resultDataHead}
        cellData={topicsCellData}
        tableType={"result"}
        optionType={"option"}
       
      />
    </Grid>
  </Grid>
  )
}

export default QuestionAnswer