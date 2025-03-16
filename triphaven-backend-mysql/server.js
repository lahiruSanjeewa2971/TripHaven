const express = require("express");
const cors = require("cors");
const app = express();

const townRoutes = require('./routes/townRoutes')
const mediaRoutes = require('./routes/mediaRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/media", mediaRoutes);
app.use('/api/towns', townRoutes)
// app.get("/", (req, res) => {
//   res.send("TripHeaven API is running 🚀");
// });

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
