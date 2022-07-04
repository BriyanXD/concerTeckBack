const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Likes = sequelize.define(
  "likesuser",
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
  },
  { timestamps: false }
);

module.exports = Likes;
