import TeacherImage from "../../Assest/Navigation/2-teacher.png";
import QuestionsImage from "../../Assest/Navigation/5-questionnaire.png";
import resultImage from "../../Assest/Navigation/3-resukt.png";

import settingImage from "../../Assest/Navigation/4-settings.png";
import arrowRightImage from "../../Assest/Navigation/arrow_right.png";
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import dashboardImage from "../../Assest/Navigation/1-dashboard.png";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

export const sideNavData = [
  {
    label: "Dashboard",
    image: dashboardImage,
    icon:<HomeIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "dashboard",
  },
  {
    label: "Teachers",
    image: TeacherImage,
    icon:<SchoolOutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "teacher",
  },
  {
    label: "Questions",
    image: QuestionsImage,
    icon:<QuestionMarkIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "question-choice",
  },
  {
    label: "Topics",
    image: arrowRightImage,
    icon:<ArrowRightOutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "topic",
  },
  {
    label: "Questionnaires",
    image: arrowRightImage,
    icon:<ArrowRightOutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
  
    values: "question-answer",
  },
  {
    label: "Results",
    image: resultImage,
    icon:<StickyNote2OutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "result",
  },
  {
    label: "Setting",
    image: settingImage,
   icon:<SettingsIcon  sx={{fontSize:"2em",color:"white"}}/>,
    values: "setting"
  },
];
export const sideNavDatas = [
  {
    label: "Dashboard",
    image: dashboardImage,
   icon:<HomeIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "dashboard-teacher",
  },

  {
    label: "Topics",
    image: arrowRightImage,
  icon:<ArrowRightOutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "topic-teacher",
  },
  {
    label: "Questionnaires",
    image: QuestionsImage,
    icon:<QuestionMarkIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "question-teacher",
  },

  {
    label: "Results",
    image: resultImage,
   icon:<StickyNote2OutlinedIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "result-teacher",
  },
  {
    label: "Setting",
    image: settingImage,
    icon:<SettingsIcon sx={{fontSize:"2em",color:"white"}}/>,
    values: "setting-teacher",
  },
];
