const express = require("express");
const router = express.Router();

// include the required database models
const { Stats, statsModel, Player } = require("../src/models");

// Get all
router.get("/", async (req, res, next) => {
  // get all players
  let allPlayers = await Player.read();
  res.status(200).send(allPlayers);
});

// Create new
router.post("/", async (req, res, next) => {
  let newPlayer = await Player.create(req.body);
  let newStats = await Stats.create({ playerId: newPlayer.id });

  res.status(200).send({ newPlayer, newStats });
});

// Get all with stats
router.get("/with-stats", async (req, res, next) => {
  const id = req.params.id;
  const player = await Player.readWith(id, statsModel);

  res.status(200).send({ player });
});
// Get one
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  let player = await Player.read(id);

  res.status(200).send(player);
});
// Get one with stats
router.get("/:id/with-stats", async (req, res, next) => {
  const id = req.params.id;

  const player = await Player.readWith(id, statsModel);

  res.status(200).send({ player });
});

// Update one
router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let updatedPlayer = Player.update(id, req.body);

  res.status(200).send(updatedPlayer);
});

// Delete one
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  const player = await Player.readWith(id, statsModel);

  await Player.delete(id, statsModel);
  //await Stats.delete(id);

  res.status(200).send({ player });
});

module.exports = router;
