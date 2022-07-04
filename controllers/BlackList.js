const BlackList = require("../models/BlackList");
const { use } = require("../routes");

function getAllBlackList(req, res) {
  try {
    const allBaned = BlackList.findAll();
    res.json(allBaned);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
//para uscar usuarios baneados
function getAOneBlackList(req, res) {
  const { id, email, username } = req.query;
  try {
    if (id) {
      const findBaned = BlackList.findByPk(id);
      return res.json(findBaned);
    } else if (email) {
      const findBaned = BlackList.findOne({ where: { email: email } });
      return res.json(findBaned);
    } else {
      const findBaned = BlackList.findOne({ where: { username: username } });
      return res.json(findBaned);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

function postOneBlackList(req, res) {
  const { email, username } = req.query;
  try {
    if (email) {
      const newBaned = BlackList.findOrCreate({
        where: {
          email: email,
          username: username || "undefined",
        },
      });
      res.json({ message: "Usuario Baneado", newBaned });
    } else {
      res.status(400).json({ error: "falta informacion" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

function deleteOneBlackList(req, res) {
  const { id } = req.query;
  try {
    const findBaned = BlackList.findByPk(id);
    const deleteBaned = findBaned.destroy();
    return res.json({ message: "Usuario perdonado", deleteBaned });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAOneBlackList,
  getAllBlackList,
  deleteOneBlackList,
  postOneBlackList,
};
