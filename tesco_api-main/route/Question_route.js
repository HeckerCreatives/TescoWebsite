const express = require("express");
const {
  create_question,
  getall_question,
  delete_question,
  update_question,
  get_filtered_questions,
  get_questions_by_user,
  get_questions_by_user_web,
  count_all_questions,
  count_my_questions,
} = require("../controller/Question_controller");
const Question_Router = express.Router();

Question_Router.get("/count-all-questions", count_all_questions);
Question_Router.get("/count-my-questions", count_my_questions);
Question_Router.post("/create-question", create_question);
Question_Router.put("/update-question", update_question);
Question_Router.get("/question", getall_question);
Question_Router.delete("/question/:id", delete_question);
Question_Router.get(
  "/questions/:username/:topicName/:questionId",
  get_filtered_questions
);
Question_Router.get(
  "/questions-by-user/:username/:role",
  get_questions_by_user_web
);
Question_Router.get("/questions/filter/:username", get_questions_by_user);
module.exports = Question_Router;
