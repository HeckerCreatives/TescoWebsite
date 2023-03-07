const express = require("express");
const {
  create_topics,
  get_all_topics,
  delete_topics,
  update_topic,
  get_topics_by_user,
  count_all_topics,
  count_my_topics,
} = require("../controller/Topic_controller");
const Topics_Router = express.Router();

Topics_Router.get("/count-all-topics", count_all_topics);
Topics_Router.get("/count-my-topic", count_my_topics);
Topics_Router.post("/create-topic", create_topics);
Topics_Router.get("/topic", get_all_topics);
Topics_Router.delete("/topic/:id", delete_topics);
Topics_Router.put("/update-topic", update_topic);
Topics_Router.get("/topics/:userId", get_topics_by_user);

module.exports = Topics_Router;
