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

module.exports = { createTown };
