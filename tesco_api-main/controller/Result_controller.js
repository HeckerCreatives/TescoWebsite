const ResultModal = require("../model/result_model");

exports.get_all_result = async (req, res) => {
  try {
    const response = await ResultModal.find();
    if (response) {
      return res
        .status(200)
        .json({ sucess: true, message: "Result data fetched", data: response });
    } else {
      return res.status(201).json({ success: false, msg: response });
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

exports.get_results_by_user = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await ResultModal.find({
      teacher: username,
    }).populate("questionaireId");

    return res.status(200).json({
      success: true,
      results: response,
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err });
  }
};

exports.create_result = async (req, res) => {
  const {
    firstname,
    lastname,
    middlename,
    score,
    answer,
    questionaireId,
    teacher,
  } = req.body;

  try {
    const response = new ResultModal({
      questionaireId,
      teacher,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      score: score,
      answer: answer,
    });
    if (response) {
      await response.save();
      return res
        .status(200)
        .json({ sucess: true, message: "Result data added" });
    } else {
      return res.status(201).json({ success: false, msg: response });
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};
