const express = require("express");
const homeRoutes = require("./routes/home.routes");

const app = express();

app.use(express.json());

app.use("/", homeRoutes);

module.exports = app;