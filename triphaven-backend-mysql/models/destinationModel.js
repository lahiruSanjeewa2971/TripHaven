const pool = require("../config/db");

const Destination = {
  create: async (destinationName, image, town_id, description) => {
    const [result] = await pool.query(
      "INSERT INTO destination (destinationName, image, town_id, description) VALUES (?, ?, ?, ?)",
      [destinationName, image, town_id, description]
    );
    return {
      _id: result.insertId,
      destinationName,
      image,
      town_id,
      description,
    };
  },
  getAllDestinations: async () => {
    // this gives all destinations along with the town name.
    const [rows] = await pool.query(
      `SELECT d.*, t.townName as townName FROM destination d INNER JOIN towns t ON d.town_id = t._id ORDER BY d.destinationName ASC;`
    );
    return rows;
  },
};

module.exports = Destination;
