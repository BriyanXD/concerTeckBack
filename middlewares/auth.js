const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/BlackList");
const User = require("../models/User");
require("dotenv").config();
const { AUTH_SECRET } = process.env;

let UserDate = "";

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, AUTH_SECRET, async (err, decoded) => {
      if (err)
        return res.status(500).json({ error: "Error al decodificar el token" });
      else {
        UserDate = decoded;
        const userSave = await BlackList.findOne({
          where: { email: decoded.user[0].email },
        });
        if (!userSave) {
          next();
        } else {
          res.status(400).json({ message: "Usuario Baneado no puede acceder" });
        }
      }
    });
  }
}

function isAdmin(req, res, next) {
  if (UserDate.user[0].isAdmin) {
    next();
  } else {
    return res.status(401).json({
      error: "Acceso no autorizado no tienes permisos de administrador",
    });
  }
}

function adminNotAuthorization(req, res, next) {
  if (!UserDate.user[0].isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .json({
        error:
          "Acceso no autorizado un administrador no puede realizar esta accion",
      });
  }
}

module.exports = {
  verifyToken,
  isAdmin,
  adminNotAuthorization,
};
