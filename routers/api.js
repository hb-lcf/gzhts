const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.json({ msg: "hello" })

})
//抛出这个users模块
module.exports = router;