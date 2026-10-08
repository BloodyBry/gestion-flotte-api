const express = require("express");
const homeRoutes = require("./routes/home.routes");
const camionRoutes = require("./routes/camion.routes");
const remorqueRoutes = require("./routes/remorque.routes");
const gererErreur = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/camions", camionRoutes);
app.use("/api/remorques", remorqueRoutes);

app.use(gererErreur);

module.exports = app;