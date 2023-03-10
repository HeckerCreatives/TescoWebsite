// ** React
import { useRef } from "react";
import React, { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Form, Field, Formik, useField } from "formik";
import { MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import { Box, Grid, Typography, Modal, Button, TextField } from "@mui/material";

// ** Images
import searchIcon from "../../Assest/Topic/SearchBtn.png";

// ** Style
import "./imagewithlist.css";

// ** Components

import { dropData } from "../../utils/fakedata/fakedata";
import ModalScroll from "../ScrollComponent/ModalScroll";
import DropMenu from "../../shared/DropDownMenu/DropMenu";
import CircularIndeterminate from "../../shared/Spinner/Spinner";
import InputLabel from "../../shared/InputLabel/InputLabel";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import DataTable from "../TabelComponent/TabelComponent";
import QuestionTabComponent from "../QuestionTabComponent/QuestionTabComponent";

// ** Fake Data
import { topicSchema } from "../../utils/validationSchema/validationSchema";

import {
  UseCreateTeacherHooks,
  UseCreateTopicHooks,
  GetTeacherHook,
  UseCreateQuestionHooks,
  GetTopicHook,
  getQuestionairesByUser,
} from "../../utils/CustomQuerHook/CustomQueryHook";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const teacherSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  // middleName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  userName: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
  password: Yup.string()
    .min(2, "minimum 2 character")
    .max(50, "maximum 50 character")
    .required("Required"),
});

