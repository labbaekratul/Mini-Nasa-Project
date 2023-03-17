const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");
const Planet = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        savePlanet(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await Planet.find({});
}

async function savePlanet(data) {
  try {
    if (isHabitablePlanet(data)) {
      await Planet.updateOne(
        { keplerName: data.kepler_name },
        { keplerName: data.kepler_name },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loadPlanetsData, getAllPlanets };
