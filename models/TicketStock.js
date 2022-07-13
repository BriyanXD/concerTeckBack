const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("../models/Events");
const Venue = require("../models/Venue");

const TicketStock = sequelize.define(
  "ticketstock",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    stockStreaming: {
      type: DataTypes.INTEGER,
    },
    stockkVIP: {
      type: DataTypes.INTEGER,
    },
    stockGeneralLateral: {
      type: DataTypes.INTEGER,
    },
    stockGeneral: {
      type: DataTypes.INTEGER,
    },
    stockPalco: {
      type: DataTypes.INTEGER,
    },
    streamingPrice: {
      type: DataTypes.FLOAT,
    },
    vipPrice: {
      type: DataTypes.FLOAT,
    },
    generalLateralPrice: {
      type: DataTypes.FLOAT,
    },
    generalPrice: {
      type: DataTypes.FLOAT,
    },
    palcoPrice: {
      type: DataTypes.FLOAT,
    },
    idStreamingPrice:{
      type: DataTypes.STRING
    },
    idVipPrice:{
      type: DataTypes.STRING
    },
    idGeneralLateralPrice:{
      type: DataTypes.STRING
    },
    idGeneralPrice:{
      type: DataTypes.STRING
    },
    idPalcoPrice:{
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false,
  }
);
TicketStock.hasOne(Events, { as: "stock", foreignKey: "stockId" });
Events.belongsTo(TicketStock, { as: "stock", foreignKey: "stockId" });

Venue.hasMany(TicketStock);
TicketStock.belongsTo(Venue);

module.exports = TicketStock;