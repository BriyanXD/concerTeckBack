const Venue = require("../models/Venue");
const dbVenue = require("../db_event_genre/db_venue.json");

async function chargeVenue() {
  try{
    dbVenue.Venues.map(async (e) => {
      const min = Math.floor(
        (e.maxStockGeneral +
          e.maxStockGeneralLateral +
          e.maxStockPalco +
          e.maxStockStreaming +
          e.maxStockVIP) *
          0.7
      );
      return await Venue.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          address: e.address,
          map: e.map,
          maxStockStreaming: e.maxStockStreaming,
          maxStockVIP: e.maxStockVIP,
          maxStockGeneralLateral: e.maxStockGeneralLateral,
          maxStockGeneral: e.maxStockGeneral,
          maxStockPalco: e.maxStockPalco,
          minStock: Math.floor(
            (e.maxStockGeneral +
              e.maxStockGeneralLateral +
              e.maxStockPalco +
              e.maxStockStreaming +
              e.maxStockVIP) *
              0.7
          ),
          isBigEvent: min > 10000 ? true : false,
        },
      });
    });
  }catch(error){
    console.log(error.message)
  }
}

async function getVenues(req, res) {
  try {
    const allVenues = await Venue.findAll();
    res.json(allVenues);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postVenues(req, res) {
  try {
    const {
      id,
      minStock,
      maxStockGeneral,
      maxStockVIP,
      maxStockGeneralLateral,
      maxStockStreaming,
      maxStockPalco,
      isBigEvent,
      name,
      address,
      map,
    } = req.body;
    if (!name || !address || !map || !maxStockGeneral) {
      res.status(400).send("Faltan paramentros obligatorios");
    } else {
      const venues = await Venue.findOrCreate({
        where: {
          id: id,
          name: name,
          address: address,
          map: map,
          maxStockGeneral: maxStockGeneral || 0,
          maxStockGeneralLateral: maxStockGeneralLateral || 0,
          maxStockPalco: maxStockPalco || 0,
          maxStockStreaming: maxStockStreaming || 0,
          maxStockVIP: maxStockVIP || 0,
          minStock: minStock,
          isBigEvent: isBigEvent,
        },
      });
      return res.send(venues);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  chargeVenue,
  getVenues,
  postVenues,
};
