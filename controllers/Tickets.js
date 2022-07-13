const Ticket = require("../models/Ticket");
require("dotenv").config();
const { STRIPE_KEY } = process.env;
const stripe = require("stripe")(STRIPE_KEY);
const Events = require("../models/Events");
const TicketStock = require("../models/TicketStock");
const User = require("../models/User");
const { ticketVoucher } = require("./TicketVoucher");
let priceId = "";

async function getTicketByID(req, res) {
  const { name, id, eventId } = req.query;
  const { userId } = req.body;

  const allTickets = await Ticket.findAll();
  try {
    if (eventId) {
      const AllUserMatchIdEvent = await Ticket.findAll({
        where: { eventId: eventId },
      });
      const emails = [];
      AllUserMatchIdEvent.filter((e) => {
        if (!emails.find((a) => a === e.email)) emails.push(e.email);
      });
      console.log(emails);
      if (emails) {
        return res.send(emails);
      } else {
        return res.status(404).json({ error: "No hay emails en este evento" });
      }
    }
    if (name) {
      const nameUserOrder = allTickets.filter((n) =>
        n.userName.toLowerCase().includes(name.toLowerCase())
      );
      if (nameUserOrder.length >= 1) {
        return res.send(nameUserOrder);
      }
    }
    if (id) {
      const findTicketForID = await Ticket.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: Events, as: "event" },
        ],
      });
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
  const { name, price, idEvent, idUser, quantity } = req.body;
  try {
    if (name && price && idEvent && idUser) {
      const saveEvent = await Events.findByPk(idEvent);
      const saveUser = await User.findByPk(idUser);
      const newTicket = [];
      let i = 0;
      while (i !== quantity) {
        let variable = await Ticket.create({
          name: name,
          price: price,
          eventId: idEvent,
          userId: idUser,
          eventName: saveEvent.name || "undefined",
          email: saveUser.email || "undefined",
          userName: saveUser.name || "undefined",
        });
        await ticketVoucher(variable.id);
        newTicket.push(variable);
        i++;
      }
      res.json(newTicket);
    } else {
      res.status(400).send({ error: "Faltan datos" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
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

async function postAllCartEvent(req, res){
  const {cantMin, cantMax} = req.body
  const all = await Events.findAll({include: { model: TicketStock, as: "stock"}});
  const events = all.sort((a,b) => {
    if(a.name < b.name){
      return -1;
    }
    if(a.name > b.name){
      return 1;
    }
    return 0;
  })
  try{
    if(events){
      for(let i = cantMin; i < cantMax; i++){
        if(events[i].stock.idStreamingPrice !== null || events[i].stock.idVipPrice !== null || events[i].stock.idGeneralLateralPrice !== null ||
          events[i].stock.idGeneralPrice !== null || events[i].stock.idPalcoPrice !== null ){
          }else{
            const idStockEncotrado = await TicketStock.findByPk(events[i].stockId)
            const product = await stripe.products.create({
              name: events[i].name,
              description: events[i].description,
              images: [events[i].performerImage],
            });
            if (product) {
              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: idStockEncotrado.streamingPrice * 100,
                currency: "ars",
              });
              await idStockEncotrado.update({idStreamingPrice: price.id})
              const price2 = await stripe.prices.create({
                product: product.id,
                unit_amount: idStockEncotrado.vipPrice * 100,
                currency: "ars",
              });
              await idStockEncotrado.update({idVipPrice: price2.id})
              const price3 = await stripe.prices.create({
                product: product.id,
                unit_amount: idStockEncotrado.generalLateralPrice * 100,
                currency: "ars",
              });
              await idStockEncotrado.update({idGeneralLateralPrice: price3.id})
              const price4 = await stripe.prices.create({
                product: product.id,
                unit_amount: idStockEncotrado.generalPrice * 100,
                currency: "ars",
              });
              await idStockEncotrado.update({idGeneralPrice: price4.id})
              const price5 = await stripe.prices.create({
                product: product.id,
                unit_amount: idStockEncotrado.palcoPrice * 100,
                currency: "ars",
              });
              await idStockEncotrado.update({idPalcoPrice: price5.id})
          } else {
            res.send("No se encontro el producto")
          }
        }
      }
        
    }
    res.send("todo salio ok")
  }catch(error){
    console.log(error.message)
  }
}

async function postCreatEventAndPrice(event) {
  try {
    const idStockEncotrado = await TicketStock.findByPk(event[0].stockId);
    const product = await stripe.products.create({
      name: event[0].name,
      description: event[0].description,
      images: [event[0].performerImage],
    });
    if (product) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: idStockEncotrado.streamingPrice * 100,
        currency: "ars",
      });
      await idStockEncotrado.update({ idStreamingPrice: price.id });
      const price2 = await stripe.prices.create({
        product: product.id,
        unit_amount: idStockEncotrado.vipPrice * 100,
        currency: "ars",
      });
      await idStockEncotrado.update({ idVipPrice: price2.id });
      const price3 = await stripe.prices.create({
        product: product.id,
        unit_amount: idStockEncotrado.generalLateralPrice * 100,
        currency: "ars",
      });
      await idStockEncotrado.update({ idGeneralLateralPrice: price3.id });
      const price4 = await stripe.prices.create({
        product: product.id,
        unit_amount: idStockEncotrado.generalPrice * 100,
        currency: "ars",
      });
      await idStockEncotrado.update({ idGeneralPrice: price4.id });
      const price5 = await stripe.prices.create({
        product: product.id,
        unit_amount: idStockEncotrado.palcoPrice * 100,
        currency: "ars",
      });
      await idStockEncotrado.update({ idPalcoPrice: price5.id });
      return "Todo salio bien";
    } else {
      res.status(400).json({ error: "Evento no tiene stock relacionado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function postCheckout(req, res, next) {
  const { line_items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success?success=true",
      cancel_url: "http://localhost:3000/success?canceled=true",
    });
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getTicketByID,
  postTicket,
  deleteTicket,
  postCreatEventAndPrice,
  postCheckout,
  postAllCartEvent
  // getRaro2
};
