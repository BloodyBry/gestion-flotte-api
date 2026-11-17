const express = require("express");
const homeRoutes = require("./routes/home.routes");
const camionRoutes = require("./routes/camion.routes");
const remorqueRoutes = require("./routes/remorque.routes");
const authRoutes = require("./routes/auth.routes");
const gererErreur = require("./middlewares/error.middleware");
const utilisateurRoutes = require("./routes/utilisateur.routes");
const chauffeurRoutes = require("./routes/chauffeur.routes");
const limiterRequetes = require("./middlewares/rate-limit.middleware");
const ralentirRequetes = require("./middlewares/slow-down.middleware");
const apiRoutes = require("./routes/api.routes");
const annoncerFinVersion = require("./middlewares/sunset.middleware");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(limiterRequetes);
app.use(ralentirRequetes);
app.use(express.json());
app.use("/", homeRoutes);

app.use("/api/v1", annoncerFinVersion, apiRoutes);

app.use("/api/v2", apiRoutes);

app.use("/api", annoncerFinVersion, apiRoutes);

app.use(gererErreur);

module.exports = app;