const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Producer = sequelize.define(
  "producer",
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
          msg: "Por favor ingrese su nombre",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su apellido",
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/gi,
          msg: "El apellido debe contener solo letras y espacios",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su nombre de usuario",
        },
      },
    },
    cuit_cuil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su nombre de cuit cuil",
        },
        isInt: {
          args: true,
          msg: "cuit cuil solo puede tener numeros",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su nombre de correo",
        },
        isEmail: {
          args: true,
          msg: "Ingrese un correo valido",
        },
      },
    },
    cbu: {
      // cuenta bancaria
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su nombre de cbu",
        },
        isInt: {
          args: true,
          msg: "cbu solo puede tener numeros",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese una contrasena valida",
        },
      },
    },
    telephone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor ingrese su telefono",
        },
        isInt: {
          args: true,
          msg: "telefono solo puede tener numeros",
        },
      },
    },
    isProducer: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    company: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Producer;
