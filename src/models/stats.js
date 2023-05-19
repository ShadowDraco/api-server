"use strict";

module.exports = (sequelizeDatabase, DataTypes) => {
  // define the table by name, its properties become columns

  return sequelizeDatabase.define("stats", {
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    wl: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  });
};

//bringing in seqdb to use for defining stats and the 3 things that you are defining within stats (wins, losses, wl)
//
