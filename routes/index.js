const { Router } = require("express");
const {
  verifyToken,
  isAdmin,
  adminNotAuthorization,
} = require("../middlewares/auth");

const {
  getUser,
  createUser,
  putUser,
  deleteUser,
  UpgradeRank,
  postAdminUser,
  // userSerchbar
} = require("../controllers/User");
const { getAllGenres, postOneGenre } = require("../controllers/Genres");
const routes = Router();

const {
  loadEventsAndGetEvents,
  // getEvents,
  postEvents,
  putEvents,
  deleteEvent,
  putUrlStreaming,
} = require("../controllers/Events");

const {
  getTicketByID,
  postTicket,
  deleteTicket,
  postCreatEventAndPrice,
  postCheckout,
  postAllCartEvent,
} = require("../controllers/Tickets");

const { getVenues, postVenues } = require("../controllers/Venue");

const {
  getTicketStock,
  putTicketStock,
  postTicketStock,
  getTicketStockByid,
} = require("../controllers/TicketStock");

const {
  getAOneBlackList,
  getAllBlackList,
  deleteOneBlackList,
  postOneBlackList,
  verifiUser,
} = require("../controllers/BlackList");

const {
  getShoppingCart,
  postShoppingCart,
  putShoppingCart,
  deleteShoppingCart,
  restarStock,
} = require("../controllers/ShoppingCart");

const { getLikes, postLikes, deleteLikes } = require("../controllers/Likes");
const { ticketVoucher } = require("../controllers/TicketVoucher");
const { verifiedaccess } = require("googleapis/build/src/apis/verifiedaccess");

routes.get("/like", getLikes);
routes.post("/like", verifyToken, postLikes);
routes.delete("/like", verifyToken, deleteLikes);

routes.get("/cart", getShoppingCart);
routes.post("/cart", verifyToken, postShoppingCart);
routes.put("/cart", verifyToken, putShoppingCart);
routes.delete("/cart", verifyToken, deleteShoppingCart);
routes.put("/cart/update", verifyToken, restarStock);

routes.post("/user", createUser);
routes.get("/user", getUser); // verifyToken
routes.put("/user", verifyToken, putUser);
routes.delete("/user", verifyToken, isAdmin, deleteUser); //isAdmin

routes.put("/upgrade", UpgradeRank); //isAdmin

routes.get("/events", loadEventsAndGetEvents);
routes.post("/events", verifyToken, isAdmin, postEvents);
//routes.post("/events", postEvents); //ruta de prueba
routes.put("/events", verifyToken, isAdmin, putEvents);
routes.delete("/events", verifyToken, isAdmin, deleteEvent); //isAdmin
routes.put("/eventurl", verifyToken, isAdmin, putUrlStreaming);

routes.get("/ticket", getTicketByID);
routes.post("/ticket", verifyToken, adminNotAuthorization, postTicket); // verifyToken, adminNotAuthorization,
routes.delete("/ticket", verifyToken, isAdmin, deleteTicket);
routes.post("/tickets", verifyToken, isAdmin, postCreatEventAndPrice);
routes.post("/tickets2", postCheckout);
// routes.post("/tickect2", getRaro2)
//ruta que agrega a el Json de eventos id_price
routes.post("/all", postAllCartEvent);

routes.get("/genres", getAllGenres);
routes.post("/genres", verifyToken, isAdmin, postOneGenre);
//routes.post("/genres", postOneGenre); //ruta de prueba

routes.get("/venues", getVenues);
routes.post("/venues", verifyToken, isAdmin, postVenues);
//routes.post("/venues", postVenues); //ruta de prueba

// routes.get("/ticketstock", verifyToken, getTicketStock);
routes.get("/ticketstock", getTicketStock); //ruta de prueba
routes.post("/ticketstock", verifyToken, isAdmin, postTicketStock); //reuta de prueba
//routes.post("/ticketstock", postTicketStock); //reuta de prueba
routes.get("/ticketstock2", getTicketStockByid);

routes.post("/admin", postAdminUser);

routes.get("/verifibaned", verifiUser);
routes.get("/blackall", verifyToken, getAllBlackList); //isAdmin
routes.get("/black", verifyToken, isAdmin, getAOneBlackList);
routes.post("/black", verifyToken, isAdmin, postOneBlackList);
routes.delete("/black", verifyToken, isAdmin, deleteOneBlackList);

routes.post("/voucher", ticketVoucher);
module.exports = routes;
