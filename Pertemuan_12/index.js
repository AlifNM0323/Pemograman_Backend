import express from "ecpress";
import apiRouting from "./routes/api.js";

import auth from "./middleware/auth.js";
import logger from "./middleware/logger.js";

const app = express();

app.use(logger);
app.use(auth);
app.use("/", apiRouting);