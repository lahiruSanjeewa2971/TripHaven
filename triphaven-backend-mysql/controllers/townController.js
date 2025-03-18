const Town = require("../models/townModel");

const createTown = async (req, res) => {
  const { townName, imageUrl, description, rating } = req.body;

  if (!townName || !imageUrl || !description || rating === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5" });
    }

    const newTown = await Town.create(townName, imageUrl, description, rating);
    res.status(201).json(newTown);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Town already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllTowns = async (req, res) => {
  try {
    const towns = await Town.getAll();
    res.json(towns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTown, getAllTowns };
