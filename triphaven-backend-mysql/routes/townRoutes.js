const express = require("express");
const { createTown, getAllTowns } = require("../controllers/townController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/", createTown);
router.get("/", getAllTowns)

module.exports = router;
