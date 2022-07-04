const { Router } = require("express");
const {
  verifyToken,
  isAdmin,
  verifyIsProducer,
  adminNotAuthorization,
  producerNotAuthorization,
} = require("../middlewares/auth");

const {
  getUser,
  createUser,
  putUser,
  deleteUser,
  UpgradeRank,
  // userSerchbar
  postAdminUser,
} = require("../controllers/User");
const { getAllGenres, postOneGenre } = require("../controllers/Genres");
const {
  createProducer,
  getProducer,
  putProducer,
  deleteProducer,
} = require("../controllers/Producer");
const routes = Router();

const {
  loadEventsAndGetEvents,
  // getEvents,
  postEvents,
  putEvents,
  deleteEvent,
} = require("../controllers/Events");

const {
  getTicketByID,
  postTicket,
  deleteTicket,
} = require("../controllers/Tickets");

const { getVenues, postVenues } = require("../controllers/Venue");
const { getTicketStock } = require("../controllers/TicketStock");

const { LoginUser } = require("../controllers/Login");
const {
  ValidationUser,
  ValidationUsername,
  ValidationEmail,
} = require("../controllers/Validations");

const {
  getAOneBlackList,
  getAllBlackList,
  deleteOneBlackList,
  postOneBlackList,
} = require("../controllers/BlackList");

const {
  getShoppingCart,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
} = require("../controllers/ShoppingCart");

const { getLikes, postLikes, deleteLikes } = require("../controllers/Likes");

routes.get("/like", verifyToken, getLikes);
routes.post("/like", verifyToken, postLikes);
routes.delete("/like", verifyToken, deleteLikes);

routes.get("/cart", verifyToken, getShoppingCart);
routes.post("/cart", verifyToken, postShoppingCart);
routes.put("/cart", verifyToken, putShoppingCart);
routes.delete("/cart", verifyToken, deleteShoppingCart);

routes.post("/user", createUser);
routes.get("/user", getUser); // verifyToken
routes.put("/user", verifyToken, putUser);
routes.delete("/user", verifyToken, isAdmin, deleteUser); //isAdmin

routes.put("/upgrade", verifyToken, isAdmin, UpgradeRank); //isAdmin

/* routes.get("/producer", verifyToken, getProducer);
routes.post("/producer", createProducer);
routes.put("/producer", verifyToken, isAdmin, putProducer);
routes.delete("/producer", verifyToken, isAdmin, deleteProducer); */

routes.get("/events", loadEventsAndGetEvents);
routes.post("/events", verifyToken, isAdmin, postEvents);
routes.put("/events", verifyToken, isAdmin, putEvents);
routes.delete("/events", verifyToken, isAdmin, deleteEvent); //isAdmin

routes.get("/ticket", verifyToken, getTicketByID);
routes.post("/ticket", verifyToken, adminNotAuthorization, postTicket);
routes.delete("/ticket", verifyToken, isAdmin, deleteTicket);

routes.get("/genres", getAllGenres);
routes.post("/genres", verifyToken, isAdmin, postOneGenre);

routes.get("/venues", getVenues);
routes.post("/venues", verifyToken, isAdmin, postVenues);

routes.get("/ticketstock", verifyToken, getTicketStock);

routes.post("/login", LoginUser);

routes.post("/validation/login", ValidationUser);
routes.post("/validation/username", ValidationUsername);
routes.post("/validation/email", ValidationEmail);

routes.post("/admin", postAdminUser);

routes.get("/blackall", verifyToken, isAdmin, getAllBlackList);
routes.get("/black", verifyToken, isAdmin, getAOneBlackList);
routes.post("/black", verifyToken, isAdmin, postOneBlackList);
routes.delete("/black", verifyToken, isAdmin, deleteOneBlackList);

module.exports = routes;
