"use strict";

// include sequelize for handling database
const { Sequelize, DataTypes } = require("sequelize");
// include schemas for player and stats
const player = require("./player");
const stats = require("./stats");
const Collection = require("./collection");

// get the database url - check if in testing environment or production
const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;

// database singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create a model and add it to the database
const playerModel = player(sequelizeDatabase, DataTypes);
const statsModel = stats(sequelizeDatabase, DataTypes);

// create associations
playerModel.hasOne(statsModel); // { statsId: }
statsModel.belongsTo(playerModel); // { playerId: }

module.exports = {
  sequelizeDatabase,
  statsModel,
  playerModel,
  Stats: new Collection(statsModel),
  Player: new Collection(playerModel),
};


//bringing in seqdb and player and stats, then bringing in the db url that we created into this to use
//creating models to use elsewhere
//exporting each model and the sequelizedb
