"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

// include routes
const playerRoute = require("../routes/player");
const statsRoute = require("../routes/stats");

// include custom middleware
const notFound = require("../src/error-handlers/404");
const errorHandler = require("../src/error-handlers/500");

//use global middleware
app.use(cors());
app.use(express.json());

// get base route
app.get("/", (req, res) => {
  res.status(200).send("Home route!");
});

// get test route
app.get("/test", (req, res) => {
  res.status(200).send("The server is Healthy!s");
});

// use the custom routers
app.use("/player", playerRoute);
app.use("/stats", statsRoute);

app.use("*", notFound);
app.use(errorHandler);

const start = (port) => {
  app.listen(port, (req, res) => {
    console.log("listening on port: ", port);
  });
};

module.exports = { start, app };


//foundation for creating routes and using them as well. Have get for home route, getting everything.
// Also have app use to implement those routes that you created
//listening port to connect to port
//exporting start and app to be used elsewhere
