const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Events = require("./Events");

const Ticket = sequelize.define(
  "ticket",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(
        "streaming",
        "vip",
        "general lateral",
        "general",
        "palco"
      ),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Events.hasMany(Ticket);
Ticket.belongsTo(Events);

module.exports = Ticket;
