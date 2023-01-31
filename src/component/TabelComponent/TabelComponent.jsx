import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Modal,
  Button,
  Typography,
  Grid,
  TextField,
  Input,
} from "@mui/material";
import { motion } from "framer-motion";
import { Form, Field, Formik, useField } from "formik";
import DropMenu from "../../shared/DropDownMenu/DropMenu";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../shared/Modal/Modal";
import {
  DeleteTeacherHook,
  DeleteTopicHook,
  TopicUpdateHooks,
  UseUpdate,
  GetTeacherHook,
  DeleteQuestionHook,
  UseUpdateQuestionHooks,
} from "../../utils/CustomQuerHook/CustomQueryHook";
import PaginationAdd from "../pagination/Pagination";

import "./table.css";
import Swal from "sweetalert2";
import { topicSchema } from "../../utils/validationSchema/validationSchema";
import {
  resultMultipleData,
  resultShowData,
} from "../../utils/fakedata/fakedata";
import CustomSearch from "../SearchBar/CustomSearch";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import ModalScroll from "../ScrollComponent/ModalScroll";
import QuestionTabComponent from "../QuestionTabComponent/QuestionTabComponent";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getQuestion } from "../../utils/CustomQuerHook/CustomQueryHook";
import { useQuery } from "react-query";
import logo from "../../Assest/Navigation/title.png";
import PrintResults from "../PrintComponents/Results/Results";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MDBIcon } from "mdb-react-ui-kit";
import Questionaires from "../PrintComponents/Questionaires/Questionaires";

