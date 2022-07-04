const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("../models/Events");

const Venue = sequelize.define(
  "venue",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    map: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxStockStreaming: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxStockVIP: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxStockGeneralLateral: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxStockGeneral: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxStockPalco: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
    },
    isBigEvent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
Venue.hasMany(Events, { as: "venue" });
Events.belongsTo(Venue, { as: "venue" });

module.exports = Venue;
