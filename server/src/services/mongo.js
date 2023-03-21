const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://labbaek:11101991S@nasa-project.nry8z64.mongodb.net/nasa-project?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
