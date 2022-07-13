const Producer = require("../models/Producer");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function ValidationUser(req, res) {
  const { username, password } = req.body;
  try {
    if (username && password) {
      let user = await User.findOne({ where: { username } });
      let producer = await Producer.findOne({ where: { username } });
      if (user !== null || producer !== null) {
        if (user !== null) {
          if (bcrypt.compareSync(password, user.password)) {
            res.send(true);
          }
        } else if (producer !== null) {
          if (bcrypt.compareSync(password, producer.password)) {
            res.send(true);
          }
        }
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function ValidationUsername(req, res) {
  const { username } = req.body;
  try {
    if (username) {
      let user = await User.findOne({ where: { username } });
      let producer = await Producer.findOne({ where: { username } });
      if (user || producer) {
        res.send(false);
      } else {
        res.send(true);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function ValidationEmail(req, res) {
  const { email } = req.body;
  try {
    if (email) {
      let user = await User.findOne({ where: { email } });
      let producer = await Producer.findOne({ where: { email } });
      if (user || producer) {
        res.send(false);
      } else {
        res.send(true);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { ValidationUser, ValidationUsername, ValidationEmail };
