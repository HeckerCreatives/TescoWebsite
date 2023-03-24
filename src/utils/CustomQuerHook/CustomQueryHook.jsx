import axios from "axios";
import { Snackbar } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { endpoints } from "../endpoints/endpoints";

const createTeacher = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}${endpoints.createTeacher}`,
    data
  );
};

const getTeacher = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.getTeacher}`
  );
};

const countTeachers = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.countTeachers}`
  );
};

const countTopics = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.countTopics}`
  );
};

const countQuestions = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.countQuestions}`
  );
};

const deleteTeacher = async (data) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${endpoints.deleteTeacher}/${data}`
  );
};

const editTeacher = async (body) => {
  const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/teacher`, body);
  return response.data;
};

const getSingleTeacher = async (data) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/teacher/${data}`);
};

export const getResultsByUser = async (username) => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/result/${username}/find`
  );
};

export const getQuestionairesByUser = async (username, role) => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/questions-by-user/${username}/${role}`
  );
};

const deleteQuestion = async (id) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${endpoints.deleteQuestion}/${id}`
  );
};

const createQuestion = async (data) => {
  const { headers, ...datas } = data;
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}${endpoints.createQuestion}`,
    datas,
    { headers }
  );
};

const updateQuestion = async (data) => {
  const { headers, ...datas } = data;
  return await axios.put(
    `${process.env.REACT_APP_BASE_URL}${endpoints.updateQuestion}`,
    datas,
    { headers }
  );
};

export const getQuestion = async (tp) => {
  const { queryKey } = tp && tp;
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.getQuestion}/?tp=${
      queryKey && queryKey[1]
    }`
  );
};

const getResult = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.getResult}`
  );
};

//user authentication
const loginUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}${endpoints.login}`,
    data
  );
  return response;
};

const createTopic = async (data) => {
  const { headers, ...datas } = data;

  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}${endpoints.createTopic}`,
    datas,
    { headers }
  );
};
const getTopic = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BASE_URL}${endpoints.getAllTopic}`
  );
};
const deleteTopic = async (data) => {
  return await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${endpoints.deleteTopic}/${data}`
  );
};

export const UseCreateQuestionHooks = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("question-data");
    },
  });
};

export const UseUpdateQuestionHooks = () => {
  const queryClient = useQueryClient();
  return useMutation(updateQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("question-data");
    },
  });
};

export const GetQuestionHook = (query) => {
  return useQuery(["question-data", query], getQuestion);
};

export const DeleteQuestionHook = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("question-data");
    },
    onError: ({ message }) => {
      setDeletionError(message);
    },
  });
};

export const GetResultHook = (onSuccess, onError) => {
  return useQuery("result-data", getResult, {
    onSuccess,
    onError,
  });
};

export const GetResultByUserHook = (username, onSuccess, onError) => {
  return useQuery("result-by-user", () => getResultsByUser(username), {
    onSuccess,
    onError,
  });
};

export const GetQuestionsByUserHook = (username, role, onSuccess, onError) => {
  return useQuery(
    "question-by-user",
    () => getQuestionairesByUser(username, role),
    {
      onSuccess,
      onError,
    }
  );
};

export const UseLogin = (setError) => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-data");
    },
  });
};

export const UseCreateTopicHooks = () => {
  const queryClient = useQueryClient();
  return useMutation(createTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries("topic-data");
    },
  });
};

export const GetTopicHook = (onSuccess, onError) => {
  return useQuery("topic-data", getTopic, {
    onSuccess,
    onError,
  });
};

export const DeleteTopicHook = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTopic, {
    onSuccess: () => {
      queryClient.invalidateQueries("topic-data");
    },
    onError: ({ message }) => {
      setDeletionError(message);
    },
  });
};

export const TopicUpdateHooks = () => {
  return useMutation((variables) => {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-topic`, variables);
  });
};

export const UseCreateTeacherHooks = () => {
  const queryClient = useQueryClient();
  return useMutation(createTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
  });
};

export const GetTeacherHook = (onSuccess, onError) => {
  return useQuery("teacher-data", getTeacher, {
    onSuccess,
    onError,
  });
};

export const CountTeachersHook = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-teachers`);

  return response.data;
};

export const CountTopicsHook = async () => {
  // return useQuery("topic-count", countTopics, {
  //   onSuccess,
  //   onError,
  // });
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/count-teachers`);

  return response.data;
};

export const CountQuestionsHook = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/count-all-questions`
  );

  return response.data;
};

export const CountMyTopicsHook = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/count-my-topic?user_id=${data.user_id}`
  );

  return response.data;
};

export const CountMyQuestionsHook = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/api/count-my-questions?username=${data.username}`
  );

  return response.data;
};

export const DeleteTeacherHook = (setDeletionError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
    onError: ({ message }) => {
      setDeletionError(message);
    },
  });
};

export const UpdateTeacherHook = () => {
  const queryClient = useQueryClient();
  return useMutation(editTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-data");
    },
    onError: ({ message }) => {},
  });
};

export const UseUpdate = () => {
  return useMutation((variables) => {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/api/teacher`, variables);
  });
};

export const GetSingleTeacherHook = (onSuccess, onError) => {
  return useQuery("teacher-single-data", getSingleTeacher, {
    onSuccess,
    onError,
  });
};
