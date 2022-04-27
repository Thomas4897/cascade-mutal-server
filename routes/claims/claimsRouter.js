var express = require("express");
var router = express.Router();
const { createNewClaim } = require("./Controller/claimsController");
const { checkIsEmpty } = require("../../utils/index");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello from claims / Route");
});

router.post("/create-claim", createNewClaim);

module.exports = router;
