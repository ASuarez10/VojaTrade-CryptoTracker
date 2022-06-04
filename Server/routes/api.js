const express = require("express");
const app = express();

// Require router files
const usersRoutes = require("./api/users");
const coinsListRoutes = require("./api/coinsList.js");

// Include the routes to express
app.use("/users", usersRoutes);
app.use("/coins", coinsListRoutes);

module.exports = app;
