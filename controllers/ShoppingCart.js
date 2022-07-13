const ShoppingCart = require("../models/ShoppingCart.js");
const TicketStock = require("../models/TicketStock.js");
const Events = require("../models/Events");

async function getShoppingCart(req, res) {
  const { idUser } = req.query;
  try {
    if (idUser) {
      const dateShoppingCart = await ShoppingCart.findAll({
        where: { idUser: idUser },
      });
      return res.status(200).json(dateShoppingCart);
    } else {
      const allDateShoppingCart = await ShoppingCart.findAll();
      return res.json(allDateShoppingCart);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function postShoppingCart(req, res) {
  const {
    idUser,
    idEvent,
    nombre,
    schedule,
    quantity,
    variant,
    itemTotal,
    price,
    performerImage,
    idPrice,
    name,
  } = req.body;
  try {
    if (idUser && idEvent) {
      const allDateShoppingCart = await ShoppingCart.create({
        idUser: idUser,
        idEvent: idEvent,
        nombre: nombre,
        quantity: 1,
        price: price,
        itemTotal: price,
        performerImage: performerImage,
        schedule: schedule,
        variant: variant,
        idPrice,
        name: name,
      });
      return res.status(200).json(allDateShoppingCart);
    } else {
      return res
        .status(400)
        .json({ error: "No se lograron guardar los datos del carrito" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function deleteShoppingCart(req, res) {
  const { id } = req.query;
  try {
    const ShoppingSave = await ShoppingCart.findOne({ where: { id: id } });
    if (ShoppingSave) {
      const ShoppingDeleted = await ShoppingSave.destroy();
      return res.json({
        message: "Carrito eliminado",
        ShoppingSave,
        ShoppingDeleted,
      });
    } else {
      res
        .status(400)
        .json({ error: "No se encontraron datos con ese ID ", id });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function putShoppingCart(req, res){
  const {
    id,
    idUser,
    idEvent,
    nombre,
    schedule,
    quantity,
    variant,
    itemTotal,
    price,
  } = req.body;
  try {
    const ShoppingSave = await ShoppingCart.findOne({ where: { id: id } });
    const total = ShoppingSave.price * quantity;
    if (ShoppingSave) {
      const ShoppingUpdate = await ShoppingSave.update({
        idUser: idUser,
        idEvent: idEvent,
        nombre: nombre,
        schedule: schedule,
        quantity: quantity,
        variant: variant,
        itemTotal: total,
        price: price,
      });
      return res.json(ShoppingUpdate);
    } else {
      res
        .status(400)
        .json({ error: "No se encontraron datos con ese ID ", id });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function restarStock(req, res) {
  const { descontar } = req.body;
  let eliminar = [];
  try {
    descontar.map(async (e) => {
      eliminar.push(e.id);
      const encontrado = await Events.findByPk(e.idEvent);
      const stock = await TicketStock.findByPk(encontrado.stockId);
      if (e.variant === "generalLateralPrice") {
        await stock.update({
          stockGeneralLateral: stock.stockGeneralLateral - e.quantity,
        });
      } else if (e.variant === "generalPrice") {
        await stock.update({ stockGeneral: stock.stockGeneral - e.quantity });
      } else if (e.variant === "streamingPrice") {
        await stock.update({
          stockStreaming: stock.stockStreaming - e.quantity,
        });
      } else if (e.variant === "vipPrice") {
        await stock.update({ stockkVIP: stock.stockkVIP - e.quantity });
      } else if (e.variant === "palcoPrice") {
        await stock.update({ stockPalco: stock.stockPalco - e.quantity });
      }
    });
    await ShoppingCart.destroy({ where: { id: eliminar } });
    res.send(
      "Se restaron correctamente todos los tickets de sus respectivos eventos"
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  getShoppingCart,
  postShoppingCart,
  deleteShoppingCart,
  putShoppingCart,
  restarStock,
};
