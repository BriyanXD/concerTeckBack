const TicketStock = require("../models/TicketStock");
const ticketStockDB = require("../db_event_genre/db_stock.json");
const Venue = require("../models/Venue");

async function chargeTicketStock() {
  try{
    ticketStockDB.StockSale.map(async (e) => {
      return await TicketStock.findOrCreate({
        where: {
          id: e.id,
          stockStreaming: e.stockStreaming,
          stockkVIP: e.stockVIP,
          stockGeneral: e.stockGeneral,
          stockGeneralLateral: e.stockGeneralLateral,
          stockPalco: e.stockPalco,
          streamingPrice: e.streamingPrice,
          vipPrice: e.vipPrice,
          generalLateralPrice: e.generalLateralPrice,
          generalPrice: e.generalPrice,
          palcoPrice: e.palcoPrice,
          venueId: e.venueId,
        },
      });
    });
  }catch(error){
    console.log(error.message)
  }
}

async function getTicketStock(req, res) {
  try {
    const allTicketStock = await TicketStock.findAll({
      include: { model: Venue },
    });
    res.json(allTicketStock);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function putTicketStock(req, res) {
  try {
    const allTicketStock = await TicketStock.findAll({
      include: { model: Venue },
    });
    res.json(allTicketStock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTicketStockByid(req, res) {
  const { id } = req.body;
  try {
    const encontrado = await TicketStock.findByPk(id);
    if (encontrado) {
      res.json(encontrado);
    } else {
      res.send("no se encontro un ticket con ese id");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function postTicketStock(req, res) {
  try {
    console.log(" ENTRANDO AL BACK DE POST STOCK ");
    const {
      id,
      stockStreaming,
      stockkVIP,
      stockGeneral,
      stockGeneralLateral,
      stockPalco,
      streamingPrice,
      vipPrice,
      generalLateralPrice,
      generalPrice,
      palcoPrice,
      venueId,
    } = req.body;
    if (
      !id ||
      //!stockStreaming ||
      //!stockkVIP ||
      !stockGeneral ||
      //!stockGeneralLateral ||
      //!stockPalco ||
      //!streamingPrice ||
      //!vipPrice ||
      //!generalLateralPrice ||
      !generalPrice ||
      //!palcoPrice ||
      !venueId
    ) {
      console.log(" FALTARON DATOS OBLIGATORIOS ");
      return res.status(400).send("Faltan datos obligatorios");
    } else {
      const stock = await TicketStock.findOrCreate({
        where: {
          id: id,
          stockStreaming: stockStreaming,
          stockkVIP: stockkVIP,
          stockGeneral: stockGeneral,
          stockGeneralLateral: stockGeneralLateral,
          stockPalco: stockPalco,
          streamingPrice: streamingPrice,
          vipPrice: vipPrice,
          generalLateralPrice: generalLateralPrice,
          generalPrice: generalPrice,
          palcoPrice: palcoPrice,
          venueId: venueId,
        },
      });
      return res.send(stock);
    }
  } catch (error) {
    console.log(" ALGO FALLO AL MOMENTO DE CREAR EL STOCK ", error.message);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  chargeTicketStock,
  getTicketStock,
  putTicketStock,
  getTicketStockByid,
  postTicketStock,
};
