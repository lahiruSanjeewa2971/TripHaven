const pool = require("../config/db");

const Town = {
  create: async (townName, image, description, rating) => {
    const [result] = await pool.query(
      "INSERT INTO towns (townName, image, description, rating) VALUES (?, ?, ?, ?)",
      [townName, image, description, rating]
    );
    return { _id: result.insertId, townName, image, description, rating };
  },
};

module.exports = Town;
