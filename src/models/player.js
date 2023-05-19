"use strict";

module.exports = (sequelizeDatabase, DataTypes) => {
  // define the table by name, its properties become columns

  return sequelizeDatabase.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      allowNull: true,
    },
    order: {
      type: DataTypes.ENUM,
      values: [
        "Copper",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Emerald",
        "Diamond",
        "Champion",
      ],
      defaultValue: "Bronze",
      allowNull: true,
    },
  });
};
