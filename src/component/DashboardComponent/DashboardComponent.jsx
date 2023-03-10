// ** React
import { useEffect, useState } from "react";

// ** Third Party Component
import { useQuery } from "react-query";
import { Grid } from "@mui/material";

// ** FakeData
// import { dashboardcardData } from "../../utils/fakedata/fakedata";
import { resultDataHead } from "../../utils/fakedata/fakedata";
import { dashboardcardData } from "../../utils/fakedata/fakedata";

import {
  CountTeachersHook,
  CountTopicsHook,
  CountQuestionsHook,
  CountMyTopicsHook,
  CountMyQuestionsHook,
} from "../../utils/CustomQuerHook/CustomQueryHook";

// ** Components
import CardWithImage from "../CardImage/CardWithImage";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import Cardindicator from "../CardIndiactor/Cardindicator";
import ScrollComponent from "../ScrollComponent/ScrollComponent";

// ** Style
import "./dashboard.css";

// ** Images
import dashboardIamge from "../../Assest/Navigation/menu.png";
import backgroundImage from "../../BG.png";
import topic from "../../Assest/Dashboard/Topic.png";
import teacher from "../../Assest/Dashboard/Teacher.png";
import student from "../../Assest/Dashboard/Student.png";
import questionnaire from "../../Assest/Dashboard/Questinnaire.png";

const DashboardComponent = () => {
  // ** Vars
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("_id");

  // ** React States
  const [topicsCount, setTopicsCount] = useState([]);
  const [teachersCount, setTeachersCount] = useState([]);
  const [QuestionsCount, setQuestionsCount] = useState([]);
  const [myTopicsCount, setMytopicsCount] = useState([]);
  const [myQuestionsCount, setMyQuestionsCount] = useState([]);

  // ** Datas
  const countMyTopics = async () => {
    const MyTopicsCountData = await CountMyTopicsHook({
      user_id,
    });
    setMytopicsCount(MyTopicsCountData);
  };

  const countMyQuestions = async () => {
    const MyQuestionCountData = await CountMyQuestionsHook({ username });
    setMyQuestionsCount(MyQuestionCountData);
  };

  const countTeachers = async () => {
    const TeacherCountdata = await CountTeachersHook();
    setTeachersCount(TeacherCountdata);
  };

  const countTopics = async () => {
    const TopicCountdata = await CountTopicsHook();
    setTopicsCount(TopicCountdata);
  };

  const countQuestions = async () => {
    const QuestionCountData = await CountQuestionsHook();
    setQuestionsCount(QuestionCountData);
  };

  useEffect(() => {
    if (role === "teacher") {
      countMyTopics();
      countMyQuestions();
    } else {
      countTeachers();
      countTopics();
      countQuestions();
    }
  }, []);

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
          // height:"100%"
        }}
        className="dashboard-component-container"
      >
        <HeaderComponent
          headerLabel={"Dashboard"}
          headerLabelIamges={dashboardIamge}
        />

        {role !== "teacher" ? (
          <Grid
            container
            direction={"row"}
            spacing={10}
            padding={4}
            justifyContent={"center"}
            alignItems="center"
          >
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <CardWithImage
                imagePath={teacher}
                totalNumber={topicsCount?.count}
                labelCard={"Total Number Of Teachers"}
              />
            </Grid>
            {/* <Grid item xs={12} md={4} lg={4} xl={4}>
              <CardWithImage
                imagePath={student}
                totalNumber={"-"}
                labelCard={"Total Number Of Students"}
              />
            </Grid> */}
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <CardWithImage
                imagePath={questionnaire}
                totalNumber={teachersCount?.count}
                labelCard={"Total Number Of Questionaire"}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <CardWithImage
                imagePath={topic}
                totalNumber={QuestionsCount?.count}
                labelCard={"Total Number Of Topics"}
              />
            </Grid>
            {/* {data.map((each, index) => (
            <Grid item key={index}>
              <CardWithImage
                imagePath={each.image}
                totalNumber={each.number}
                labelCard={each.label}
              />
            </Grid>
          ))} */}
          </Grid>
        ) : (
          <Grid
            container
            direction={"row"}
            spacing={10}
            padding={4}
            justifyContent={"center"}
            alignItems="center"
          >
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <CardWithImage
                imagePath={questionnaire}
                totalNumber={myTopicsCount?.count}
                labelCard={"Total Number Of Questioners"}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <CardWithImage
                imagePath={topic}
                totalNumber={myQuestionsCount?.count}
                labelCard={"Total Number Of Topics"}
              />
            </Grid>
          </Grid>
        )}

        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          direction={"row"}
          spacing={3}
          padding={3}
        >
          {/* <Grid item xs={8} xl={6}>
          <Cardindicator
            darkTheme={false}
            setDetails={"Student pass for month for this september"}
            setTitle="monthly passer"
            tableHead={resultDataHead}
          />
        </Grid>
        <Grid item xs={8} xl={6}>
          <Cardindicator
            setDetails={"student statics pass verse fail"}
            setTitle={"Passer percentage"}
            chartEnable={true}
          />
        </Grid> */}
        </Grid>
      </Grid>
    </ScrollComponent>
  );
};

export default DashboardComponent;
