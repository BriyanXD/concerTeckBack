// const { useInflection } = require("sequelize/types");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/BlackList");
require("dotenv").config();
const { AUTH_SECRET, AUTH_EXPIRES } = process.env;
require("../db.js");

async function createUser(req, res) {
  const { name, username, email } = req.body;
  if (!username || !email || !name) {
    return res
      .status(400)
      .json({ error: "Faltan completar Campos obligatorios" });
  } else {
    try {
      //let passcrypt = bcrypt.hashSync(password, parseInt(AUTH_ROUNDS));
      const emailBaned = await BlackList.findOne({ where: { email: email } });
      if (!emailBaned) {
        const newUser = await User.findOrCreate({
          where: {
            name: name,
            username: username,
            email: email,
          },
          include: { model: Ticket },
        });
        if (newUser) {
          let token = jwt.sign({ user: newUser }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });
          return res.json(["Usuario", { user: newUser }, { token: token }]);
        } else {
          res.status(400).json({ error: "Error al crear el Usuario" });
        }
      } else {
        return res.status(403).json({ error: "El usuario esta baneado" });
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}
// "No se ha logrado crear el usuario"
async function getUser(req, res) {
  const DBusers = await User.findAll({ include: { model: Ticket } });
  const { username, password, id } = req.query;
  const idUser = await User.findByPk(id);
  try {
    if (username) {
      const filt = DBusers.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      );
      if (filt.length > 0) {
        return res.send(filt);
      }
    } else if (idUser) {
      return res.send(idUser);
      //  if (username && password) {
      //   const userFound = DBusers.find((user) => {
      //     if (user.username === username && user.password === password)
      //       return user;
      //   });
      //   return res.send(userFound);
      // }
    } else {
      return res.send(DBusers);
    }
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

async function putUser(req, res) {
  const { id, email, password, username, eventId } = req.body;
  try {
    if (!id && !email && !password && username) {
      return res
        .status(400)
        .json({ error: "Faltan completar Campos obligatorios" });
    } else {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        await user.update({
          email: email,
          password: password,
          username: username,
        });
        return res.json({ message: `Usuario Actualizado con exitos`, user });
      } else {
        res.status(400).send({ error: "El usuario no lo encontro" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.query; //req.params.id
    //console.log(id)
    const user = await User.findByPk(id);
    //console.log(user)
    if (!id) {
      return res.status(400).json({ error: "El ID solicitado no existe" });
    }
    if (!user) {
      return res.status(400).json({
        error: "No se a encontrado un Usuario que corresponda a lo solicitado",
      });
    }
    const newBaned = await BlackList.findOrCreate({
      where: {
        email: user.email,
        username: user.username || "undefined",
        name: user.name || "undefined",
      },
    });
    console.log("Usuario Eliminado y baneado", newBaned);
    const destoyed = await user.destroy();
    if (destoyed) {
      return res
        .status(201)
        .json({ message: "El Usuario a sido eliminado con exito" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function UpgradeRank(req, res) {
  const { isAdmin, id } = req.body;
  try {
    if (typeof isAdmin !== "boolean") {
      return res
        .status(400)
        .json({ error: "isAdmin tiene que ser un booleado" });
    } else {
      await User.update(
        {
          isAdmin: isAdmin,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const user = await User.findOne({ where: { id: id } });
      return res.json({ message: `Rango de usuario actualizado`, user });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function postAdminUser(req, res) {
  try {
    const { username, email, name } = req.body;
    const admin = await User.findOrCreate({
      where: {
        name: name,
        username: username,
        email: email,
        isAdmin: true,
      },
    });
    let token = jwt.sign({ user: admin }, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES,
    });
    res.json({ admin: admin, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  createUser,
  putUser,
  deleteUser,
  UpgradeRank,
  postAdminUser,
};
