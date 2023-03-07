const jwt = require("jsonwebtoken");
const generateUniqueInteger = require("../middleware/GenerateCode/generateCode");
const TopicsModel = require("../model/Topics_model");
const SCRETE_KEY = "iamscrete";

exports.create_topics = async (req, res) => {
  const randomCode = generateUniqueInteger();
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ isAuth: false, message: "not authorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
      return res.status(401).json({ isAuth: false, message: "invalid token" });
    }
    let decodeToken;
    try {
      decodeToken = jwt.verify(token, SCRETE_KEY);
      const { role, firstname, id } = decodeToken;

      const response = new TopicsModel({
        generatedCode: randomCode,
        topic: req.body.topic,
        description: req.body.description,
        user_id: id,
        name: firstname,
        role: role,
      });
      if (response) {
        await response.save();
        return res
          .status(200)
          .json({ sucess: true, message: "Topic data added" });
      } else {
        return res.status(201).json({ success: false, msg: response });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ data: error, message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.get_all_topics = async (req, res) => {
  try {
    const response = await TopicsModel.find().populate("user_id");
    if (response) {
      return res
        .status(200)
        .json({ sucess: true, message: "Topic fetched", data: response });
    } else {
      return res.status(201).json({ success: false, msg: response });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.get_topics_by_user = async (req, res) => {
  try {
    const { userId } = req.params;
    const topics = await TopicsModel.find(
      {
        user_id: userId,
      },
      {
        _id: 0,
        topic: 1,
      }
    );
    return res.status(200).json({ success: true, data: topics });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete_topics = async (req, res) => {
  try {
    const response = await TopicsModel.deleteOne({ _id: req.params.id });
    if (response) {
      res.status(200).json({
        message: "data has been deleted",
        sucess: true,
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.update_topic = async (req, res) => {
  const filter = req.body.id;
  try {
    const response = await TopicsModel.updateOne(
      { _id: filter },
      {
        $set: {
          topic: req.body.topic,
          description: req.body.description,
        },
      }
    );
    response && res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.count_all_topics = async (req, res) => {
  try {
    const count = await TopicsModel.count({});

    res.status(200).json({
      message: "All Topics count fetch successfully",
      success: true,
      count,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.count_my_topics = async (req, res) => {
  try {
    const { user_id } = req.body;

    const count = await TopicsModel.countDocuments({ user_id });

    res.status(200).json({
      message: "All Topics count fetch successfully",
      success: true,
      count,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
