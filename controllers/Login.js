const Producer = require("../models/Producer");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AUTH_ROUNDS, AUTH_SECRET, AUTH_EXPIRES } = process.env;

async function LoginUser(req, res) {
  const { username, password } = req.body;
  try {
    if (username && password) {
      let user = await User.findOne({ where: { username } });
      let producer = await Producer.findOne({ where: { username } });
      if (user !== null) {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });
          res.json(["Usuario", user, { token: token }]);
        } else {
          res.status(401).json({ error: "Password incorrecto" });
        }
      }
      if (producer !== null) {
        if (bcrypt.compareSync(password, producer.password)) {
          let token = jwt.sign({ producer: producer }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });
          res.json(["Productor", producer, { token: token }]);
        } else {
          res.status(401).json({ error: "Password incorrecto" });
        }
      } else {
        res.status(400).json({
          error: "Los datos ingresados no coinciden con un usuario registrado",
        });
      }
    } else {
      res.status(400).json({ error: "Complete los datos requeridos" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { LoginUser };
