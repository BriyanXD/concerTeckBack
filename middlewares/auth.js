const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AUTH_SECRET } = process.env;

let UserDate = "";

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
      if (err)
        return res.status(500).json({ error: "Error al decodificar el token" });
      else {
        console.log("usuario autorizado");
        UserDate = decoded;
        next();
      }
    });
  }
}
function isAdmin(req, res, next) {
  console.log(UserDate.user, "Usuario antes de revisar");
  if (UserDate.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      error: "Acceso no autorizado no tienes permisos de administrador",
    });
  }
}
function verifyIsProducer(req, res, next) {
  try {
    if (UserDate.user.isProducer) {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado no tienes permisos de productor" });
  }
}

function adminNotAuthorization(req, res, next) {
  if (!UserDate.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado eres administrador" });
  }
}
function producerNotAuthorization(req, res, next) {
  try {
    if (!UserDate.user.isProducer) {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado eres productor" });
  }
}

module.exports = {
  verifyToken,
  isAdmin,
  verifyIsProducer,
  adminNotAuthorization,
  producerNotAuthorization,
};
