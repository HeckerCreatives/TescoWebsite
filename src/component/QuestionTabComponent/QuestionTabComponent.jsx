import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import ModalScroll from "../ScrollComponent/ModalScroll";
import { motion } from "framer-motion";
import { dropData } from "../../utils/fakedata/fakedata";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

const QuestionTabComponent = ({
  index,
  setMultiple,
  setIdentification,
  handleApply,
  responseTopic,
  responseCode,
  responseDate
}) => {
  const [openModalContainer, setModalContainer] = useState(false);
  const [dropModalValue, setDropModalValue] = useState("0");
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [correct, setCorrect] = useState("");
  const [correctIdintfy, setCorrectIdintfy] = useState("");
  const [questionIdentiy, setQuestionIdentiy] = useState("");
  const [disbledBtn, setDisableBtn] = useState(true);
  const [saveState, setSaveState] = useState(false);
  const[errors,setErrors]=useState("")
 
  useEffect(() => {
    question && setDisableBtn(false);
  }, [question]);

  // useEffect(()=>{
  //     setMultiple&&setMultiple(multipleData)
  // },[multipleData])
 

  

  const handleSave = () => {
    let data = {
      question: question,
      choiceA: choiceA,
      choiceB: choiceB,
      choiceC: choiceC,
      correct:correct,
      topic:responseTopic,
      generatedCode:responseCode,
      date:responseDate
    };
    let datas = {
      question: question,
      correct: correctIdintfy,
      topic:responseTopic,
      generatedCode:responseCode,
      date:responseDate
    };
    setSaveState(true);
    setModalContainer(false);
    dropModalValue === "0"&&data&&setMultiple.push(data);
    dropModalValue === "1" &&datas&&setIdentification.push(datas);
  };
  const handlePopUp = () => {
    if(saveState===true){
    setModalContainer(false)
   
    }
    else{
    setModalContainer(true);
    setErrors("fill up data or save data first")
    }
      
  };

  return (
    <div>
      <Box
        sx={{
          // backgroundColor:"rgba(140, 145, 171, 0.52)",
          padding: "0.5em",
          borderRadius: "0.7em",
          // color:"white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          // boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        }}
      >
        <Typography fontSize={"large"} letterSpacing={4}>
          {index}.Question
        </Typography>
        <div onClick={handlePopUp}>
          <SwapVerticalCircleIcon />
        </div>
      </Box>

      {openModalContainer && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
        >
            
          <Grid container spacing={5} padding={2} marginTop="1em">
           
            <button
              onClick={handleSave}
              disabled={disbledBtn}
              type="button"
              style={{
                border: "none",
                outline: "none",
                paddingLeft: "0.3em",
                paddingRight: "0.2em",
                letterSpacing: "0.3em",
                marginLeft: "3em",
              }}
            >
              {saveState ? "Saved" : "Save"}
            </button>
            {errors&&<Typography color={"red"} variant="body2">{errors}</Typography>}
            <ModalScroll>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                sm={12}
                sx={{ marginBottom: "2em" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"default"}
                    setPrimaryText={"QUESTION1:"}
                    setSecondarytext={"MULTIPLE CHOICE"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                    dropData={dropData}
                    setDropValue={setDropModalValue}
                    setTextChange={setQuestion}
                  />
                </motion.div>
              </Grid>
              {dropModalValue === "0" ? (
                <>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    sx={12}
                    sm={12}
                    marginBottom="1em"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionComponent
                        setType={"wrong"}
                        setPrimaryText={"CHOICE A:"}
                        setSecondarytext={"Wrong"}
                        setDetails={
                          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                        }
                        setTextChange={setChoiceA}
                      />
                    </motion.div>
                  </Grid>

                  <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    sx={12}
                    sm={12}
                    marginBottom="1em"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionComponent
                        setType={"wrong"}
                        setPrimaryText={"CHOICE B:"}
                        setSecondarytext={"Wrong"}
                        setDetails={
                          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                        }
                        setTextChange={setChoiceB}
                      />
                    </motion.div>
                  </Grid>

                  <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    sx={12}
                    sm={12}
                    marginBottom="1em"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionComponent
                        setType={"wrong"}
                        setPrimaryText={"CHOICE C:"}
                        setSecondarytext={"Wrong"}
                        setDetails={
                          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                        }
                        setTextChange={setChoiceC}
                      />
                    </motion.div>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    sx={12}
                    sm={12}
                    marginBottom="1em"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionComponent
                        setType={"correct"}
                        setPrimaryText={"CORRECT ANSWER:"}
                        setDetails={
                          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                        }
                        setTextChange={setCorrect}
                      />
                    </motion.div>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item lg={12} md={12} xl={12} sx={12} sm={12}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionComponent
                        setType={"correct"}
                        setPrimaryText={"Answer:"}
                        setDetails={
                          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                        }
                        setTextChange={setCorrectIdintfy}
                      />
                    </motion.div>
                  </Grid>
                </>
              )}
            </ModalScroll>
          </Grid>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionTabComponent;
