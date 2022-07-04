const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Ticket = require("./Ticket");
const Events = require("./Events");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese un nombre de usuario",
        },
        len: {
          args: [4, 255],
          msg: "username debe tener entre 4 y 255 caracteres",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Por favor Ingrese un email valido",
        },
        notNull: {
          msg: "Por favor ingrese un email",
        },
      },
    },
  },
  { timestamps: false }
);

//Relacion db
User.belongsToMany(Events, {
  through: "likes",
  foreignKey: "keyEvent",
  timestamps: false,
});
Events.belongsToMany(User, {
  through: "likes",
  foreignKey: "keyUser",
  timestamps: false,
});

User.hasMany(Ticket);
Ticket.belongsTo(User);
module.exports = User;
