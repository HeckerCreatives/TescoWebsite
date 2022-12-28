import TeacherImage from "../../Assest/Navigation/2-teacher.png";
import QuestionsImage from "../../Assest/Navigation/5-questionnaire.png";
import resultImage from "../../Assest/Navigation/3-resukt.png";

import settingImage from "../../Assest/Navigation/4-settings.png";
import arrowRightImage from "../../Assest/Navigation/arrow_right.png";

import dashboardImage from "../../Assest/Navigation/1-dashboard.png";

export const sideNavData = [
  {
    label: "Dashboard",
    image: dashboardImage,
    width: "2em",
    height: "2em",
    values: "dashboard",
  },
  {
    label: "Teachers",
    image: TeacherImage,
    width: "2em",
    height: "2em",
    values: "teacher",
  },
  {
    label: "Questions",
    image: QuestionsImage,
    width: "1.9em",
    height: "2.9em",
    values: "question-choice",
  },
  {
    label: "Topics",
    image: arrowRightImage,
    width: "2em",
    height: "2em",
    values: "topic",
  },
  {
    label: "Questionnaires",
    image: arrowRightImage,
    width: "2em",
    heights: "2em",
    values: "question-answer",
  },
  {
    label: "Results",
    image: resultImage,
    width: "2.5em",
    height: "2.5em",
    values: "result",
  },
  {
    label: "Setting",
    image: settingImage,
    width: "2em",
    height: "2em",
    values: "setting",
  },
];
export const sideNavDatas = [
  {
    label: "Dashboard",
    image: dashboardImage,
    width: "2em",
    height: "2em",
    values: "dashboard-teacher",
  },

  {
    label: "Topics",
    image: arrowRightImage,
    width: "2em",
    height: "2em",
    values: "topic-teacher",
  },

  {
    label: "Results",
    image: resultImage,
    width: "2.5em",
    height: "2.5em",
    values: "result-teacher",
  },
  {
    label: "Setting",
    image: settingImage,
    width: "2em",
    height: "2em",
    values: "setting-teacher",
  },
];
