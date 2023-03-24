import React from "react";
import { Grid } from "@mui/material";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import dashboardIamge from "../../Assest/Navigation/menu.png";
import image from "../../Assest/Dashboard/Student.png";
import "./resultcomponent.css";
import ImageWithListComponent from "../ImageWithListComponent/ImageWithListComponent";
import {
  resultsHeader,
  resultDataHead,
  studentCellData,
  topicsCellData,
} from "../../utils/fakedata/fakedata";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import backgroundImage from "../../BG.png";
import {
  getQuestion,
  getResultsByUser,
  GetResultHook,
} from "../../utils/CustomQuerHook/CustomQueryHook";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";

const ResultComponent = () => {
  const { data, isLoading, isError } = GetResultHook();
  const token = jwtDecode(localStorage.getItem("token"));
  const questions = useQuery(["question-data", null], getQuestion);
  const results = useQuery(["result-by-user"], () =>
    getResultsByUser(token.username)
  );
  console.log(results?.data?.data);

  // console.log(results);
  return (
    <ScrollComponent>
      <Grid
        container
        direction={"column"}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100%",
        }}
      >
        <HeaderComponent
          headerLabel={"Result"}
          headerLabelIamges={dashboardIamge}
        />

        <Grid container padding={5} direction="row">
          <Grid item xl={12} xs={10}>
            <ImageWithListComponent
              labelList={"Result"}
              setImage={image}
              searchType={false}
              buttonLabel="Create Account"
              tableHead={resultsHeader}
              cellData={results?.data?.data}
              tableType={"result"}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </ScrollComponent>
  );
};

export default ResultComponent;
