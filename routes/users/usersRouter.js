var express = require("express");
var router = express.Router();
const {
  userLogin,
  getUserClaimHistory,
  getUserId,
} = require("./Controller/usersController");

const { checkIsEmpty } = require("../../utils/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello from users / Route");
});

router.post("/login", checkIsEmpty, userLogin);

router.get("/get-userId/:email", getUserId);

router.get("/claim-history/:userId", getUserClaimHistory);

module.exports = router;
