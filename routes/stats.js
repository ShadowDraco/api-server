const express = require("express");
const router = express.Router();

const calculateStats = require("../src/lib/calculateStats");

// include the required database models
const { playerModel, Stats } = require("../src/models");

// get all
router.get("/", async (req, res, next) => {
  // get all players
  let allStats = await Stats.read();
  res.status(200).send(allStats);
});

// get all stats with player
router.get("/with-player", async (req, res, next) => {
  const stats = await Stats.readWith(playerModel);

  res.status(200).send({ stats });
});

// get one
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let stats = await Stats.read(id);

  res.status(200).send(stats);
});

// get stats with player
router.get("/:id/with-player", async (req, res, next) => {
  const id = req.params.id;
  const stats = await Stats.readWith(id, playerModel);

  res.status(200).send({ stats });
});

// fetch old stats and update them
const updateStats = async (id, type) => {
  // get old stats
  const oldStats = await Stats.read(id);
  // create new stats using the old stats
  const newStats = calculateStats(oldStats.dataValues, type);
  // update the database with the new stats
  const updatedStats = await Stats.update(id, newStats);

  return updatedStats;
};

// update wins
router.put("/:id/wins", async (req, res, next) => {
  const id = req.params.id;

  res.status(200).send(await updateStats(id, "wins"));
});

// update losses
router.put("/:id/losses", async (req, res, next) => {
  const id = req.params.id;

  res.status(200).send(await updateStats(id, "losses"));
});

// create new
router.post("/new", async (req, res, next) => {
  res.status(200).send("You should create a new player, not new stats silly");
});

// Delete one ( Reset stats)
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  const resetStats = { wins: 0, losses: 0, wl: 0, playerId: id };
  const stats = await Stats.update(id, resetStats);

  res.status(200).send({ stats });
});

module.exports = router;
