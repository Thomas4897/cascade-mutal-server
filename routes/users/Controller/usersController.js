const User = require("../Model/User");
const Claim = require("../../claims/Model/Claim");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// const { errorHandler } = require("../../../utils/index");

const userLogin = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    // Creating a New User Object;
    if (foundUser === null) {
      let newUser = new User({
        userId: uuidv4(),
        email: email,
        firstName: firstName,
        lastName: lastName,
      });

      // Use .save() to save new user object to DB
      let savedUser = await newUser.save();

      res.status(200).json({
        message: "User Successfully Logged In.",
        payload: savedUser,
      });
    } else {
      res.status(200).json({
        message: "User Successfully Logged In.",
        payload: foundUser,
      });
    }

    // res.redirect("/login-form");
  } catch (error) {
    res.status(500).json({
      message: "Login User Error",
      error: error.message,
    });
  }
};

const getUserClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    let allClaims = await Claim.find({ userId: userId });

    if (allClaims.length <= 0) {
      throw { message: "No claims created yet." };
    }

    res
      .status(200)
      .json({ message: "Retreived User Claim History.", payload: allClaims });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const { email } = req.params;

    let foundUser = await User.find({ email: email });

    if (foundUser.length <= 0) {
      throw { message: "No User Matched." };
    }

    res.status(200).json({
      message: "Retreived User ID.",
      payload: foundUser[0].userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  userLogin,
  getUserClaimHistory,
  getUserId,
};
