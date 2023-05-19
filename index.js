"use strict";

// prepare env, port, and server
require("dotenv").config();
const PORT = process.env.PORT;
const { start } = require("./src/server");

// import database functions and instance
const { sequelizeDatabase } = require("./src/models");

// async connect the database then start the server to avoid problems
sequelizeDatabase
  .sync()
  .then(() => {
    console.log("Database connected!");
    start(PORT);
  })
  .catch((error) => {
    console.error(error);
  });

   // Bringing in dotenv and the port from env, then bringing in sequelize db and
  // using that to allow the db to connect, along with a catch error to catch any errors when starting up
