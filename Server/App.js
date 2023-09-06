const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const usersRoutes = require('./routes/usersRoutes')

require("dotenv").config();

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/prod", ProductRoutes);
app.use("/user",usersRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
