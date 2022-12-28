import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import trangle from "../../Assest/Questionnaire/triangle.png";
import edit from "../../Assest/Questionnaire/edit.png";
import './questionchoice.css'
const QuestionComponent = ({
  setPrimaryText,
  setType="default",
  setSecondarytext,
  setDetails,
  typeValue=true

}) => {
  return (
    <Box className="questionnaries-container">
      <Box className="questionnaries-main">
        <Box
          className="title-container"
          sx={{
            backgroundColor: [
              (setType === "default" && "rgb(52, 101, 223)") ||
                (setType === "wrong" && "rgb(227, 108, 108)") ||
                (setType === "correct" && "rgb(61, 142, 61)"),
            ],
          }}
        >
          <Typography variant="body1" color={"white"}>
            {setPrimaryText}
          </Typography>
          <Box className="multiple-choice-container">
            <Typography variant="body1" color={"white"} className="multiple-text">
              {setSecondarytext}
            </Typography>
            {typeValue&&
             <img src={trangle} alt="" className="trangle-iamge" />
            }
           
          </Box>
          <Box className="edit-container">
            <img src={edit} alt="edit-image" className="edit-image" />
          </Box>
        </Box>
        <Box className="questionnaries-details-container">
         <textarea  className="textArea"/>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionComponent;
