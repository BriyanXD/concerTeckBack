const Producer = require("../models/Producer");
const Events = require("../models/Events");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AUTH_ROUNDS, AUTH_SECRET, AUTH_EXPIRES } = process.env;
//prueba
require("../db.js");

async function createProducer(req, res) {
  const {
    username,
    password,
    email,
    telephone,
    name,
    lastname,
    cbu,
    company,
    cuit_cuil,
  } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    !telephone ||
    !name ||
    !lastname ||
    !cbu ||
    !cuit_cuil /* || !company */
  ) {
    res.status(404).send("Faltan completar Campos obligatorios");
  } else {
    try {
      let passcrypt = bcrypt.hashSync(password, parseInt(AUTH_ROUNDS));
      await Producer.create({
        username: username,
        password: passcrypt,
        email: email,
        telephone: telephone,
        name: name,
        lastname: lastname,
        cbu: cbu,
        company: company,
        cuit_cuil: cuit_cuil,
      })
        .then((newproducer) => {
          let token = jwt.sign({ user: newproducer }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });
          res.json(["Productor", { producer: newproducer }, { token: token }]);
        })
        .catch((error) => res.status(500).json(error));
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
}
async function getProducer(req, res) {
  /* const { username, password } = req.body; */
  try {
    const DBproducer = await Producer.findAll({
      include: { model: Events, attributes: ["id", "name", "schedule"] },
    });
    /*  if (username && password) {
      const producerFound = DBproducer.find((producer) => {
        if (producer.username === username && producer.password === password)
          return producer;
      });
      return res.send(producerFound);
    } */
    return res.send(DBproducer);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}
// "No se ha logrado crear el Producer"

async function putProducer(req, res) {
  const { id, cuit_cuil, email, cbu, telephone, company } = req.body;
  try {
    if (!cuit_cuil && !email && cbu && !telephone && !company) {
      res
        .status(404)
        .send("No se recibieron los parámetros necesarios para actualizar");
    } else {
      await Producer.update(
        {
          cuit_cuil: cuit_cuil,
          email: email,
          cbu: cbu,
          telephone: telephone,
          company: company,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((response) => {
          Producer.findByPk(id).then((resp) => {
            res.json({ message: "Campos actualizados con exito", resp });
          });
        })
        .catch((error) => {
          res.status(400).json({ error: "Error al actualizar los campos" });
        });
    }
  } catch (error) {
    res.status(404).send(error);
  }
}
async function deleteProducer(req, res) {
  try {
    const { id } = req.body; //req.params.id
    const producer = await Producer.findByPk(id);
    if (!id) {
      return res.status(404).json({ error: "El ID solicitado no existe" });
    }
    if (!Producer) {
      return res.status(404).json({
        error:
          "No se a encontrado un Productor/ra que corresponda a lo solicitado",
      });
    }
    const destoyed = await producer.destroy();
    if (destoyed) {
      return res
        .status(201)
        .json({ message: "El Productor/ra a sido eliminado con exito" });
    }
  } catch (error) {
    return res.status(404).json({ error: message.error });
  }
}
module.exports = {
  createProducer,
  getProducer,
  putProducer,
  deleteProducer,
};
