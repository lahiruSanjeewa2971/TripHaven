const express = require("express");
const { createTown } = require("../controllers/townController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/", createTown);

module.exports = router;
