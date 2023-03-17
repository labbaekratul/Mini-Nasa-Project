const Launch = require("./launches.mongo");

const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Keplar Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function exitsLaunchWithId(launchId) {
  return await Launch.findOne({ flightNumber: launchId });
}

async function getLastestFlightNumber() {
  const lastestlaunch = await Launch.findOne().sort("-flightNumber");
  if (!lastestlaunch) {
    return 1000;
  }
  return lastestlaunch.flightNumber;
}

async function getAllLaunches() {
  return await Launch.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  await Launch.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLastestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Labbaek Ratul", "NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  return await Launch.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
}

module.exports = {
  exitsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