const ImageWithListComponent = ({
  tableType,
  questionType = "table",
  searchType = true,
  setImage,
  labelList,
  buttonLabel,
  tableHead,
  cellData,
  optionType = false,
  setting = false,
  setType,
  settingPlaceholder1,
  settingPlaceholder2,
  settingPlaceholder3,
  isLoading,
  cellDataSecond,
  tableHeadSecond,
  pagination = true,
  setSearchParams,
  buttonFrom = "teacher",
}) => {
  const { mutate: questionMutate, isSuccess: questionSucess } =
    UseCreateQuestionHooks();
  const [responses, setResponse] = useState({});
  const [rest, setRest] = useState({});

  useEffect(() => {
    setRest(responses);
  }, [responses]);
  const { data: topicData } = GetTopicHook();
  const [open, setOpen] = useState({
    openTeacher: false,
    openTopic: false,
  });
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);
  const [topicBtn, setTopicBtn] = useState(true);
  const [questionTitle, setQuestionTitle] = useState("");
  const [dropState, setDropState] = useState(null);
  const [searchBtn, setSearchBtn] = useState(false);

  const handleuestionSearch = () => {
    if (searchBtn === true) {
      setSearchParams(null);
      setSearchBtn(false);
    } else {
      setSearchParams(dropState);
      setSearchBtn(true);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    userName: "",
    password: "",
  };
  const initialValuesTopic = {
    topic: "",
    description: "",
  };

  const handleOpen = () => {
    buttonFrom === "teacher" && setOpen({ openTeacher: true });
    buttonFrom === "topic" && setOpenTopic(true);
  };
  const handleCreateQuestion = () => {
    setOpenQuestion(true);
    setTopicBtn(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenQuestion(false);
    setOpenTopic(false);
    setTabComponentQuestion([]);
    setCount(1);
    setQuestionList([]);
  };
  const [error, setError] = useState("");
  const [dropValue, setDropValue] = useState("0");

  const [count, setCount] = useState(1);

  const { data, isSuccess: teacheGetSucces } = GetTeacherHook();
  const [questionList, setQuestionList] = useState([]);

  const [token, setToken] = useState("");
  const auth = jwtDecode(localStorage.getItem("token"));

  const { mutate, isSuccess, isError } = UseCreateTeacherHooks();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const { mutate: topicMutate, isError: topicError } = UseCreateTopicHooks();

  const handleSubmit = (values) => {
    mutate({
      username: values.userName,
      password: values.password,
      lastname: values.lastName,
      firstname: values.firstName,
      middlename: values.middleName,
    });
    if (isError) {
      return setError(isError);
    }
    setOpen(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Teacher created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    GetTeacherHook();
  };

  const handleSubmitQuestion = (value) => {
    console.log("dasdasd");
    const data = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      topic_name: responses && responses?.topic,
      questionnaire_title: questionTitle,
      questions: questionList,
    };
    questionMutate(data);
    setError([]);
    setTabComponentQuestion([]);
    setCount(1);
    setQuestionList([]);
    getQuestionairesByUser(auth.username, auth.role);

    setOpenQuestion(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Question created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const MyTextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea
          className="text-area"
          style={{ height: "10em" }}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  const [tabComponentQuestion, setTabComponentQuestion] = useState([]);

  const handleTabComponent = () => {
    setCount(count + 1);
    const newTab = {
      id: count,
      component: (
        <QuestionTabComponent
          index={count}
          setQuestions={questionList}
          setQuestionTitle={setQuestionTitle}
        />
      ),
    };
    setTabComponentQuestion([...tabComponentQuestion, newTab]);
  };

  const handleSubmitTopics = async (values) => {
    const body = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      topic: values.topic,
      description: values.description,
    };
    topicMutate(body);

    if (topicError) {
      return setError(isError), setOpen({ openTopic: true });
    }
    setOpenTopic(false);
    GetTopicHook();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // password change

  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);
  const [passLoading, setPassLoading] = useState(false);

  const handleChangePassword = async () => {
    const oldPass = oldPassRef.current.value;
    const newPass = newPassRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (oldPass === "" || newPass === "" || confirmPass === "") {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Please complete inputs to change password.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (newPass !== confirmPass) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "New Password and Confirm New Password must match.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setPassLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/change-password`,
        {
          username: auth.username,
          password: newPass,
          oldPassword: oldPass,
        }
      );
      if (res.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully changed!.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: res.data?.error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setPassLoading(false);
    }
  };

  return (
    <Box className="Image-with-list-container">
      <Box className="image-with-list-main">
        <Box className="image-container">
          <motion.div animate={{ rotate: -360, transition: { duration: 0.3 } }}>
            <figure>
              <img src={setImage} alt="" className="image-list" />
            </figure>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              sx={{ marginLeft: "0.3em" }}
              variant="h6"
              color={"grey"}
            >
              {labelList}
            </Typography>
          </motion.div>
        </Box>
        {/* {searchType && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
          >
            <Box
              display={"flex"}
              alignItems="center"
              gap={1}
              paddingLeft={"2em"}
              className="setting-type-container"
              paddingRight={"1em"}
            >
              
              <MDBInputGroup
                className="mb-3"
                noBorder
                textBefore={"Search"}
                textAfter={<MDBIcon fas icon="search" />}
              >
                <input type={"text"} className="form-control" />
              </MDBInputGroup>
            </Box>
          </motion.div>
        )} */}
        {optionType === "none" && (
          <Box padding={3}>
            <ButtonLabel
              buttonLabel={buttonLabel}
              handleCLick={handleOpen}
              setSize="medium"
              styles={{
                fontSize: "1.2em",
                width: "15em",
                backgroundColor: "#ebad00",
                color: "white",
              }}
            />
            <Modal
              hideBackdrop
              open={open.openTeacher}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={teacherSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <Typography variant="h6">Add Teacher</Typography>
                      <Field name="firstName" placeholder="firstname" />
                      {errors.firstName && touched.firstName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.firstName}
                        </p>
                      ) : null}
                      <Field name="middleName" placeholder="middlename" />
                      {errors.middleName && touched.middleName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.middleName}
                        </p>
                      ) : null}
                      <Field name="lastName" placeholder="lastname" />
                      {errors.lastName && touched.lastName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.lastName}
                        </p>
                      ) : null}

                      <Field
                        name="userName"
                        placeholder="username"
                        type="text"
                      />
                      {errors.userName && touched.userName ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.userName}
                        </p>
                      ) : null}
                      <Field
                        name="password"
                        type="password"
                        placeholder="password"
                      />
                      {errors.password && touched.password ? (
                        <p style={{ fontSize: "1em", color: "red" }}>
                          {errors.password}
                        </p>
                      ) : null}

                      <Button type="submit">Apply</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </Box>
        )}
        {
          <Modal
            hideBackdrop
            open={openTopic}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style }}>
              <Formik
                initialValues={initialValuesTopic}
                // validationSchema={topicSchema}
                onSubmit={(values) => {
                  handleSubmitTopics(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6">Add Topics</Typography>
                    <Typography>Topic :</Typography>
                    <Field name="topic" placeholder="enter topics" />
                    {errors.topic && touched.topic ? (
                      <p style={{ fontSize: "1em", color: "red" }}>
                        {errors.topic}
                      </p>
                    ) : null}
                    {/* <DropMenu
                      inputDropmenu={true}
                      dropValue={data && data.data}
                      setDropValue={setDropValue}
                    /> */}

                    <MyTextArea
                      label={"Description"}
                      name="description"
                      placeholder="enter your description"
                    />

                    <Button type="submit">Apply</Button>
                    <Button onClick={handleClose}>Close</Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
        }
      </Box>
      {optionType === "option" && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Modal
            hideBackdrop
            open={openQuestion}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...styles }}>
              <Formik
                initialValues={initialValuesTopic}
                // validationSchema={topicSchema}
                onSubmit={(values) => {
                  handleSubmitQuestion(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Typography variant="h6" marginBottom={"1em"}>
                      CREATE QUESTIONS
                    </Typography>
                    <Box padding={2}>
                      <TextField
                        color="secondary"
                        fullWidth="true"
                        id="outlined-basic"
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        label="Questionnaries title"
                        variant="outlined"
                      />
                    </Box>

                    {error && (
                      <Typography color={"red"} variant="body2">
                        {error}
                      </Typography>
                    )}
                    <ModalScroll>
                      {tabComponentQuestion?.map((each, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 },
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.3 },
                          }}
                          key={index}
                          style={{ marginBottom: "1em" }}
                        >
                          {each.component}
                        </motion.div>
                      ))}
                    </ModalScroll>

                    <Button
                      onClick={handleTabComponent}
                      disabled={count > 100 ? true : false}
                    >
                      Add New Form
                    </Button>
                    <Button type="submit">Apply</Button>
                    <Button onClick={handleClose}>Close</Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
          <Grid
            container
            direction={"row"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            gap={5}
            padding={2}
          >
            <Grid item xs={12} lg={3} xl={3}>
              <DropDownMenu
                defaultValue={"Choose Topics"}
                setTopic={setTopicBtn}
                dropValue={topicData}
                setResponse={setResponse}
                topicType={true}
                yearType={true}
              />
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <Typography>Date</Typography>
              <Typography>{responses && responses?.date}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <Typography>Generated Code</Typography>
              <Typography>{responses && responses?.generatedCode}</Typography>
            </Grid>
            <Grid item xs={12} lg={12} xl={12}>
              <ButtonLabel
                buttonLabel={buttonLabel}
                handleCLick={handleCreateQuestion}
                disabledBtn={topicBtn}
                setSize="medium"
                styles={{
                  fontSize: "1.2em",
                  width: "15em",
                  backgroundColor: "#ebad00",
                  color: "white",
                }}
              />
            </Grid>
          </Grid>
          <Box padding={2} display="flex" alignItems={"center"} gap={5}>
            <DropDownMenu
              defaultValue={"Choose Topics"}
              dropValue={topicData}
              topicType={true}
              yearType={true}
              returnType={true}
              getDropState={setDropState}
            />

            <Button variant="outlined" onClick={handleuestionSearch}>
              {searchBtn ? "Cancel" : "Search"}
            </Button>
          </Box>
        </motion.div>
      )}
      {questionType === "table" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", padding: "1em" }}
            >
              <CircularIndeterminate />
            </Box>
          ) : (
            <Box padding={2}>
              <DataTable
                cellData={cellData}
                tableHead={tableHead}
                tableType={tableType}
                pagination={pagination}
                buttonFrom={buttonFrom}
                cellData2={cellDataSecond}
                tableHeadSecond={tableHeadSecond}
              />
            </Box>
          )}
        </motion.div>
      )}
      {questionType === "question-choice" && (
        // <ScrollComponent styles={{  padding: "1em" }}>

        <Grid container spacing={5} padding={2}>
          <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
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
                setDropValue={setDropValue}
              />
            </motion.div>
          </Grid>
          {dropValue === "0" ? (
            <>
              <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"correct"}
                    setPrimaryText={"CHOICE 1:"}
                    setSecondarytext={"Correct"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>

              <Grid item lg={6} md={12} xl={6} sm={12} sx={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 2:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>

              <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 3:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>
              <Grid item lg={6} md={12} xl={6} sx={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 4:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={12} md={12} xl={12} sx={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionComponent
                    setType={"wrong"}
                    setPrimaryText={"CHOICE 4:"}
                    setSecondarytext={"Wrong"}
                    setDetails={
                      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
                    }
                  />
                </motion.div>
              </Grid>
            </>
          )}
        </Grid>

        // </ScrollComponent>
      )}
      {questionType === "question-answer" && (
        <Grid container spacing={5} padding={2}>
          {/* <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
              <QuestionComponent
              setType={"default"}
              setPrimaryText={"QUESTION1:"}
             
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
              dropData={dropData}
              setDropValue={setDropValue}
              
            />
              </motion.div>
          
          </Grid> */}
          {/* MULTIPLE CHOICE CONTAINER */}
          {
            //   dropValue==="0"?
            //   <>
            //    <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            //    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            // <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
            // <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            //   </>
            //   :
            //   <>
            //    <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
            //    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.4}}}>
            //     <QuestionComponent
            //     setType={"correct"}
            //     setPrimaryText={"Answer"}
            //     typeValue={false}
            //     setDetails={
            //       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
            //     }
            //   />
            //     </motion.div>
            // </Grid>
            //   </>
          }
        </Grid>
      )}
      {setting && (
        <Grid padding={2} container spacing={5} className="setting-grid">
          <Grid item xl={4}>
            <input
              type="password"
              placeholder="Old Password"
              ref={oldPassRef}
              className="changepass-input"
            />
          </Grid>
          <Grid item xl={4}>
            <input
              type="password"
              placeholder="New Password"
              ref={newPassRef}
              className="changepass-input"
            />
          </Grid>
          <Grid item xl={4}>
            <input
              type="password"
              placeholder="Confirm New Password"
              ref={confirmPassRef}
              className="changepass-input"
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            padding={2}
            marginLeft="auto"
          >
            <button
              onClick={handleChangePassword}
              buttonLabel="Save"
              className="changepass-btn"
              disabled={passLoading}
            >
              SAVE
            </button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ImageWithListComponent;
