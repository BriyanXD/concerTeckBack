const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Producer = require("./Producer");

const Events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Ingrese un nombre para el evento",
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/gi,
          msg: `El nombre del evento contener solo letras y espacios`,
        },
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Ingrese un nombre para el artista",
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/gi,
          msg: `El nombre debe contener solo letras y espacios`,
        },
      },
    },
    schedule: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Ingrese una fecha para el evento",
        },
        isDate: {
          args: true,
          msg: "schedule debe ser una fecha valida",
        },
      },
    },
    performerImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Ingrese un url de imagen para el evento",
        },
      },
    },
    placeImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Ingrese un url de imagen para el evento",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAprobe: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    streaming: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Events;
