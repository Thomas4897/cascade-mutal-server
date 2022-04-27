const Claim = require("../Model/Claim");
const User = require("../../users/Model/User");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const { errorHandler } = require("../../../utils/index");

const createNewClaim = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const foundUser = await User.findOne({ userId: userId });
    // Creating a New User Object;
    let newClaim = new Claim({
      claimId: uuidv4(),
      userId: userId,
      creationDate: new Date().toISOString(),
      title: title,
      description: description,
    });

    // Use .save() to save new user object to DB
    let savedClaim = await newClaim.save();

    foundUser.claimHistory.push(savedClaim.claimId);

    await foundUser.save();

    res.status(200).json({
      message: "Claim Successfully Created.",
      payload: savedClaim,
    });
    // res.redirect("/login-form");
  } catch (error) {
    res.status(500).json({
      message: "Claim Creation Error",
      error: error.message,
    });
  }
};

module.exports = {
  createNewClaim,
};
