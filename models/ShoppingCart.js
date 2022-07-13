const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ShoppingCart = sequelize.define(
  "shoppingcart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idEvent: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    schedule: {
      type: DataTypes.DATE,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    variant: {
      type: DataTypes.STRING,
    },
    itemTotal: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    performerImage:{
      type: DataTypes.STRING,
    },
    idPrice: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = ShoppingCart;
