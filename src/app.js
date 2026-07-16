const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
module.exports = app;