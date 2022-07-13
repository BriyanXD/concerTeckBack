const eventsFiles = require("../db_event_genre/db_events.json");
const Event = require("../models/Events");
const Genre = require("../models/Genre");
const Venue = require("../models/Venue");
const TicketStock = require("../models/TicketStock");
const { postCreatEventAndPrice } = require("./Tickets");
const e = require("express");

async function chargeEvents() {
  try{
    for (let typeEvent in eventsFiles) {
      eventsFiles[typeEvent].map(async (event) => {
        const saveGenre = await Genre.findOne({
          where: { name: event.genre.toLowerCase() },
        });
        if (saveGenre) {
          return await Event.findOrCreate({
            where: {
              name: event.name,
              artist: event.artist,
              genreId: saveGenre.id,
              schedule: event.schedule,
              performerImage: event.performerImage,
              placeImage: event.placeImage,
              description: event.description,
              venueId: event.venueId,
              stockId: event.stockId,
              /* isBigEvent: event.isBigEvent === true ? true : false, */
            },
          })
            .then((response) => {})
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          console.log("id o nombre no encontrados");
        }
      });
    }
  }catch(error){
    console.log(error.message)
  }
}

async function loadEventsAndGetEvents(req, res) {
  const { name, id, schedule, artist } = req.query;
  try {
    const allEvents = await Event.findAll({
      include: [
        { model: Venue, as: "venue" },
        { model: TicketStock, as: "stock" },
      ],
    });
    if (name) {
      // const eventName = await Events.findOne({where:{name:name}})
      const eventName = allEvents.filter((n) =>
        n.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(eventName);
      if (eventName.length >= 1) {
        return res.send(eventName);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con ese Nombre" });
      }
    } else if (id) {
      const eventId = await Event.findByPk(id, {
        include: [
          { model: Venue, as: "venue" },
          { model: TicketStock, as: "stock" },
        ],
      });
      if (eventId) {
        return res.send(eventId);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con ese ID" });
      }
    } else if (schedule) {
      //const eventName = await Events.findOne({where:{name:name}})
      const eventByDate = allEvents.filter((eventDate) => {
        if (Date.parse(eventDate.schedule) === Date.parse(schedule))
          /* console.log("fecha db", Date.parse(eventDate.schedule));
        console.log("fecha arg", Date.parse(schedule)); */
          return eventDate;
      });
      if (eventByDate.length >= 1) {
        return res.send(eventByDate);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con esa fecha" });
      }
    } else if (artist) {
      const artisSearch = allEvents.filter((a) =>
        a.artist.toLowerCase().includes(artist.toLowerCase())
      );
      if (artisSearch.length >= 1) {
        return res.send(artisSearch);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos de ese artista" });
      }
    }
    res.json(allEvents);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
// Modificando eventos
async function postEvents(req, res) {
  try {
    console.log(" ENTRANDO A LA FUNCION DEL BACK DE POST EVENT ");
    const {
      name,
      artist,
      genreId,
      schedule,
      performerImage,
      placeImage,
      description,
      venueId,
      stockId,
    } = req.body;
    if (
      !name ||
      !genreId ||
      !schedule ||
      !performerImage ||
      !placeImage ||
      !description ||
      !artist ||
      !venueId ||
      !stockId
    ) {
      console.log(" FALTARON DATOS ");
      return res.status(400).send("Faltan datos obligatorios");
    } else {
      await Genre.findOrCreate({
        where: { name: genreId.toLowerCase() },
      });
      let saveVenue = await Venue.findOne({ where: { id: venueId } });
      let saveGenre = await Genre.findOne({
        where: { name: genreId.toLowerCase() },
      });
      if (saveGenre && saveVenue) {
        const eventCreated = await Event.findOrCreate({
          where: {
            name: name,
            artist: artist,
            genreId: saveGenre.id,
            schedule: schedule,
            performerImage: performerImage,
            placeImage: placeImage,
            description: description,
            venueId: venueId,
            stockId: stockId,
          },
        });
        if (eventCreated) {
          //console.log(eventCreated, "paso algo")
          await postCreatEventAndPrice(eventCreated);
          return res.status(201).json({ message: "Evento creado con exito" });
        } else {
          console.log(" ALGO FALLO EN LA CREACION DEL EVENTO ");
          return res.status(400).json({ error: "No se puedo crear el evento" });
        }
      } else {
        return res
          .status(400)
          .json({ error: "No se puedo crear el genero para el evento" });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function putEvents(req, res) {
  try {
    const {
      id,
      name,
      artist,
      schedule,
      performerImage,
      placeImage,
      description,
      streaming,
      genreId,
      venueId,
      stockId,
    } = req.body;
    const upload = await Event.findByPk(id);
    if (upload) {
      await Event.update(
        {
          name: name || upload.name,
          artist: artist || upload.artist,
          genreId: genreId || upload.genreId,
          schedule: schedule || upload.schedule,
          performerImage: performerImage || upload.performerImage,
          placeImage: placeImage || upload.placeImage,
          description: description || upload.description,
          streaming: streaming || upload.streaming,
          venueId: venueId || upload.venueId,
          stockId: stockId || upload.stockId,
        },
        { where: { id: id } }
      );
      const saveUpdateEvent = await Event.findByPk(id, {
        include: [
          { model: Venue, as: "venue" },
          { model: TicketStock, as: "stock" },
        ],
      });
      if (saveUpdateEvent) {
        return res.send(saveUpdateEvent);
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
async function deleteEvent(req, res) {
  try {
    const { id } = req.query; //req.params.id
    const event = await Event.findByPk(id);
    if (!id) {
      return res.status(400).json({ error: "El ID no es valido" });
    }
    if (!event) {
      return res.status(404).json({
        error: "No se a encontrado un Evento que corresponda a lo solicitado",
      });
    }
    const destoyed = await event.destroy();
    if (destoyed) {
      return res
        .status(201)
        .json({ message: "El evento a sido eliminado con exito", event });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function putUrlStreaming(req, res) {
  const { idEvent, urlStraming } = req.body;
  try {
    if (idEvent && urlStraming) {
      await Event.update(
        { streaming: urlStraming },
        { where: { id: idEvent } }
      );
      const eventSave = await Event.findByPk(idEvent, {
        include: [
          { model: Venue, as: "venue" },
          { model: TicketStock, as: "stock" },
        ],
      });
      return res.json(eventSave);
    } else {
      return res.status(400).json({ error: "Faltan datos" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  chargeEvents,
  deleteEvent,
  // getEvents,
  postEvents,
  putEvents,
  loadEventsAndGetEvents,
  putUrlStreaming,
};
