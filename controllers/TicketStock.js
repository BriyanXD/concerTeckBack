const TicketStock = require("../models/TicketStock");
const ticketStockDB = require("../db_event_genre/db_stock.json");
const Venue = require("../models/Venue");

async function chargeTicketStock() {
  ticketStockDB.StockSale.map(async (e) => {
    return await TicketStock.findOrCreate({
      where: {
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

async function putTicketStock() {
  try {
    const allTicketStock = await TicketStock.findAll({
      include: { model: Venue },
    });
    res.json(allTicketStock);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  chargeTicketStock,
  getTicketStock,
  putTicketStock,
};
