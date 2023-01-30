const express = require("express");
const {
  get_all_result,
  create_result,
  get_results_by_user,
} = require("../controller/Result_controller");

const Result_Router = express.Router();

Result_Router.get("/result", get_all_result);
Result_Router.post("/create-result", create_result);
Result_Router.get("/result/:username/find", get_results_by_user);
module.exports = Result_Router;