const TabelComponent = ({
  cellData,
  pagination,
  tableHead = [],
  tableType,
  buttonFrom,
  cellData2,
  tableHeadSecond,
}) => {
  const resultRef = useRef();
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
  const [data, setData] = useState([]);
  const [ids, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openTopicDelete, setTopicDelete] = useState(false);
  const [openTopicEdit, setTopicEdit] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [openQuestionnareEdit, setQuestionnareEdit] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(false);
  const [errors, setError] = useState("");
  const [indexs, setIndex] = useState("");
  const [openShow, setOpenShow] = useState(false);
  const [initialValueQuestionnaires, setInitialValueQuestionnaires] = useState({
    topic_name: "",
    questions: [],
  });
  const [activeQuestions, setActiveQuestions] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [dropValue, setDropValue] = useState("");
  const { mutate, isError } = DeleteTeacherHook();
  const questions = useQuery(["question-data", null], getQuestion);

  const [rows, setRows] = useState(
    cellData && (cellData?.data?.results || cellData?.data?.data)
  );

  const [token, setToken] = useState("");
  const [role, setRole] = useState();
  const [openQuestionDelete, setOpenQuestionDelete] = useState(false);
  const { mutate: questionDeleteMutate } = DeleteQuestionHook();
  const { mutate: questionMutate } = UseUpdateQuestionHooks();
  const { data: teacherData, isSuccess: teacheGetSucces } = GetTeacherHook();
  const {
    mutate: topicUpdateMutate,
    isSuccess: topicUpdateSuccess,
    isError: topicUpdateError,
  } = TopicUpdateHooks();
  const {
    mutate: topicDeleteMutate,
    isSuccess: topicDeleteSuccess = false,
    isError: topicDeleteError,
  } = DeleteTopicHook();
  const {
    isError: editError,
    mutate: editMutate,
    isSuccess: editSuccess,
  } = UseUpdate();

  const handleClose = () => {
    setOpen(false);
    setOpenShow(false);
    setTopicDelete(false);
    setOpenQuestionDelete(false);
    setQuestionnareEdit(false);
    openPrintModal(false);
  };
  const handleOpen = _id => {
    setOpen(true);
    setId(_id);
  };
  const handleOpenEdit = (_id, index) => {
    setOpenEdit(true);
    setId(_id);
    setIndex(index);
  };
  const printResult = useReactToPrint({
    content: () => resultRef.current,
  });

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTopicEdit(false);
  };
  const handleSubmit = () => {
    mutate(ids);
    if (isError) {
      return setError(isError);
    }
    setOpen(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Teacher deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleSubmitTopicEdit = async values => {
    const data = {
      id: ids,
      topic: values.topic,
      description: values.description,
    };
    topicUpdateMutate(data);
    setTopicEdit(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const updateQuestionnaires = () => {
    const token = localStorage.getItem("token");
    const data = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...initialValueQuestionnaires,
    };
    questionMutate(data);
    console.log(initialValueQuestionnaires, "setQuestionsClone");
  };

  const handleSubmitEdit = async values => {
    const data = {
      id: ids,
      username: values.userName,
      lastname: values.lastName,
      middlename: values.middleName,
      firstname: values.firstName,
    };
    editMutate(data);
    setOpenEdit(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Teacher updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    userName: "",
  };
  const initialValueTopic = {
    topic: "",
    description: "",
  };

  useEffect(() => {
    const token = localStorage.getItem("_id");
    const role = localStorage.getItem("role");
    setToken(token);
    setRole(role);
  });

  useEffect(() => {
    // console.log(indexs,'indexs')
    cellData?.data?.data?.map((each, index) => {
      if (index === indexs) {
        initialValueTopic.description = each?.description;
        initialValueTopic.topic = each?.topic;
      }
    });
  }, [indexs, initialValueTopic, cellData]);

  useEffect(() => {
    // console.log(indexs, "indexs");
    cellData?.data?.response?.map((each, index) => {
      if (index === indexs) {
        setInitialValueQuestionnaires(prev => {
          return {
            ...prev,
            _id: each._id,
            questions: each?.questions,
            topic_name: each?.topic_name,
          };
        });
        setQuestionCount(each?.questions.length);
      }
    });
  }, [indexs, cellData]);

  useEffect(() => {
    // console.log(indexs,'indexs')
    cellData?.data?.data?.map((each, index) => {
      if (index === indexs) {
        initialValues.firstName = each?.firstname;
        initialValues.lastName = each?.lastname;
        initialValues.middleName = each?.middlename;

        initialValues.userName = each?.username;
      }
    });
  }, [indexs, initialValues, cellData]);

  const handleTopicModal = _id => {
    setTopicDelete(true);
    setId(_id);
  };

  const handleTopicEditModal = (_id, index) => {
    setTopicEdit(true);
    setId(_id);
    setIndex(index);
  };

  const handleQuestionnaresEdit = (_id, index) => {
    setQuestionnareEdit(true);
    setId(_id);
    setIndex(index);
  };

  const handleTopicDelete = () => {
    topicDeleteMutate(ids);
    if (topicDeleteError) {
      return setError(isError);
    }
    setTopicDelete(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Topic deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
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
  });

  const requestTopicSearch = values => {
    const filterData = cellData?.data?.data.filter(row => {
      return row.topic.toLowerCase().includes(values.toLowerCase());
    });
    setRows(filterData);
  };

  const requestInstructorSearch = values => {
    const filterData = cellData?.data?.data.filter(row => {
      return row.name.toLowerCase().includes(values.toLowerCase());
    });
    setRows(filterData);
  };

  const requestGeneratedSearch = values => {
    const filterData = cellData?.data?.data.filter(row => {
      return row.generatedCode.toLowerCase().includes(values.toLowerCase());
    });
    setRows(filterData);
  };

  const handleDeleteQuestion = _id => {
    setOpenQuestionDelete(true);
    setId(_id);
  };
  const handleSubmitDeleteQuestion = () => {
    questionDeleteMutate(ids);
    setOpenQuestionDelete(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Question deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleShowClick = data => {
    setActiveQuestions(data);
    setOpenShow(true);
  };

  const ShowQuestions = data => {
    const questions = data.questionaireId?.questions;
    const answers = data.answer;

    if (questions) {
      let texts = [];

      questions?.map(question => {
        let ans = answers.find(e => e.questionId === question._id);
        texts.push({
          question: question.question,
          answer: ans.answer,
          correct: question.answer,
          isCorrect: ans.answer === question.answer,
        });
      });

      return texts.map((text, i) => (
        <div>
          <div>
            {text.isCorrect ? (
              <MDBIcon far icon="check-circle" color="success" />
            ) : (
              <MDBIcon far icon="times-circle" color="danger" />
            )}
            &nbsp;
            {i + 1}. {text.question}{" "}
          </div>
          <div>
            Your answer: {text.answer} (
            {!text.isCorrect && <span>Correct Answer: {text.correct}</span>})
          </div>
          <br />
        </div>
      ));
    }
  };

  const handleScore = data => {
    const questions = data.questionaireId?.questions;
    const answers = data.answer;

    if (questions) {
      let total = 0;

      questions.map(question => {
        let ans = answers.find(e => e.questionId === question._id);
        if (ans.answer === question.answer) total++;
      });

      return `${total}/${questions.length}`;
    }
  };

  return (
    <>
      {tableType === "topic" && (
        <TableContainer component={Paper} style={{ padding: "0.7em" }}>
          <CustomSearch
            requestInstructorSearch={requestInstructorSearch}
            requestTopicSearch={requestTopicSearch}
            requestGeneratedSearch={requestGeneratedSearch}
            labelFst="Search with topic"
            lableSnd={"Search with instructor"}
            lableThd="Search with generated code"
          />
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map(each => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows?.map((row, index) =>
                  role === "teacher" ? (
                    row.user_id === token && (
                      <TableRow key={index}>
                        <TableCell>{row.generatedCode}</TableCell>
                        <TableCell>{row.topic}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2em",
                          }}
                        >
                          <button
                            onClick={() => handleTopicEditModal(row._id, index)}
                            style={{
                              color: "white",
                              backgroundColor: "blue",
                              minWidth: "5em",
                              borderRadius: "0.5em",
                              border: "none",
                            }}
                          >
                            edit
                          </button>
                          <button
                            onClick={() => handleTopicModal(row._id)}
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              minWidth: "5em",
                              borderRadius: "0.5em",
                              border: "none",
                            }}
                          >
                            delete
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow key={index}>
                      <TableCell>{row.generatedCode}</TableCell>
                      <TableCell>{row.topic}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2em",
                        }}
                      >
                        <button
                          onClick={() => handleTopicEditModal(row._id, index)}
                          style={{
                            color: "white",
                            backgroundColor: "blue",
                            minWidth: "5em",
                            borderRadius: "0.5em",
                            border: "none",
                          }}
                        >
                          edit
                        </button>
                        <button
                          onClick={() => handleTopicModal(row._id)}
                          style={{
                            color: "white",
                            backgroundColor: "red",
                            minWidth: "5em",
                            borderRadius: "0.5em",
                            border: "none",
                          }}
                        >
                          delete
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "teacher" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map(each => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData &&
                cellData?.data?.data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                      }}
                    >
                      <button
                        onClick={() => handleOpenEdit(row._id, index)}
                        style={{
                          color: "white",
                          backgroundColor: "blue",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        edit
                      </button>
                      <button
                        onClick={() => handleOpen(row._id)}
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          minWidth: "5em",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* **modal for delete component** */}
      {
        <ModalComponent open={open}>
          <Typography>Are you sure want to delete?</Typography>
          <Box sx={{ padding: "1em" }}>
            <Button color="warning" onClick={handleSubmit}>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </ModalComponent>
      }
      {
        <ModalComponent open={openQuestionDelete}>
          <Typography>Are you sure want to delete?</Typography>
          <Box sx={{ padding: "1em" }}>
            <Button color="warning" onClick={handleSubmitDeleteQuestion}>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </ModalComponent>
      }
      {
        <ModalComponent open={openTopicDelete}>
          <Typography>Are you sure want to delete?</Typography>
          <Box sx={{ padding: "1em" }}>
            <Button color="warning" onClick={handleTopicDelete}>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </Box>
        </ModalComponent>
      }
      {/* THIS IS TEACHER EDIT MODAL */}
      {
        <ModalComponent open={openEdit} handleClose={handleClose}>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={teacherSchema}
              onSubmit={values => {
                handleSubmitEdit(values);
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
                  <Typography variant="h6">Update Teacher</Typography>
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

                  <Field name="userName" placeholder="username" type="text" />
                  {errors.userName && touched.userName ? (
                    <p style={{ fontSize: "1em", color: "red" }}>
                      {errors.userName}
                    </p>
                  ) : null}

                  <Button type="submit">Update</Button>
                  <Button onClick={handleCloseEdit}>Close</Button>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalComponent>
      }
      {/* THIS IS TOPIC EDIT MODAL */}
      {
        <ModalComponent open={openTopicEdit} handleClose={handleClose}>
          <Formik
            initialValues={initialValueTopic}
            // validationSchema={topicSchema}
            onSubmit={values => {
              handleSubmitTopicEdit(values);
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
                <Typography variant="h6">Update Topics</Typography>
                <Field name="topic" placeholder="enter topics" />
                {errors.topic && touched.topic ? (
                  <p style={{ fontSize: "1em", color: "red" }}>
                    {errors.topic}
                  </p>
                ) : null}
                <MyTextArea
                  label={"Description"}
                  name="description"
                  placeholder="enter your description"
                />

                <Button type="submit">Update</Button>
                <Button onClick={handleCloseEdit}>Close</Button>
              </Form>
            )}
          </Formik>
        </ModalComponent>
      }
      {/* THIS IS Questionnaires EDIT MODAL */}
      {
        <ModalComponent open={openQuestionnareEdit} handleClose={handleClose}>
          {/* <Box sx={{ ...styles }}> */}
          <Formik
            initialValues={initialValueQuestionnaires}
            validationSchema={topicSchema}
            // onSubmit={(values) => {
            //   handleSubmitQuestion(values);
            // }}
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
                    name="title"
                    value={initialValueQuestionnaires.topic_name}
                    onChange={e =>
                      setInitialValueQuestionnaires(prev => {
                        return {
                          ...prev,
                          topic_name: e.target.value,
                        };
                      })
                    }
                    label="Questionnaries title"
                    variant="outlined"
                  />
                </Box>

                {/* {error && (
                  <Typography color={"red"} variant="body2">
                    {error}
                  </Typography>
                )} */}
                <ModalScroll>
                  {initialValueQuestionnaires?.questions?.map((each, index) => {
                    return (
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
                        <QuestionTabComponent
                          index={index + 1}
                          setQuestions={initialValueQuestionnaires?.questions}
                          setQuestionTitle={setQuestionTitle}
                          type="update"
                          defaultQuestionValue={each.question}
                          dropModalType={each.type}
                          defaultAnswerValue={each.answer}
                          defaultChoices={{
                            choice1: each.choice1,
                            choice2: each.choice2,
                            choice3: each.choice3,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </ModalScroll>

                <Button
                  onClick={() => {
                    setInitialValueQuestionnaires(prev => {
                      return {
                        ...prev,
                        questions: [
                          ...prev.questions,
                          {
                            question: "",
                            answer: "",
                            number: questionCount + 1,
                            type: "1",
                          },
                        ],
                      };
                    });
                  }}
                >
                  Add New Form
                </Button>
                <Button type="submit" onClick={updateQuestionnaires}>
                  Apply
                </Button>
                <Button onClick={handleClose}>Close</Button>
              </Form>
            )}
          </Formik>
          {/* </Box> */}
        </ModalComponent>
      }

      {/* SHOW RESULT MODAL */}
      {
        <ModalComponent open={openShow} handleClose={handleClose}>
          <>
            <Typography fontSize={25} marginBottom={2.5} fontWeight="bold">
              {activeQuestions.questionaireId?.questionnaire_title}
            </Typography>
            <div className="result-scroll-container">
              {ShowQuestions(activeQuestions)}
            </div>

            <Typography fontWeight="bold" textAlign="right">
              Overall Score: {handleScore(activeQuestions)}
            </Typography>
            <br />

            <Button onClick={handleClose}>Close</Button>
          </>
        </ModalComponent>
      }

      {/* PRINT RESULT MODAL */}
      {
        <ModalComponent open={openPrintModal} handleClose={handleClose}>
          <Box
            p={5}
            ref={resultRef}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box flex={0.6}>
              <Typography>
                <img
                  src={logo}
                  alt=""
                  className="iamge-logonavbar"
                  style={{
                    width: "10em",
                    backgroundColor: "#1750df",
                    padding: 5,
                  }}
                />
              </Typography>
              <Typography py={4}>
                THIS IS A WUESTIONNAIRE FOR THE EXAM PLEASE DON'T WRITE ANYTHING
                HERE AND IF HAVE ANY QUESTIONS, PLEASE LOOK FOR A INSTRUCTOR
              </Typography>
              {questions?.data?.data?.response.map((each, index) => {
                return (
                  <Box key={index}>
                    <Typography pb={3}>{each.questionnaire_title}</Typography>
                    {each?.questions.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Typography pb={2}>{item.question}</Typography>
                          {item.type === "0" ? (
                            <Box pb={2}>
                              <Typography>1) {item.choice1}</Typography>
                              <Typography py={1}>2) {item.choice2}</Typography>
                              <Typography>3) {item.choice3}</Typography>
                            </Box>
                          ) : (
                            <Box>___________________________________</Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
            <Box>
              {questions?.data?.data?.response.map((each, index) => {
                return (
                  <Box key={index}>
                    {each?.questions.map((item, index) => {
                      return (
                        <Box key={index} mt={2}>
                          <Input style={{ border: "1px solid" }} />
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              printResult();
              setOpenPrintModal(false);
            }}
          >
            Print
          </Button>
        </ModalComponent>
      }

      {tableType === "result" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map(each => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cellData &&
                cellData?.data?.results?.map((each, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span style={{ textTransform: "capitalize" }}>{`${
                        each.lastname
                      }, ${each.firstname} ${
                        each.middlename && each.middlename?.substring(0, 1)
                      }.`}</span>
                    </TableCell>
                    <TableCell>
                      {each?.questionaireId?.questionnaire_id}
                    </TableCell>
                    <TableCell>{each?.questionaireId?.topic_name}</TableCell>
                    <TableCell>
                      {each?.questionaireId?.questionnaire_title}
                    </TableCell>
                    <TableCell>{each?.questionaireId?.instructor}</TableCell>

                    <TableCell>
                      {new Date(
                        each?.questionaireId?.date
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                      }}
                    >
                      <PDFDownloadLink
                        document={<PrintResults data={each} />}
                        fileName={`${each.firstname}-${each.lastname}-${each?.questionaireId?.questionnaire_title}`}
                        style={{
                          color: "white",
                          backgroundColor: "blue",
                          minWidth: "5em",
                          fontSize: "0.8rem",
                          padding: "0.05rem 0",
                          borderRadius: "0.5em",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Print
                      </PDFDownloadLink>
                      <button
                        onClick={() => handleShowClick(each)}
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          minWidth: "5em",
                          fontSize: "0.8rem",
                          padding: "0.05rem 0",
                          borderRadius: "0.5em",
                          border: "none",
                        }}
                      >
                        Show
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tableType === "passer" && (
        <TableContainer component={Paper}>
          <Table aria-label="table-container">
            <TableHead>
              <TableRow>
                {tableHead.map(each => (
                  <TableCell>{each.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell style={{ color: "green" }}>
                      {row.correct}
                    </TableCell>
                    <TableCell style={{ color: "red" }}>{row.wrong}</TableCell>
                    <TableCell
                      style={{ color: "blue" }}
                    >{`${row.result}%`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tableType === "quetion-identifier" && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="table-container">
              <TableHead>
                <TableRow>
                  {tableHead.map(each => (
                    <TableCell>{each.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cellData &&
                  cellData?.data?.data?.map((each, index) => (
                    <TableRow key={index}>
                      <TableCell>{each?.questionnaire_id}</TableCell>
                      <TableCell>{each?.topic_name}</TableCell>
                      <TableCell>{each?.questionnaire_title}</TableCell>
                      <TableCell>{each?.instructor}</TableCell>

                      <TableCell>
                        {new Date(each?.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2em",
                        }}
                      >
                        <PDFDownloadLink
                          document={<Questionaires data={each} />}
                          fileName={`${each?.questionnaire_title}-${new Date(
                            each?.date
                          ).toLocaleDateString()}`}
                          style={{
                            color: "white",
                            backgroundColor: "blue",
                            minWidth: "5em",
                            fontSize: "0.8rem",
                            padding: "0.05rem 0",
                            borderRadius: "0.5em",
                            border: "none",
                            textAlign: "center",
                          }}
                        >
                          Print
                        </PDFDownloadLink>
                        <button
                          style={{
                            color: "white",
                            backgroundColor: "blue",
                            minWidth: "5em",
                            fontSize: "0.8rem",
                            padding: "0.05rem 0",
                            borderRadius: "0.5em",
                            border: "none",
                          }}
                          onClick={() =>
                            handleQuestionnaresEdit(each._id, index)
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(each._id)}
                          style={{
                            color: "white",
                            backgroundColor: "red",
                            minWidth: "5em",
                            borderRadius: "0.5em",
                            fontSize: "0.8rem",
                            padding: "0.05rem 0",
                            border: "none",
                          }}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box
              justifyContent={"center"}
              alignItems="center"
              display={"flex"}
              margin="2em 0em"
            >
              <PaginationAdd setProducts={e => setData(e)} rawData={""} />
            </Box>
          </TableContainer>
        </>
      )}

      {/* {pagination && (
        <Box
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          margin="2em 0em"
        >
          <PaginationAdd setProducts={(e) => setData(e)} rawData={""} />
        </Box>
      )} */}
    </>
  );
};

export default TabelComponent;
