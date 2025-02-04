const express = require("express");
const {
  addDestination,
  getDestinationList,
  getSingleDestinationById,
} = require("../controllers/placeController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

// only admin can add new destinations
router.post("/add", authenticate, authorizeRole(["admin"]), addDestination);

// common routes
router.get("/get", getDestinationList);
router.get("/get-details/:id", getSingleDestinationById);

module.exports = router;
