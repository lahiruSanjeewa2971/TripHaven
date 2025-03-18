const express = require("express");
const { createDestination, getAllDestinationsWithTownName } = require("../controllers/destinationController");
const router = express.Router();

router.post("/", createDestination);
router.get("/", getAllDestinationsWithTownName);

module.exports = router;
