require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const sequelize = require("./db");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { chargeGenres } = require("./controllers/Genres");
const { chargeEvents } = require("./controllers/Events");
const { chargeVenue } = require("./controllers/Venue");
const { chargeTicketStock } = require("./controllers/TicketStock");

const CORS_URL = process.env.CORS_URL || "http://localhost:3000";

require("./models/ShoppingCart");
require("./models/Producer");
require("./models/User");
require("./models/Events");
require("./models/Ticket");
require("./models/Genre");
require("./models/Venue");
require("./models/TicketStock");
require("./models/BlackList");
require("./models/Likes");
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", routes);

let PORT = process.env.PORT || 3001;

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Conection DB succesful");
    app.listen(PORT, () => {
      console.log(`App listen http://localhost:${PORT}`);
    });
    await chargeGenres();
    await chargeVenue();
    await chargeEvents();
    await chargeTicketStock();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
