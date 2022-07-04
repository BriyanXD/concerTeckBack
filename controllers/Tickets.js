const Ticket = require("../models/Ticket");

async function getTicketByID(req, res) {
  const { id, userId } = req.body;
  const allTickets = await Ticket.findAll();
  try {
    if (id) {
      const findTicketForID = await Ticket.findByPk(id);
      return res.json(findTicketForID);
    }
    if (userId) {
      const findTicketForIDEvent = allTickets.filter((ticket) => {
        if (ticket.userId === userId) return ticket;
      });
      return res.json(findTicketForIDEvent);
    }
    return res.json(allTickets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postTicket(req, res) {
  const { name, price, eventId, userId } = req.body;
  try {
    if (name && price && eventId && userId) {
      const newTicket = await Ticket.create({
        name: name,
        price: price,
        eventId: eventId,
        userId: userId,
      });
      res.json(newTicket);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteTicket(req, res) {
  const { id } = req.body;
  try {
    const deletedTicket = await Ticket.destroy({
      where: {
        id: id,
      },
    });
    if (deletedTicket === 1) res.json({ message: "Ticket borrado con exito" });
    else res.json({ error: "Error al borrar el Ticket" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getTicketByID,
  postTicket,
  deleteTicket,
};
