const Town = require("../models/townModel");

const createTown = async (req, res) => {
  const { townName, imageUrl, description, rating } = req.body;
  try {
    const newTown = await Town.create(townName, imageUrl, description, rating);
    res.status(201).json(newTown);
  } catch (error) {
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

module.exports = { createTown };
