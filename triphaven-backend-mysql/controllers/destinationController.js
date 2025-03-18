const Destination = require("../models/destinationModel");

const createDestination = async (req, res) => {
  const { destinationName, image, town_id, description } = req.body;

  if (!destinationName || !image || !town_id || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newDestination = await Destination.create(
      destinationName,
      image,
      town_id,
      description
    );
    res.status(201).json({
      message: "New destination added to the system.",
      data: newDestination,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Destination already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllDestinationsWithTownName = async (req, res) => {
  try {
    const destinationList = await Destination.getAllDestinations();
    res.json(destinationList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDestination, getAllDestinationsWithTownName };
