"use strict";

// require super test and context to be tested
supertest = require("supertest");
const { sequelizeDatabase } = require("../src/models");
const { app } = require("../src/server");

const request = supertest(app);
// before testing connect
beforeAll(async () => {
  await sequelizeDatabase.sync();
});
// after testing remove testing environment to prevent sid effects
afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe("Player Route", () => {
  test("Handles create route", async () => {
    const response = await request.post("/player").send({
      name: "tester",
      rank: 5,
      order: "Copper",
    });

    expect(response.status).toEqual(200);
    expect(response.body.newPlayer.name).toEqual("tester");
    expect(response.body.newStats).toBeTruthy();
  });

  test("Handles get one player route", async () => {
    const response = await request.get("/player/1/with-stats");

    expect(response.status).toEqual(200);
    expect(response.body.player[0].name).toEqual("tester");
    expect(response.body.player[0].stat).toBeTruthy();
  });

  test("Handles get all players route", async () => {
    const response = await request.get("/player");

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("tester");
  });

  test("Handles update player route", async () => {
    const response = await request.put("/player/1").send({ name: "tested" });
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("tested");
  });

  test("Handles update stat route", async () => {
    let response = await request.put("/stats/1/wins");
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].wins).toEqual(1);
    expect(response.body[0].wl).toEqual(1);

    response = await request.put("/stats/1/losses");
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].losses).toEqual(1);
    expect(response.body[0].wl).toEqual(1);
  });

  test("Handles get one stat route", async () => {
    const response = await request.get("/stats/1/with-player");

    expect(response.status).toEqual(200);
    expect(response.body.stats[0].wins).toEqual(1);
    expect(response.body.stats[0].player).toBeTruthy();
  });

  test("Handles get all stats route", async () => {
    const response = await request.get("/stats");

    expect(response.status).toEqual(200);
    expect(response.body[0].wins).toEqual(1);
  });

  test("Handles delete state route", async () => {
    const response = await request.delete("/stats/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ stats: [null, 1] });
  });

  test("Handles delete player route", async () => {
    const response = await request.delete("/player/1");

    expect(response.status).toEqual(200);
    expect(response.body.player[0].name).toEqual("tested");
    expect(response.body.player[0].stat).toBeTruthy();
  });
});
