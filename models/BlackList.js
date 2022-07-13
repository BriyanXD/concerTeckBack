const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BlackList = sequelize.define(
  "blacklist",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = BlackList;
