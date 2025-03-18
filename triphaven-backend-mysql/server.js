const express = require("express");
const cors = require("cors");
const app = express();

const townRoutes = require('./routes/townRoutes')
const mediaRoutes = require('./routes/mediaRoutes')
const destinationRoutes = require('./routes/destinationRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/mysqldb/media", mediaRoutes);
app.use('/mysqldb/api/towns', townRoutes)
app.use('/mysqldb/api/destinations', destinationRoutes)
// app.get("/", (req, res) => {
//   res.send("TripHeaven API is running 🚀");
// });

const port = 5001;
app.listen(port, () => console.log(`Server running on port ${port} 🚀`));
